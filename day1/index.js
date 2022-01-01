export default {
  /** @argument input {string} */
  first(input) {
    const lines = input.trim().split('\n');
    const values = lines.map((line) => Number.parseInt(line));

    let increaseCount = 0;
    let previous = values.shift();

    values.forEach((value) => {
      if (value > previous) {
        ++increaseCount;
      }

      previous = value;
    });

    return increaseCount;
  },

  /** @argument input {string} */
  second(input) {
    const lines = input.trim().split('\n');
    const values = lines.map((line) => Number.parseInt(line));

    let increaseCount = -1;
    let previous = 0;

    values.forEach((value, index) => {
      const a = values[index + 1];
      const b = values[index + 2];

      if (a != null && b != null) {
        const sum = value + a + b;

        if (sum > previous) {
          ++increaseCount;
        }

        previous = sum;
      }
    });

    return increaseCount;
  },
};
