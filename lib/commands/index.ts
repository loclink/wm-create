import { program } from 'commander';
import { createTable } from '@/actions';
import { swaggerParse } from '@/utils';

export const registerCommands = () => {
  program
    .command('create')
    .option('-t, --table', '根据swaggerJson生成ProTableProps')
    .action((args) => {
      swaggerParse((err, api) => {
        if (err) throw new Error(err.message);
        args?.table && createTable(api);
      });
    });
};
