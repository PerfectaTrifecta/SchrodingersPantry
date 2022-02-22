const { searchRouter } = require('./search.js');
const { videoRouter } = require('./videoRouter.js');
const { UserRouter } = require('./user.js');
const { authRouter } = require('./auth');

/*This is where we organize the endpoints that we use to call functions in the
associated route file.*/
module.exports = (app) => {
  app.use('/routes/search/', searchRouter);
  app.use('/routes/videos/', videoRouter);
  app.use('/upload/', UserRouter);
  app.use('/', authRouter);
};
