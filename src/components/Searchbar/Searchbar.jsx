import PropTypes from 'prop-types';
import { useState } from 'react';
import styles from './Searchbar.module.scss';
import { ReactComponent as SearchIcon } from '../SvgIcons/search.svg';

export default function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = ({ target }) => {
    const { value } = target;
    setSearchQuery(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ searchQuery });
  };

  return (
    <header className={styles.searchbar}>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <button type="submit" className={styles.searchForm__button}>
          <span className={styles.searchForm__buttonLabel}>
            <SearchIcon width="28px" height="28px" />
          </span>
        </button>

        <input
          className={styles.searchForm__input}
          value={searchQuery}
          onChange={handleChange}
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
