import React, { Component } from 'react';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import { searchImgs } from './shared/services/image-search-api';
import Modal from './components/Modal/Modal';
import LargeImage from 'components/LargeImage/LargeImage';
import IconButton from 'components/IconButton/IconButton';
import { ReactComponent as CloseIcon } from './components/SvgIcons/close.svg';
import Button from 'components/Button/Button';

import styles from './App.module.scss';
import { warningMessage, errorMessage } from './utils/warningMessage';

class App extends Component {
  state = {
    images: [],
    loading: false,
    error: null,
    query: '',
    page: 1,
    totalImages: null,
    totalPages: null,
    showModal: false,
    largeImageURL: '',
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query.trim() || prevState.page !== page) {
      this.fetchImages();
    }
  }

  async fetchImages() {
    const perPage = 12;

    try {
      this.setState({ status: 'pending' });
      const { query, page } = this.state;
      const data = await searchImgs(query, page);
      const totalPages = Math.round(data.totalHits / perPage);

      if (data.totalHits === 0) {
        warningMessage();
      }
      this.setState(({ images }) => ({
        images: [...images, ...data.hits],
        totalImages: data.totalHits,
        totalPages: totalPages,
        status: 'resolved',
      }));
    } catch (error) {
      this.setState({ error: error.message, status: 'rejected' });
      errorMessage(error.message);
    }
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onImageClick = largeImageURL => {
    this.setState({ largeImageURL, showModal: true });
  };

  searchImages = ({ query }) => {
    if (query === '') {
      this.setState({ status: 'idle', images: [] });
      return;
    }
    if (query !== this.state.query) {
      this.setState({ query, page: 1, images: [] });
    } else {
      this.setState({ query });
    }
  };

  loadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  render() {
    const { images, showModal, largeImageURL, totalPages, page, status } =
      this.state;
    const { searchImages, loadMore, onImageClick } = this;

    if (status === 'idle') {
      return (
        <>
          <Searchbar onSubmit={searchImages} />
          <p className={styles.greeting}>Let's look for the pictures</p>
        </>
      );
    }

    if (status === 'pending') {
      return (
        <>
          <Searchbar onSubmit={searchImages} />
          <Loader />
        </>
      );
    }

    if (status === 'rejected') {
      return (
        <>
          <Searchbar onSubmit={searchImages} />
        </>
      );
    }

    if (status === 'resolved') {
      return (
        <>
          <Searchbar onSubmit={searchImages} />
          <div className={styles.App}>
            {showModal && (
              <Modal onClose={this.toggleModal}>
                <LargeImage src={largeImageURL} />
                <IconButton onClick={this.toggleModal} aria-label="Close image">
                  <CloseIcon width="20px" height="20px" fill="#7e7b7b" />
                </IconButton>
              </Modal>
            )}

            <ImageGallery images={images} onImageClick={onImageClick} />

            {totalPages > 1 && page < totalPages && (
              <Button onClick={loadMore} />
            )}
          </div>
        </>
      );
    }
  }
}

export default App;
