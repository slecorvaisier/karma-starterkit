'use strict';

const env = process.env.NODE_ENV || 'development';
let config = require('./development');

if (env === 'production') config = require('./production');

module.exports = config;
