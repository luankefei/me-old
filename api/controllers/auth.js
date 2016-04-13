export function loadAuth(ctx) {
  ctx.body = {
    name: 'sunken',
    email: 'luankefei@gmail.com'
  };
  // return Promise.resolve(req.session.user || null);
}

export function login(ctx) {
  const user = {
    name: ctx.body.name
  };
  ctx.session.user = user;
  return user;
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
