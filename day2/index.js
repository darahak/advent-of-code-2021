export default {
  /** @argument input {string} */
  first(input) {
    const lines = input.trim().split('\n');

    let position = 0;
    let depth = 0;

    lines.forEach((line) => {
      const [command, token] = line.split(' ');
      const value = Number.parseInt(token);

      switch (command) {
        case 'forward': {
          position += value;
          break;
        }
        case 'up': {
          depth -= value;
          break;
        }
        case 'down': {
          depth += value;
          break;
        }
      }
    });

    return position * depth;
  },

  /** @argument input {string} */
  second(input) {
    const lines = input.trim().split('\n');

    let position = 0;
    let depth = 0;
    let aim = 0;

    lines.forEach((line) => {
      const [command, token] = line.split(' ');
      const value = Number.parseInt(token);

      switch (command) {
        case 'forward': {
          position += value;
          depth += value * aim;
          break;
        }
        case 'up': {
          aim -= value;
          break;
        }
        case 'down': {
          aim += value;
          break;
        }
      }
    });

    return position * depth;
  },
};
