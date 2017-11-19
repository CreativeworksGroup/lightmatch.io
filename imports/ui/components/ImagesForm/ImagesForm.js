import React from 'react';
import AutoForm from 'uniforms-material/AutoForm';
import SimpleSchema from 'simpl-schema';
import ImageField from './ImageField';
import TagsField from './TagsField';
import ImagesDropzone from './ImagesDropzone';
import Images from '../../../api/images/images';
import { insertImage } from '../../../api/images/methods';

const schema = new SimpleSchema({
  images: {
    type: Array,
    uniforms: ImagesDropzone,
  },
  'images.$': {
    type: Object,
    uniforms: ImageField,
  },
  'images.$.meta': {
    type: Object,
  },
  'images.$.meta.AspectRatio': {
    type: Number,
  },
  'images.$.tags': {
    type: Array,
    uniforms: TagsField,
  },
  'images.$.tags.$': {
    type: String,
  },
});

const ImagesForm = () => (
  <AutoForm
    schema={schema}
    onSubmit={data =>
      data.images.map((image) => {
        const reader = new FileReader();
        reader.onload = () => {
          Images.insert({
            file: reader.result,
            isBase64: true,
            fileName: image.name,
            meta: image.meta,
          });
        };
        reader.readAsDataURL(image);
      })
    }
  />
);

export default ImagesForm;
