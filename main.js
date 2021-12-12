import fs from 'fs';
import path from 'path';

const help = 'Please provide a date to run, e.g. `node main.js 1` for day 1.';
const args = process.argv.slice(2);

if (args.length < 1) {
  throw new Error(`Missing argument. ${help}`);
}

const number = Number.parseInt(args[0]);

if (Number.isNaN(number)) {
  throw new Error(`Argument ${args[0]} is not a number. ${help}`);
}

(async (number) => {
  const puzzle = await import(`./day${number}/index.js`);
  const input = fs.readFileSync(path.join(`day${number}`, 'input.txt'), {
    encoding: 'utf8',
  });

  const { first, second } = puzzle.default;

  const start1 = Date.now();
  const result1 = first(input);
  const seconds1 = (Date.now() - start1) / 1000;

  console.log(
    `Result for day ${number} part 1: ${result1} (${seconds1} seconds)`
  );

  const start2 = Date.now();
  const result2 = second(input);
  const seconds2 = (Date.now() - start2) / 1000;

  console.log(
    `Result for day ${number} part 2: ${result2} (${seconds2} seconds)`
  );
})(number);
