import PropTypes from 'prop-types';

import styles from './Button.module.scss';

const Button = ({ onClick }) => (
  <button type="button" className={styles.loadMoreBtn} onClick={onClick}>
    <span>Load more</span>
  </button>
);

export default Button;

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
