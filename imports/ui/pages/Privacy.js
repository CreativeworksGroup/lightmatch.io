import React from 'react';

const Privacy = () => (
    <div className="Privacy">
        <Alert bsStyle="danger">
            <p><strong>Error [404]</strong>: { window.location.pathname } does not exist.</p>
        </Alert>
    </div>
);

export default Privacy;