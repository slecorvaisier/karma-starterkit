'use strict';

const express       = require('express');
const bodyParser    = require('body-parser');
const Router        = require('./router');

const port  = process.env.PORT || 8080;
const app   = express();

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

// Routing
Router(app);

// Start server
app.listen(port, function(err) {
  console.log('[%s] Listening on http://localhost:%d', app.settings.env, port);
});
