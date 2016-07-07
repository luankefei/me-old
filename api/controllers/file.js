
// import mysql from '../libs/mysql';

// const uploader = multer.single('image');


// 暂时仅用于图片上传，写库，写文件
export async function upload(ctx) {
  // const uploader = multer({ dest: 'uploads/' });

  // uploader(

  console.log('😄 呵呵呵呵呵', ctx);
  ctx.body = null;
  ctx.status = 200;


  // const username = ctx.request.body.username;
  // const password = ctx.request.body.password;
  //
  // const upload = multer({ dest: 'uploads/' })

  // const result = await mysql.query(`SELECT * FROM m_user WHERE username='${username}'`);

  // let user = null;
  // if (result && result.length) {
  //   user = result[0];
  //
  //   // 密码校验不通过
  //   if (user.password !== password) {
  //     user = null;
  //   }
  // }
  //
  // ctx.body = user;
  // ctx.session.user = user;
  // ctx.status = 200;
}


export default {
  upload
};
