
import mysql from '../libs/mysql';
// const connection = mysql.getConnect();

export function loadAuth(ctx) {
  // ctx.body = {
  //   nick: 'sunken',
  //   avatar: 'http://wx.qlogo.cn/mmopen/PiajxSqBRaEKwEwVRdkBzHUAO31IDTXUOf4nHP9ibNDvcaK2D3NUK8xmQP7IZWup4xhhcQia1DU5kEpuEBttibGJAg/0',
  //   intro: '通常来说，Javascript程序只有一行',
  //   state: 1,
  //   last_login_time: '2015.11.11 10:30:26',
  //   register_time: '2015.11.11 10:30:26',
  //   remark: '管理员'
  // };
  ctx.body = '呵呵呵';
  // return Promise.resolve(req.session.user || null);
}

export async function login(ctx) {
  // TODO: 查库，用username获取用户然后比对password
  // const result = await mysql.getConnect().query('select * from m_user');

  // console.log('💻', result.rows);
  const result = await new Promise(function (resolve, reject) {
    mysql.getConnect().query('select * from m_user', function(err, rows, fields) {
      if (err) {
        mysql.getConnect().rollback(function () {
          reject(err);
        });
      }

      console.log('💻 The solution is: ', rows[0]);

      return resolve(rows);
    });
  });

  ctx.body = result[0];

  // const user = ctx.request.body;
  // ctx.session.user = user;
  // ctx.body = user;
  // ctx.status = 200;
}

export function logout(ctx) {
  return new Promise((resolve) => {
    ctx.session.destroy(() => {
      ctx.session = null;
      return null;
    });
  });
}

export default {
  loadAuth,
  login,
  logout
};
