import React from 'react';
import PropTypes from 'prop-types';

import styles from './ImageGalleryItem.module.scss';

const ImageGalleryItem = ({ image, onImageClick }) => {
  const { id, webformatURL, tags, largeImageURL } = image;

  const fullImage = () => onImageClick(largeImageURL);

  return (
    <li key={id} className={styles.imageGalleryItem}>
      <img
        className={styles.imageGalleryItem__image}
        src={webformatURL}
        alt={tags}
        onClick={fullImage}
      />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),
  onImageClick: PropTypes.func.isRequired,
};
