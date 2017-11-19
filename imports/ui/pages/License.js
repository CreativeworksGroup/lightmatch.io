import React from 'react';

const License = () => (
    <div className="License">
        <Alert bsStyle="danger">
            <p><strong>Error [404]</strong>: { window.location.pathname } does not exist.</p>
        </Alert>
    </div>
);

export default License;