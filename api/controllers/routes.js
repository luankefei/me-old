
import auth from './auth';
import file from './file';

// uploader.single('image')

/**
 * 设置路由
 * @param  {koa-router} router
 */
export default router => {
  router.get('/auth', auth.loadAuth);
  router.post('/auth', auth.login);
  router.del('/auth', auth.logout);

  router.post('/upload', file.upload);

  // router.get('/content', content.getContent)
  // router.post('/content', content.addContent)
  // router.get('/content/:id', content.getContentById)
  // router.delete('/content', content.deleteContentById)
  //
  // router.post('/comment', comment.addComment)
  // router.get('/comment/:id', comment.getCommentById)
};
