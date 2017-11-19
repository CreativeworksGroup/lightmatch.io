import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import lodash from 'lodash';
import './accounts-config.js';
import App from '../../ui/layouts/App.js';

global._ = lodash;

Meteor.startup(() => {
  render(<App />, document.getElementById('react-root'));
});
