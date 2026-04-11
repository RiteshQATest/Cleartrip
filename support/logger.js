'use strict';

const fs = require('fs');
const path = require('path');
const config = require('./config');

const logsDir = path.resolve(config.paths.logs);
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const logFile = path.join(logsDir, `test-${new Date().toISOString().replace(/[:.]/g, '-')}.log`);
const logStream = fs.createWriteStream(logFile, { flags: 'a' });

function formatMessage(level, message) {
  const timestamp = new Date().toISOString();
  return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
}

function writeLog(level, message) {
  const formatted = formatMessage(level, message);
  logStream.write(formatted + '\n');
  if (level === 'error') {
    console.error(formatted);
  } else if (process.env.VERBOSE === 'true' || level === 'warn') {
    console.log(formatted);
  }
}

const logger = {
  info: (message) => writeLog('info', message),
  warn: (message) => writeLog('warn', message),
  error: (message) => writeLog('error', message),
  debug: (message) => writeLog('debug', message),
  step: (message) => writeLog('step', `>>> ${message}`)
};

module.exports = logger;
