var log4js = require('log4js');

log4js.clearAppenders();
log4js.loadAppender('file');
log4js.addAppender(log4js.appenders.file('logfile.txt'), 'my app');
var logger = log4js.getLogger('my app');

module.exports = logger;