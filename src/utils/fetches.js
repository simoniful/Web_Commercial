import { getToken } from './storage';

export const fetchPost = (api, obj) => {
  const token = getToken();

  const headers = Object.assign(
    { 'Content-Type': 'application/json' },
    token ? { Authorization: token } : null,
  );

  const headersWithBody = { ...headers, body: JSON.stringify(obj) };
  const options = { method: 'GET', headersWithBody };

  return fetch(api, options);
};

export const fetchDelete = (api) => {
  const token = getToken();

  const headers = Object.assign(
    { 'Content-Type': 'application/json' },
    token ? { Authorization: token } : null,
  );
  const options = { method: 'GET', headers };

  return fetch(api, options);
};

export const fetchGet = (api) => {
  const token = getToken();

  const headers = Object.assign(
    { 'Content-Type': 'application/json' },
    token ? { Authorization: token } : null,
  );
  const options = { method: 'GET', headers };

  return fetch(api, options);
};

export const fetchPut = (api, obj) => {
  const token = getToken();

  const headers = Object.assign(
    { 'Content-Type': 'application/json' },
    token ? { Authorization: token } : null,
  );

  const headersWithBody = { ...headers, body: JSON.stringify(obj) };
  const options = { method: 'GET', headersWithBody };

  return fetch(api, options);
};

export const fetchPatch = (api, obj) => {
  const token = getToken();

  const headers = Object.assign(
    { 'Content-Type': 'application/json' },
    token ? { Authorization: token } : null,
  );

  const headersWithBody = { ...headers, body: JSON.stringify(obj) };
  const options = { method: 'GET', headersWithBody };

  return fetch(api, options);
};
