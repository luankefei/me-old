
/**
 * 用户记录所有订阅
 * @key {string}
 * @value {array}
 */
const DEBUG = false;
const eventDic = {};
const hookList = [];

// 这里要返回一个promise 包装过的处理函数
const on = (key, handler) => {

  // 支持多事件订阅
  let keys;
  if (typeof key === 'string') {
    keys = [key];
  }

  for (let index = 0; index < keys.length; index++) {
    const keyword = keys[index];

    if (!eventDic[keyword]) {
      eventDic[keyword] = [handler];
    } else {

      eventDic[keyword].push(handler);
    }
  }
};

// 与事件订阅相同
const off = (key, handler) => {
  const events = eventDic[key];

  if (!events || !events.length) {
    return false;
  }

  // 不传入第二个参数，全部清空
  if (!handler) {
    delete eventDic[key];
    // events = [];
    return true;
  }

  // 这里不能使用break，同一个函数可能被push多次
  for (let index = 0; index < events.length; index++) {
    if (events[index] === handler) {
      events.splice(index, 1);
    }
  }

  return true;
};

/**
 * 触发多次的绑定
 */
const many = (key, times, handler) => {
  for (let index = 0; index < times.length; index++) {
    on(key, handler);
  }
};

/**
 * hook所有emit
 */
const onAny = handler => {
  if (typeof handler === 'function') {
    hookList.push(handler);
    return true;
  }

  return false;
};

/**
 * 触发所有符合条件的订阅事件和hooker
 * @param  {string} key
 */
const emit = (key, ...args) => {
  if (typeof key !== 'string') {
    return false;
  }

  return new Promise(resolve => {
    const events = eventDic[key];
    if (events && events.length) {
      events.forEach(item => item(...args));
      hookList.forEach(item => item(key));
      resolve(true);

    } else {
      if (DEBUG) {
        console.error(`the emit handler ${key} does not exist.`);
      }
      resolve(false);
    }
  })
  .catch(err => console.log(err));
};

export default {
  version: 0.1,
  once: null,
  on,
  off,
  many,
  emit,
  onAny
};
