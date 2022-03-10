var log4js = require('log4js');

log4js.configure({
  appenders: {
    file: {
      type: 'file',
      filename: 'logfile.txt'
    }
  },
  categories: {
    'my-app': {
      appenders: [ 'file' ],
      level: 'debug'
    },
    default: {
      appenders: [ 'file' ],
      level: 'info'
    }
  }
});

var logger = log4js.getLogger('my app');

module.exports = logger;