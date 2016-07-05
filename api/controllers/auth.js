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
  // console.log(ctx);
  console.log('-------', ctx);
  // const user = {
  //   username: ctx.body.username,
  //   password: ctx.body.password
  // };

  const user = {
    name: 'hehe',
    password: '123'
  };

  // 查库，用username获取用户然后比对password

  ctx.session.user = user;
  ctx.body = user;
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
