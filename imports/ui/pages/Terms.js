import React from 'react';

const Terms = () => (
    <div className="Terms">
        <Alert bsStyle="danger">
            <p><strong>Error [404]</strong>: { window.location.pathname } does not exist.</p>
        </Alert>
    </div>
);

export default Terms;