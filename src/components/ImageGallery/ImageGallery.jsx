import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

import styles from './ImageGallery.module.scss';

const ImageGallery = ({ images, onImageClick }) => (
  <ul className={styles.imageGallery}>
    {images.map(image => (
      <ImageGalleryItem
        key={image.id}
        image={image}
        onImageClick={onImageClick}
      />
    ))}
  </ul>
);

export default ImageGallery;

ImageGallery.defaultProps = {
  images: [],
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
  onImageClick: PropTypes.func.isRequired,
};
