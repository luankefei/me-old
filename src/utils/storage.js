/**
 * storage
 */
const getStorage = (key, type) => {
  let item = window[`${type}Storage`].getItem(key);

  try {
    item = JSON.parse(item);
  } finally {
    return item;
  }
};

const setStorage = (key, value, type) => window[`${type}Storage`].setItem(
  key,
  typeof value === 'string' ? value : JSON.stringify(value),
  type
);

const removeStorage = (key, type) => window[`${type}Storage`].removeItem(key);

/* eslint no-use-before-define: 0 */
const generate = type => ({
  get: key => getStorage(key, type),
  set: (key, value) => {
    setStorage(key, value, type);
    return type === 'session' ? sessionStorage : localStorage;
  },
  remove: key => {
    removeStorage(key, type);
    return type === 'session' ? sessionStorage : localStorage;
  },
  type
});
const sessionStorage = (() => generate('session'))();
const localStorage = (() => generate('local'))();

export {sessionStorage, localStorage};
