import Routes from './components/router/Routes';
import { BrowserRouter } from 'react-router-dom';
import { SYSTEM_CONSTANTS } from './common/constants';
import { store } from './redux/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename={SYSTEM_CONSTANTS.PUBLIC_URL + '/'}>
           <Routes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
