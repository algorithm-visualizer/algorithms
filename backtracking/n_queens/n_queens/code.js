function validState (row, col, currentQueen) {
	for (var q = 0; q < currentQueen; q++) {
		var currentQ = queens [q];
		if ( row === currentQ [0] || col === currentQ [1] || ( Math.abs(currentQ [0] - row) === Math.abs(currentQ [1] - col)) ) {
			return false;
		}
	}
	return true;
}

function nQ (currentQueen, currentCol) {
	logger.print ('Starting new iteration of nQueens () with currentQueen = ' + currentQueen +  ' & currentCol = ' + currentCol);
	logger.print ('------------------------------------------------------------------');
	if (currentQueen >= N) {
		logger.print ('The recursion has BOTTOMED OUT. All queens have been placed successfully');
		return true;
	}

	var found = false, row = 0;
	while ( (row < N) && (!found) ) {
		boardTracer.select (row, currentCol).wait ();
		logger.print ('Trying queen ' + currentQueen + ' at row ' + row + ' & col ' + currentCol);
		
		if (validState (row, currentCol, currentQueen)) {
			queens [currentQueen] [0] = row;
			queens [currentQueen] [1] = currentCol;

			queenTracer.notify (currentQueen, 0, row).wait ();
			queenTracer.notify (currentQueen, 1, currentCol).wait ();
			queenTracer.denotify (currentQueen, 0).wait ();
			queenTracer.denotify (currentQueen, 1).wait ();

			found = nQ (currentQueen + 1, currentCol + 1);
		}

		if (!found) {
			boardTracer.deselect (row, currentCol).wait ();
			logger.print ('row ' + row + ' & col ' + currentCol + ' didn\'t work out. Going down');
		}
		row++;
	}

	return found;
}

logger.print ('Starting execution');
nQ (0, 0);
logger.print ('DONE');