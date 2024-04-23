/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse, CancelTokenSource } from 'axios';
import Toast, { ERROR_TOAST } from '../../components/Toast';

const axiosInstance = axios.create({
  timeout: 60 * 1000,
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': ' GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Content-Encoding': 'br'
  },
});

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    handleGlobalError(error, 'requestError');
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    handleGlobalError(response, 'response');
    return response;
  },
  (error) => {
    const resp = error.response;
    handleGlobalError(resp, 'responseError');
    return Promise.reject(error);
  }
);

const handleGlobalError = (response: any, from: string) => {
  if (from === 'requestError' || (response && response.status === 404)) {
    Toast('aSystemErrorOccurredPleaseTryAgainLater', ERROR_TOAST, true);
    return;
  }
  if (
    (from === 'response' || from === 'responseError') &&
    response &&
    response.config &&
    response.config.handleError
  ) {
    const responseObject = response.data;
    try {
      if (responseObject && typeof responseObject === 'string') {
        Toast('aSystemErrorOccurredPleaseTryAgainLater', ERROR_TOAST, true);
      } else if (
        responseObject &&
        typeof responseObject === 'object' &&
        responseObject.message
      ) {
        let message = 'aSystemErrorOccurredPleaseTryAgainLater';
        if (responseObject.message) {
          if (typeof responseObject.message === 'string') {
            message = responseObject.message;
          } else if (Array.isArray(responseObject.message)) {
            message = responseObject.message.join();
          }
        }
        Toast(message, ERROR_TOAST, true);
      } else if (
        responseObject &&
        typeof responseObject === 'object' &&
        responseObject.errors &&
        Array.isArray(responseObject.errors)
      ) {
        const errors = responseObject.errors;
        for (const key in errors) {
          Toast(errors[key], ERROR_TOAST);
        }
      }
    } catch (error) {
      Toast('aSystemErrorOccurredPleaseTryAgainLater', ERROR_TOAST, true);
    }
  }
  if (response && response.status === 403) {
    window.location.href = '/login';
  }
};

export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'
  | 'purge'
  | 'PURGE'
  | 'link'
  | 'LINK'
  | 'unlink'
  | 'UNLINK';

/**
 * Common method to make API request
 * @param {String} url Url
 * @param {String} method Request Methods, default `POST`
 * @param {Object} params Parameters that has to be sent in API
 * @param {boolean} handleError Flag to indicate to handleError automatically or not by default `true`
 * @param {boolean} useAsParams Flag to indicate to send data as params `true`
 * @return {Promise} returns Promise
 */
export async function request(
  url: string,
  method: Method,
  params: any,
  handleError = true,
  useData = false,
  cancelToken?: CancelTokenSource,
  headerConfig?: any
) {
  try {
    const config = {
      method: method || 'POST',
      url: url,
      data: null,
      params: null,
      handleError: handleError,
      [useData ? 'data' : 'params']: useData
        ? convetToFromData(params)
        : params || {},
    };

    if (cancelToken) {
      config.cancelToken = cancelToken.token;
    }
    if (headerConfig) {
      config.headers = headerConfig;
    }

    return await axiosInstance.request(config).then((response) => {
      if (response) {
        return Promise.resolve(response.data);
      } else {
        return Promise.reject(response);
      }
    });
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function requestWithFormData(
  url: string,
  method: Method,
  params: FormData,
  handleError = true
) {
  try {
    const config = {
      method: method || 'POST',
      url: url,
      handleError: handleError,
      data: params || {},
    };

    return await axiosInstance.request(config).then((response) => {
      if (response) {
        return Promise.resolve(response.data);
      } else {
        return Promise.reject(response);
      }
    });
  } catch (err) {
    return Promise.reject(err);
  }
}

const convetToFromData = (params: any): any => {
  const form_data = new FormData();
  if (typeof params == 'string') {
    return params;
  }

  for (const key in params) {
    if (typeof params[key] == 'string') {
      form_data.append(key, params[key]);
    } else if (Array.isArray(params[key])) {
      if (params[key].length === 1) {
        form_data.append(key, params[key]);
      } else {
        params[key].forEach((element: any) => {
          form_data.append(key + '[]', element);
        });
      }
    } else {
      form_data.append(key, params[key]);
    }
  }
  return form_data;
};

export const downloadFile = async (
  url: string,
  method: Method,
  params: any,
  fileName: string,
  fileExtention: string,
  downloadSuccessResponse: () => void
) => {
  axiosInstance({
    url: url, //your url
    method: method,
    data: convetToFromData(params),
    responseType: 'blob', // important
  })
    .then((response) => {
      if (response && response.data && response.data.success == false) {
        Toast(
          response.data.message
            ? response.data.message
            : 'anErrorOccurredWhileDownloadingTheFile',
          ERROR_TOAST,
          true
        );
        return;
      }
      // this is for ios mobile chrome issue we have conditionally open a pdf file in a new tab.
      if (
        /CriOS/i.test(navigator.userAgent) &&
        /iphone|ipod|ipad/i.test(navigator.userAgent)
      ) {
        const out = new Blob([response.data], {
          type: fileExtention == 'csv' ? 'text/csv' : 'application/pdf',
        });
        const urlOpen = URL.createObjectURL(out);
        window && window.open(urlOpen, '_blank');
      } else {
        const a = document.createElement('a');
        const url = window.URL.createObjectURL(new Blob([response.data]));
        a.href = url;
        a.setAttribute('download', `${fileName}.${fileExtention}`); //or any other extension
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      }
      downloadSuccessResponse();
    })
    .catch(() => {
      Toast('anErrorOccurredWhileDownloadingTheFile', ERROR_TOAST, true);
    });
};
