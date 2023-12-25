#!/usr/bin/env node
import { program } from 'commander';
import { COMMAND_NAME, PACKAGE_VERSION } from './config';
import { registerCommands } from './commands';

registerCommands();

program
  .name(COMMAND_NAME)
  .version(PACKAGE_VERSION, '-v, --version')
  .showHelpAfterError()
  .description('武汉美萌工程化开发脚手架工具');

program.parse(process.argv);
