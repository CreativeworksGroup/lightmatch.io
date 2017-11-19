import React from 'react';
import PropTypes from 'prop-types';
import loadImage from 'blueimp-load-image';
import connectField from 'uniforms/connectField';
import TagsField from './TagsField';

const loadExif = (value, onChange) => {
  const file = value;
  file.meta = {};
  loadImage.parseMetaData(file, (data) => {
    if (data.exif) {
      file.meta = data.exif.getAll();
      onChange(file);
    }
  });
};

const preview = (value, onChange) => {
  const file = value;
  return loadImage(file, (img) => {
    file.meta.AspectRatio = img.width / img.height;
    onChange(file);
  });
};

const ImageField = ({ value, onChange }) => (
  <div>
    {loadExif(value, onChange)}
    <img
      src={preview(value, onChange).src}
      alt={value.name}
      style={{ maxWidth: '100%', height: 'auto' }}
    />
    <TagsField name="tags" />
  </div>
);

ImageField.propTypes = {};

export default connectField(ImageField);
