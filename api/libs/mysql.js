
import mysql from 'mysql';

/**
 * mysql
 */

const config = {
  host     : '',
  user     : 'sunken',
  password : '1q@W3e$R5t'
};
let _instance = null;

// 建立连接
function init() {
  console.log('------------------------------------------------------------------');
  console.log(mysql);
  console.log(mysql.createConnection);
  _instance = mysql.createConnection(config);
  return false;
  _instance.conenct(err => {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }

    console.log('connected as id ' + connection.threadId);
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
  getConnect
};
