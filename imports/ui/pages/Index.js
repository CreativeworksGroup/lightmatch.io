import React from 'react';
import PropTypes from 'prop-types';
import ImagesList from '../components/ImagesList/ImagesList';
import ImagesForm from '../components/ImagesForm/ImagesForm';

const Index = () => (
  <div className="Index">
    <ImagesForm />
    <ImagesList />
  </div>
);

Index.propTypes = {};

export default Index;
