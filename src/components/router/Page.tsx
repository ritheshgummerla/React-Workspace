import React from 'react';

const Page = (props: any) => {
  React.useEffect(() => {
    document.title = props.title;
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const { title, ...rest } = props;
  return <props.component />;
};

export default Page;
