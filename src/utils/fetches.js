import { getToken } from './storage';

export const fetchPost = (api, obj) => {
  const token = getToken();

  return fetch(api, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(obj),
  });
};

export const fetchDelete = (api) => {
  // api/:id
  const token = getToken();

  return fetch(api, {
    method: 'DELETE',
    headers: {
      Authorization: token,
    },
  });
};

export const fetchGet = (api) => {
  const token = getToken();

  token
    ? fetch(api, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      }).then((response) => response.json())
    : fetch(api, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => response.json());
};

export const fetchPut = (api, obj) => {
  const token = getToken();

  return fetch(`${api}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(obj),
  }).then((response) => response.json());
};

export const fetchPatch = (api, obj) => {
  const token = getToken();

  return fetch(`${api}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(obj),
  }).then((response) => response.json());
};
