import axios from 'axios';

const preUrl = 'https://rickandmortyapi.com/api';

export default {
  fetchGet: (url: string) =>
    axios.get(`${preUrl}${url}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    }),

  fetchGetParams: (url: string, params: object) =>
    axios.get(`${preUrl}${url}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      params: params,
    }),
};
