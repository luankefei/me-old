export function loadAuth(ctx) {
  ctx.body = {
    nick: 'sunken',
    avatar: 'http://wx.qlogo.cn/mmopen/PiajxSqBRaEKwEwVRdkBzHUAO31IDTXUOf4nHP9ibNDvcaK2D3NUK8xmQP7IZWup4xhhcQia1DU5kEpuEBttibGJAg/0',
    intro: '通常来说，Javascript程序只有一行',
    state: 1,
    last_login_time: '2015.11.11 10:30:26',
    register_time: '2015.11.11 10:30:26',
    remark: '管理员'
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
