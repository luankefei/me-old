
import auth from './auth';


/**
 * 设置路由
 * @param  {koa-router} router
 */
export default router => {
  router.get('/auth', auth.loadAuth);
  router.post('/auth', auth.login);
  router.del('/auth', auth.logout);
};
