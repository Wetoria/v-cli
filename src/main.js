import program from 'commander';
import { VERSION } from './utils/constants';
import apply from './index';
import chalk from 'chalk';

let actiomMap = {
  init: {
    description: 'generate a new project from a template',
    usages: [
      'v init templateName projectName',
    ],
  },
  config: {
    alias: 'cfg',
    description: 'config .vrc',
    usages: [
      'v config set <k> <v>',
      'v config get <k>',
      'v config remove <k>'
    ],
  },
};

Object.keys(actiomMap).forEach((action) => {
  program.command(action)
  .description(actiomMap[action].description)
  .alias(actiomMap[action].alias)
  .action(() => {
    switch (action) {
      case 'config':
        //配置
        apply(action, ...process.argv.slice(3));
        break;
      case 'init':
        apply(action, ...process.argv.slice(3));
        break;
      default:
        break;
    }
  });
});

function help() {
  console.log('\r\nUsage:');
  Object.keys(actiomMap).forEach((action) => {
    actiomMap[action].usages.forEach((usage) => {
      console.log('  - ' + usage);
    });
  });
}

program.usage('<command> [options]');

program.on('-h', help);
program.on('--help', help);
program.version(VERSION, '-V --version').parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp(make_green);
}

function make_green(txt) {
  return chalk.green(txt);
}