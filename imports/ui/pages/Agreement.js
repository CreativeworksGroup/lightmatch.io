import React from 'react';

const Agreement = () => (
  <div className="Agreement">
    <Alert bsStyle="danger">
      <p>
        <strong>Error [404]</strong>: {window.location.pathname} does not exist.
      </p>
    </Alert>
  </div>
);

export default Agreement;
