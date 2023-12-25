import { program } from 'commander';
import { createTable } from '@/actions';
import { swaggerParse } from '@/utils';

export const registerCommands = () => {
  program
    .command('create')
    .option('-t, --table')
    .action((args) => {
      swaggerParse((err, api) => {
        if (err) throw new Error(err.message);
        if (args.table) createTable(api);
      });
    });
};
