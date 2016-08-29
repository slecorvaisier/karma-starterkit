"use strict";

const config          = require('./config');
const authentication  = require('./controllers/authentication');

const Router = function(app) {

  app.get(config.auth_check, authentication.check);

  app.get('*', function(req, res) {
    return res.send('404');
  })
}

module.exports = Router;
