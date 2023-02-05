import PropTypes from 'prop-types';
import { Component } from 'react';
import styles from './Searchbar.module.scss';
import { ReactComponent as SearchIcon } from '../SvgIcons/search.svg';

class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { onSubmit } = this.props;
    onSubmit({ ...this.state });
    // this.setState({ query: '' });
  };

  render() {
    const { query } = this.state;
    const { handleChange, handleSubmit } = this;

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
            value={query}
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
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
