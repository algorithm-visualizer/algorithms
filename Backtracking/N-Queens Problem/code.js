import { Array2DTracer, LogTracer } from 'algorithm-visualizer';

const N = 4; // just change the value of N and the visuals will reflect the configuration!
const board = (function createArray(N) {
  const result = [];
  for (let i = 0; i < N; i++) {
    result[i] = Array(...Array(N)).map(Number.prototype.valueOf, 0);
  }
  return result;
}(N));
const queens = (function qSetup(N) {
  const result = [];
  for (let i = 0; i < N; i++) {
    result[i] = [-1, -1];
  }
  return result;
}(N));

const boardTracer = new Array2DTracer('Board');
const queenTracer = new Array2DTracer('Queen Positions');
const logger = new LogTracer('Progress');

boardTracer.set(board);
queenTracer.set(queens);
logger.print(`N Queens: ${N}X${N}matrix, ${N} queens`).delay();

function validState(row, col, currentQueen) {
  for (let q = 0; q < currentQueen; q++) {
    const currentQ = queens[q];
    if (row === currentQ[0] || col === currentQ[1] || (Math.abs(currentQ[0] - row) === Math.abs(currentQ[1] - col))) {
      return false;
    }
  }
  return true;
}

function nQ(currentQueen, currentCol) {
  logger.print(`Starting new iteration of nQueens () with currentQueen = ${currentQueen} & currentCol = ${currentCol}`);
  logger.print('------------------------------------------------------------------');
  if (currentQueen >= N) {
    logger.print('The recursion has BOTTOMED OUT. All queens have been placed successfully');
    return true;
  }

  let found = false;
  let row = 0;
  while ((row < N) && (!found)) {
    boardTracer.select(row, currentCol).delay();
    logger.print(`Trying queen ${currentQueen} at row ${row} & col ${currentCol}`);

    if (validState(row, currentCol, currentQueen)) {
      queens[currentQueen][0] = row;
      queens[currentQueen][1] = currentCol;

      queenTracer.patch(currentQueen, 0, row).delay();
      queenTracer.patch(currentQueen, 1, currentCol).delay();
      queenTracer.depatch(currentQueen, 0).delay();
      queenTracer.depatch(currentQueen, 1).delay();

      found = nQ(currentQueen + 1, currentCol + 1);
    }

    if (!found) {
      boardTracer.deselect(row, currentCol).delay();
      logger.print(`row ${row} & col ${currentCol} didn't work out. Going down`);
    }
    row++;
  }

  return found;
}

logger.print('Starting execution');
nQ(0, 0);
logger.print('DONE');
