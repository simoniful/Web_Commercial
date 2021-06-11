export const fetchPost = (api, obj) => {
  return fetch(api, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  }).then((response) => response.json());
};

export const fetchGet = (api, token) => {
  return fetch(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json());
};
