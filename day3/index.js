export default {
  /** @argument input {string} */
  first(input) {
    const lines = input.trim().split('\n');
    const values = lines.map((line) =>
      line.split('').map((token) => Number.parseInt(token))
    );

    const maxIterations = values[0].length;
    const totalCount = values.length;

    let gammaRateBin = '';
    let epsilonRateBin = '';

    for (let i = 0; i < maxIterations; ++i) {
      let sum = 0;

      for (let j = 0; j < totalCount; ++j) {
        sum += values[j][i];
      }

      const hasMoreOnes = sum > totalCount / 2;

      gammaRateBin += hasMoreOnes ? '1' : '0';
      epsilonRateBin += hasMoreOnes ? '0' : '1';
    }

    const gammaRate = Number.parseInt(gammaRateBin, 2);
    const epsilonRate = Number.parseInt(epsilonRateBin, 2);

    return gammaRate * epsilonRate;
  },

  /** @argument input {string} */
  second(input) {
    const lines = input.trim().split('\n');
    const values = lines.map((line) =>
      line.split('').map((token) => Number.parseInt(token))
    );
    const clone = (o) => JSON.parse(JSON.stringify(o));

    /** @type number[][] */
    let o2Values = clone(values);

    let i = 0;

    while (o2Values.length > 1) {
      let sum = 0;

      for (let j = 0; j < o2Values.length; ++j) {
        sum += o2Values[j][i];
      }

      const criteria = sum >= o2Values.length / 2 ? '1' : '0';

      o2Values = o2Values.filter((value) => String(value[i]) === criteria);

      ++i;
    }

    const [o2GeneratorRateBin] = o2Values;
    const o2GeneratorRate = Number.parseInt(
      o2GeneratorRateBin.map(String).join(''),
      2
    );

    /** @type number[][] */
    let co2Values = clone(values);

    i = 0;

    while (co2Values.length > 1) {
      let sum = 0;

      for (let j = 0; j < co2Values.length; ++j) {
        sum += co2Values[j][i];
      }

      const criteria = sum >= co2Values.length / 2 ? '1' : '0';

      co2Values = co2Values.filter((value) => String(value[i]) !== criteria);

      ++i;
    }

    const [co2ScrubberRateBin] = co2Values;
    const co2ScrubberRate = Number.parseInt(
      co2ScrubberRateBin.map(String).join(''),
      2
    );

    return o2GeneratorRate * co2ScrubberRate;
  },
};
