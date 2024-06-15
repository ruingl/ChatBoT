const chalk = require('chalk');

const currentTime = new Date().toLocaleTimeString();

module.exports = {
  custom: (title, message) => {
    console.log(chalk.blue(`[${currentTime}] [ ${title} ] » ${message}`));
  },
  info: (message) => {
    console.log(chalk.blue(`[${currentTime}] [ Info ] » ${message}`));
  },
  warn: (message) => {
    console.warn(chalk.yellow(`[${currentTime}] [ Warn ] » ${message}`));
  },
  success: (message) => {
    console.log(chalk.green(`[${currentTime}] [ Success ] » ${message}`));
  },
  error: (message) => {
    console.error(chalk.red(`[${currentTime}] [ Error ] » ${message}`));
  },
};