'use strict'

const chalk = require('chalk')
const electron = require('electron')
const path = require('path')
const { spawn } = require('child_process')
const webpack = require('webpack')
const NgCli = require("@angular/cli");
const WaitOn = require("wait-on");
const { greeting, logStats, rendererLog, mainLog, electronLog } = require('./logger');
const WebpackDevServer = require('webpack-dev-server')
const webpackHotMiddleware = require('webpack-hot-middleware')

const mainConfig = require('./webpack.main.config')

let electronProcess = null
let manualRestart = false
let hotMiddleware

function startRenderer() {
  NgCli.default({ cliArgs: ['serve', '--configuration', 'development'] })
    .then(result => rendererLog(result, 'blue'))
    .catch((err) => rendererLog(err, 'red'));

  return WaitOn({ resources: ['tcp:4200'] }).then(() => {
    rendererLog('The renderer process is running at port 4200!', 'blue');
  });
}

function startMain() {
  return new Promise((resolve, reject) => {
    const compiler = webpack.webpack(mainConfig)

    compiler.watch({}, (err, stats) => {
      if (err) return console.log(err);

      logStats('Main', stats)

      if (!electronProcess || electronProcess.kill) return resolve();

      manualRestart = true
      process.kill(electronProcess.pid)
      electronProcess = null
      startElectron()

      setTimeout(() => manualRestart = false, 5000);
    });
  })
}

function startElectron() {
  electronProcess = spawn(electron, [
    '--inspect=5858',
    path.join(__dirname, '../../dist/electron-main/main.js')
  ]);

  electronProcess.stdout.on('data', data => electronLog(data, 'blue'));
  electronProcess.stderr.on('data', data => electronLog(data, 'red'));

  electronProcess.on('close', () => {
    if (!manualRestart) process.exit()
  });
}

function init () {
  greeting()

  Promise.all([startRenderer(), startMain()])
    .then(() => startElectron())
    .catch(err => {
      console.error(err)
    })
}

init()
