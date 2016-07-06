
import mysql from '../libs/mysql';

export function loadAuth(ctx) {
  const user = ctx.session.user || null;

  ctx.body = user;
  ctx.status = 200;
}

// 查库，用username获取用户然后比对password
export async function login(ctx) {
  const username = ctx.request.body.username;
  const password = ctx.request.body.password;

  const result = await mysql.query(`SELECT * FROM m_user WHERE username='${username}'`);

  let user = null;
  if (result && result.length) {
    user = result[0];

    // 密码校验不通过
    if (user.password !== password) {
      user = null;
    }
  }

  ctx.body = user;
  ctx.session.user = user;
  ctx.status = 200;
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
