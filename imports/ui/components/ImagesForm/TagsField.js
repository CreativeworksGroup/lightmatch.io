import React from 'react';
import PropTypes from 'prop-types';
import { AsyncCreatable } from 'react-select';
import 'react-select/dist/react-select.css';
import { withState } from 'recompose';
import connectField from 'uniforms/connectField';

const getTags = (input) => {
  if (!input) {
    return Promise.resolve({ options: [] });
  }
  return Promise.resolve({ options: [] });
};

const enhance = withState('state', 'setState', { value: [] });

const TagsField = enhance(({ state, setState, onChange }) => (
  <AsyncCreatable
    multi
    onChange={(input) => {
      setState({ value: input });
      onChange(input);
    }}
    value={state.value}
    loadOptions={getTags}
  />
));

TagsField.propTypes = {};

export default connectField(TagsField);
