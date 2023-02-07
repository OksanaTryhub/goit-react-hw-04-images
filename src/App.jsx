import { useState, useEffect } from 'react';
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

export default function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (query) {
      const fetchImages = async () => {
        const perPage = 12;

        try {
          setLoading(true);

          const data = await searchImgs(query, page);
          setTotalPages(Math.round(data.totalHits / perPage));

          if (data.totalHits === 0) {
            warningMessage();
          }
          setImages(prevImages => [...prevImages, ...data.hits]);
        } catch (error) {
          errorMessage(error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchImages();
    }
  }, [page, query]);

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  const onImageClick = largeImageURL => {
    setLargeImageURL(largeImageURL);
    setShowModal(true);
  };

  const searchImages = ({ searchQuery }) => {
    if (searchQuery.trim() === query) {
      return;
    }
    if (searchQuery.trim() === '') {
      setImages([]);
      setTotalPages(null);
      setQuery('');
      return;
    }
    setQuery(searchQuery.trim());
    setPage(1);
    setImages([]);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <Searchbar onSubmit={searchImages} />
      {!images.length && !loading && (
        <p className={styles.greeting}>Let's look for the pictures</p>
      )}

      {loading && <Loader />}

      <div className={styles.App}>
        {showModal && (
          <Modal onClose={toggleModal}>
            <LargeImage src={largeImageURL} />
            <IconButton onClick={toggleModal} aria-label="Close image">
              <CloseIcon width="20px" height="20px" fill="#7e7b7b" />
            </IconButton>
          </Modal>
        )}

        <ImageGallery images={images} onImageClick={onImageClick} />

        {!loading && totalPages > 1 && page < totalPages && (
          <Button onClick={loadMore} />
        )}
      </div>
    </>
  );
}
