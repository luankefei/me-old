
import mysql from 'mysql';

/**
 * mysql
 */
const config = {
  cookieSecret: 'me',
	database: 'me',
	host: 'localhost',
	port: 3306,
  user: 'sunken',
  password: '1q@W3e$R5t'
};
let _instance = null;

// 建立连接
function init() {
  _instance = mysql.createConnection(config);
  _instance.connect(err => {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }

    console.log('connected as id ' + _instance.threadId);
  });
}

export function connect() {
  if (_instance) {
    return _instance;
  }

  return init();
}

export function getConnect() {
  return _instance;
}

export default {
  connect,
  getConnect,
  // query,
};
