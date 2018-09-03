const morgan = require('morgan');
const LoggerStreamAdapter = require('../../../infrastructure/LoggerStreamAdapter.js');

module.exports = ({ logger }) => {
  return morgan('dev', {
    stream: LoggerStreamAdapter.toStream(logger)
  });
};
