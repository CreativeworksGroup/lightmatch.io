import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import ListItemField from 'uniforms-material/ListItemField';
import connectField from 'uniforms/connectField';

const ImagesDropzone = ({ name, value, onChange }) => (
  <div>
    <Dropzone
      className="dropzone"
      activeClassName="active-dropzone"
      onDrop={files => onChange(files)}
      disablePreview
    >
      <div>Drag and drop or click to upload.</div>
    </Dropzone>
    {value
      ? value.map((item, i) => <ListItemField key={i} name={`${name}.${i}`} value={item} />)
      : null}
  </div>
);

ImagesDropzone.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default connectField(ImagesDropzone, { includeInChain: false });
