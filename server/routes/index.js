const { searchRouter } = require('./search.js');
const { authRouter } = require('./auth.js');
const { Router } = require('express');

/*This is where we organize the endpoints that we use to call functions in the
associated route file.*/

const routes = Router();
routes.use('/routes/search', searchRouter);
routes.use('/', authRouter);
module.exports = routes;
