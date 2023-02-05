import PropTypes from 'prop-types';
import styles from './LargeImage.module.scss';

const LargeImage = ({ src }) => (
  <img
    className={styles.modal__img}
    src={src}
    width="100%"
    height="100%"
    alt="largeImage"
  />
);

export default LargeImage;

LargeImage.propTypes = {
  src: PropTypes.string.isRequired,
};
