
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

function query(sql) {
  return new Promise(function (resolve, reject) {
    if (!_instance) {
      reject(new Error('db instance is not exists'));
    }

    _instance.query(sql, function(err, rows, fields) {
      if (err) {
        mysql.getConnect().rollback(function () {
          reject(err);
        });
      }

      return resolve(rows);
    });
  });
}

export default {
  connect,
  getConnect,
  query,
};
