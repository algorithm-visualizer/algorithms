function knightTour(x, y, moveNum) {
	if (moveNum === N*N) {
		return true;
	}

	for (var i = 0; i < 8; i++) {
		var nextX = x + X[i];
		var nextY = y + Y[i];
		
		posTracer.notify ( 0, nextX).wait ();
		posTracer.notify ( 1, nextY).wait ();
		posTracer.denotify (0);
		posTracer.denotify (1);
		/*
		Check if knight is still in the board
		Check that knight does not visit an already visited square
		*/
		if (nextX>=0 && nextX<N && nextY>=0 && nextY<N && board[nextX][nextY]===-1) {
			board[nextX][nextY] = moveNum;
			
			logTracer.print ('Move to ' + nextX + ',' + nextY);
			boardTracer.notify ( nextX, nextY, moveNum).wait();
			boardTracer.denotify( nextX, nextY);
			boardTracer.select ( nextX, nextY);
			
			var nextMoveNum = moveNum + 1;
			if ( knightTour (nextX,nextY, nextMoveNum) === true) {
				return true;
			} else {
				logTracer.print ('No place to move from ' + nextX + ',' +nextY + ': Backtrack');
				board[nextX][nextY] = -1; // backtrack 
				boardTracer.notify ( nextX, nextY, -1).wait();
				boardTracer.denotify( nextX, nextY);
				boardTracer.deselect( nextX, nextY);
			}
		} else {
			logTracer.print (nextX + ',' + nextY + ' is not a valid move');
		}
	}
	return false;
}

board[0][0] = 0; // start from this position
pos[0] = 0;
pos[0] = 0;

boardTracer.notify ( 0, 0, 0).wait();
posTracer.notify ( 0, 0).wait ();
posTracer.notify ( 1, 0).wait ();
boardTracer.denotify( 0, 0);
boardTracer.denotify( 0, 0);
posTracer.denotify (0);
posTracer.denotify (1);

if (knightTour ( 0, 0, 1) === false ) {
	logTracer.print ('Solution does not exist');
} else {
	logTracer.print ('Solution found');
}
