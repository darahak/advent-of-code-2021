import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import fetch from 'node-fetch';

const help = 'Please provide a date to run, e.g. `node setup.js 1` for day 1.';
const args = process.argv.slice(2);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  if (args.length < 1) {
    console.error(`Missing argument. ${help}`);
  } else {
    const env = fs.readFileSync(path.join(__dirname, '.env'), 'utf8');

    const number = Number.parseInt(args[0]);
    const target = `https://adventofcode.com/2021/day/${number}/input`;

    const result = await fetch(target, { headers: { Cookie: env.trim() } });

    if (result.ok) {
      const dirPath = path.join(__dirname, `day${number}`);
      const indexPath = path.join(dirPath, 'index.js');
      const inputPath = path.join(dirPath, 'input.txt');

      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
      }

      if (!fs.existsSync(indexPath)) {
        fs.copyFileSync(path.join(__dirname, 'template.js'), indexPath);
      }

      if (!fs.existsSync(inputPath)) {
        const input = await result.text();

        fs.writeFileSync(inputPath, input, { encoding: 'utf8' });
      }

      console.log('Done.');
    } else {
      console.error(
        `Fetch error on ${target}: ${result.status} ${result.statusText}`
      );
    }
  }
})();
