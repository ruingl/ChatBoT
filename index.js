const { spawn } = require('child_process');
const log = require('./lib/log');

const start = () => {
  const child = spawn('node main.js', {
    env: process.env,
    cwd: __dirname,
    stdio: 'inherit',
    shell: true,
  });
  
  child.on('close', (code) => {
    if (code === 2) {
      start();
    };
  })
};

start();