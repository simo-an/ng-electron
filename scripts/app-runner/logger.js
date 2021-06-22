const chalk = require('chalk')
const { say } = require('cfonts')

function logStats (proc, data) {
  let log = '\n\n'

  log += chalk.yellow.bold(`┏ ${proc} Process ${new Array((19 - proc.length) + 1).join('-')}`)
  log += '\n\n'

  if (typeof data === 'object') {
    data.toString({
      colors: true,
      chunks: false
    }).split(/\r?\n/).forEach(line => {
      log += '  ' + line + '\n'
    })
  } else {
    log += `  ${data}\n`
  }

  log += '\n' + chalk.yellow.bold(`┗ ${new Array(28 + 1).join('-')}`) + '\n'

  console.log(log)
}

function printLog(target, data, color) {
  let log = ''

  data = data.toString().split(/\r?\n/)
  data.forEach(line => log += `  ${line}\n`)

  if (/[0-9A-z]+/.test(log)) {
    console.log(
      chalk[color].bold(`\n┏ ${target} -------------------`) +
      '\n\n' +
      log +
      chalk[color].bold('┗ ----------------------------') +
      '\n'
    )
  }
}

function greeting () {
  const cols = process.stdout.columns
  let text = ''

  if (cols > 104) text = 'electron-ng'
  else if (cols > 76) text = 'electron-|ng'
  else text = false

  if (text) {
    say(text, {
      colors: ['blue'],
      font: 'simple3d',
      space: false
    })
  } else console.log(chalk.yellow.bold('\n  electron-ng'))
  console.log(chalk.blue('Hello NgElectron ...') + '\n')
}

function mainLog(data, color) { printLog('Main', data, color); }
function rendererLog(data, color) { printLog('Renderer', data, color); }
function electronLog(data, color) { printLog('Electron', data, color); }

module.exports = {
  greeting,
  logStats,
  mainLog, rendererLog, electronLog
}
