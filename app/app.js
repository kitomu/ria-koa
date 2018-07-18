const Koa = require('koa'),
      config = require('config');

const PORT  = process.env.PORT||config.server.port;

const app = new Koa();

require('./helpers/errorHandler')(app);
require('./routes')(app);

app.listen(PORT, err => {
  if(err) console.error(err.message);
  console.log(`${config.app.name} working on ${PORT} port`);
})

