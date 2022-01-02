export default {
  /** @argument input {string} */
  first(input) {
    const [numbers, boards] = parseInput(input);

    let winningNumber = -1;
    let winningBoardIndex = -1;

    for (let i = 0; i < numbers.length; ++i) {
      const number = numbers[i];

      for (let j = 0; j < boards.length; ++j) {
        const board = boards[j];

        for (let k = 0; k < board.length; ++k) {
          let token = board[k];

          if (token.value === number) {
            token.marked = true;
          }
        }

        if (validateBoard(board)) {
          winningNumber = number;
          winningBoardIndex = j;
          break;
        }
      }

      if (winningNumber > -1) {
        break;
      }
    }

    let uncheckedSum = 0;

    const winningBoard = boards[winningBoardIndex];

    winningBoard.forEach((token) => {
      if (!token.marked) {
        uncheckedSum += token.value;
      }
    });

    return uncheckedSum * winningNumber;
  },

  /** @argument input {string} */
  second(input) {
    const [numbers, boards] = parseInput(input);

    let winningNumber = -1;
    let winningBoardIndexList = new Set();

    for (let i = 0; i < numbers.length; ++i) {
      const number = numbers[i];

      for (let j = 0; j < boards.length; ++j) {
        if (winningBoardIndexList.has(j)) {
          continue;
        }

        const board = boards[j];

        for (let k = 0; k < board.length; ++k) {
          let token = board[k];

          if (token.value === number) {
            token.marked = true;
          }
        }

        if (validateBoard(board)) {
          winningNumber = number;
          winningBoardIndexList.add(j);
        }
      }
    }

    let uncheckedSum = 0;

    const lastWinningBoardIndex = Array.from(winningBoardIndexList).pop();
    const lastWinningBoard = boards[lastWinningBoardIndex];

    lastWinningBoard.forEach((token) => {
      if (!token.marked) {
        uncheckedSum += token.value;
      }
    });

    return uncheckedSum * winningNumber;
  },
};

/**
 * @typedef {Array<{value: number, marked: boolean}>} Board
 */

/**
 * @param {string} input
 * @returns {[number[], Board[]]}
 */
function parseInput(input) {
  const blocks = input.trim().split('\n\n');
  const [textNumbers, ...textBoards] = blocks;

  /** @type number[] */
  const numbers = textNumbers.split(',').map((token) => Number.parseInt(token));

  /** @type Board[] */
  const boards = textBoards.map((textBoard) => {
    return textBoard.split('\n').flatMap((line) =>
      line
        .split(' ')
        .filter((token) => token.length > 0)
        .map((token) => ({ value: Number.parseInt(token), marked: false }))
    );
  });

  return [numbers, boards];
}

/**
 * @param {Board} board
 * @returns {boolean}
 */
function validateBoard(board) {
  const width = 5;
  const height = 5;

  /** @type number[] */
  let columnChecks = new Array(width).fill(0);

  for (let i = 0; i < width; ++i) {
    let lineCheck = 0;

    for (let j = 0; j < height; ++j) {
      const index = j * width + i;

      if (board[index].marked) {
        ++lineCheck;
        ++columnChecks[j];
      }
    }

    if (lineCheck === width) {
      return true;
    }
  }

  return columnChecks.includes(height);
}
