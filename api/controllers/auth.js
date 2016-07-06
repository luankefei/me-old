
import mysql from '../libs/mysql';

export function loadAuth(ctx) {
  const user = ctx.session.user || null;

  ctx.body = user;
  ctx.status = 200;
  // return user;
  // return Promise.resolve(ctx.session.user || null);
}

// TODO: 查库，用username获取用户然后比对password
export async function login(ctx) {
  const result = await mysql.query('select * from m_user');
  const user = result[0];

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
