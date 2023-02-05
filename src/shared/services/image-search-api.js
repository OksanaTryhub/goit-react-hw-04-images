import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api',
  params: {
    key: '31931321-46b396f059afa63f80e004304',
    per_page: 12,
    image_type: 'photo',
    safesearch: true,
  },
});

export const searchImgs = async (q, page = 1) => {
  const { data } = await instance.get('/', {
    params: {
      q,
      page,
    },
  });
  return data;
};
