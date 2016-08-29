'use strict';

const config          = require('../config');
const builder         = require('../modules/auth/builder');

exports.check = function (req, res) {

  const foo = builder.prepare(config.life);

  return res.send(foo);
}
