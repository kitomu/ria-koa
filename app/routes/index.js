module.exports = (app) => {
  const Router = require('koa-router');
  const router = new Router();

  const {getRecord , newRecord , deleteRecord} = require('../controllers');


  router
  .get('/goods/:id', getRecord)
  .post('/goods', newRecord)
  .delete('/goods/:id' , deleteRecord);

  app.use(router.routes())
  app.use(router.allowedMethods());

}