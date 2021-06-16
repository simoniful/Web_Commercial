export const queryString = (locationSearch) => {
  const qsArr = locationSearch?.split('?')[1].split('&');
  const qsObj = {};

  qsArr
    .map((el) => el.split('='))
    .forEach((el) => {
      qsObj[el[0]] = el[1];
    });

  return qsObj;
};
