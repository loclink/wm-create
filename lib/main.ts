#!/usr/bin/env node
import { program } from 'commander';
import { COMMAND_NAME, PACKAGE_VERSION } from './config';
import autocomplete from 'inquirer-autocomplete-standalone';
import { registerCommands } from './commands';

// function searchCountries(input = ''): Promise<any[]> {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       const results = countries.filter((s) => s.toLowerCase().includes(input.toLowerCase()));
//
//       const all = results.map((r) => ({
//         value: r,
//         name: r,
//         description: `${r} is a great place to visit`,
//         disabled: false
//       }));
//
//       resolve(all);
//     }, 300 + 30);
//   });
// }

registerCommands();

program
  .name(COMMAND_NAME)
  .version(PACKAGE_VERSION, '-v, --version')
  .showHelpAfterError()
  .description('武汉美萌工程化开发脚手架工具');
program.parse(process.argv);
