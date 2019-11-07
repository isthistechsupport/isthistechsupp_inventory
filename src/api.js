import axios from 'axios';

const ax = axios.create({
  baseURL: 'http://localhost:3000/api'
});

const handleError = error => {
  if (error.response) {
    console.log('RESPONSE ERROR', error.response.statusText);

    return error.response.status;
  }
  if (error.request) {
    console.log('REQUEST ERROR', error.message);
    return 503;
  }
  console.log('ERROR', error.message);
  return 'unspecific';
};

export default {
  getList: () =>
    new Promise((resolve, reject) => {
      ax.get('/items')
        .then(response => resolve(response.data))
        .catch(error => reject(handleError(error)));
    }),
  getItem: id =>
    new Promise((resolve, reject) => {
      ax.get(`/items/${id}`)
        .then(response => resolve(response.data))
        .catch(error => reject(handleError(error)));
    }),
  saveList: items =>
    new Promise((resolve, reject) => {
      ax.post('/items', { items })
        .then(response => resolve(response.data))
        .catch(error => reject(handleError(error)));
    })
};
