console.clear();
process.on('unhandledRejection', (error) => console.error(error));
process.on('unhandledException', (error) => console.error(error));

const __pkg = require('./package.json');
const express = require('express');
const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path');

global.ChatBoT = {
  startTime: new Date(),
  config: fs.readJSONSync('./config.json'),
  commands: new Map(),
  events: new Map(),
  onReply: new Map(),
};

// destructure | setup
const PORT = process.env.PORT || 3000;
const app = new express();
app.use(express.static('public'));

async function start() {
  const utils = require('./utils');
  const log = require('./lib/log');
  
  global.ChatBoT = { utils, log };
  
  const appState = await fs.readJSON('./appState.json');
  
  console.log(chalk.blue(`ChatBoT v${__pkg.version}`));
  require('./src/login')({ appState });
};

start();