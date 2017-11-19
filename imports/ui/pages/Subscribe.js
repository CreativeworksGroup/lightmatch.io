import React from 'react';

const Subscribe = () => (
    <div className="Subscribe">
        <Alert bsStyle="danger">
            <p><strong>Error [404]</strong>: { window.location.pathname } does not exist.</p>
        </Alert>
    </div>
);

export default Subscribe;