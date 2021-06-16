import { getToken } from './storage';

export const fetchPost = (api, obj) => {
  const token =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTF9.VxIZ8pTCIBNw3l3D2aG4Wq3OH01dJqaPHJA7EdTjcQY';

  const headers = Object.assign(
    { 'Content-Type': 'application/json' },
    token ? { Authorization: token } : null,
  );

  const options = {
    method: 'POST',
    headers,
    body: JSON.stringify(obj),
  };

  return fetch(api, options);
};

export const fetchDelete = (api) => {
  const token =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTF9.VxIZ8pTCIBNw3l3D2aG4Wq3OH01dJqaPHJA7EdTjcQY';

  const headers = Object.assign(
    { 'Content-Type': 'application/json' },
    token ? { Authorization: token } : null,
  );
  const options = { method: 'DELETE', headers };

  return fetch(api, options);
};

export const fetchGet = (api) => {
  const token =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTF9.VxIZ8pTCIBNw3l3D2aG4Wq3OH01dJqaPHJA7EdTjcQY';

  const headers = Object.assign(
    { 'Content-Type': 'application/json' },
    token ? { Authorization: token } : null,
  );
  const options = { method: 'GET', headers };

  return fetch(api, options);
};

export const fetchPut = (api, obj) => {
  const token =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTF9.VxIZ8pTCIBNw3l3D2aG4Wq3OH01dJqaPHJA7EdTjcQY';

  const headers = Object.assign(
    { 'Content-Type': 'application/json' },
    token ? { Authorization: token } : null,
  );

  const options = {
    method: 'PUT',
    headers,
    body: JSON.stringify(obj),
  };

  return fetch(api, options);
};

export const fetchPatch = (api, obj) => {
  const token =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTF9.VxIZ8pTCIBNw3l3D2aG4Wq3OH01dJqaPHJA7EdTjcQY';

  const headers = Object.assign(
    { 'Content-Type': 'application/json' },
    token ? { Authorization: token } : null,
  );

  const options = {
    method: 'PATCH',
    headers,
    body: JSON.stringify(obj),
  };

  return fetch(api, options);
};
