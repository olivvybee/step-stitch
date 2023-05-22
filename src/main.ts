import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import canvas from 'canvas';
import { loadData } from './loadData';
import { buildCalendar } from './buildCalendar';
import { renderOutput } from './renderOutput';

const main = (inputFile: string, outputFile: string) => {
  const entries = loadData(inputFile);
  const calendar = buildCalendar(entries);
  renderOutput(calendar, outputFile);
};

yargs(hideBin(process.argv)).command(
  '* <inputFile> <outputFile>',
  'parse a file',
  (cmd) =>
    cmd
      .positional('inputFile', {
        description: 'Path to the input csv containing iOS step count data',
        type: 'string',
        demandOption: true,
      })
      .positional('outputFile', {
        description: 'Path to the output file',
        type: 'string',
        demandOption: true,
      }),
  (argv) => {
    main(argv.inputFile, argv.outputFile);
  }
).argv;
