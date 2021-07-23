import React from 'react';

const NotFoundPage = (props) => {
  const {staticContext = {}} = props;
  staticContext.status = 404;
  
  return (
    <div>
      <h1>404 Not Found</h1>
    </div>
  );
};

export default NotFoundPage;