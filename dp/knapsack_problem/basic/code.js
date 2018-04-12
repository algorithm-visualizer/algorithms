
for ( var i = 0; i <= N; i++ ) {
	for( var j = 0; j <= W; j++ ) {
		if( i === 0 || j === 0 ) { 
			/*
			If we have no items or maximum weight we can take in collection is 0 
			then the total weight in our collection is 0
			*/
			DP[i][0] = 0;
			tracer.notify( i, j, DP[i][j]).wait();
			tracer.denotify( i, j);
		} else if ( wt[i-1] <= j ) { // take the current item in our collection

			dataViewer1.select(i-1).wait();
			dataViewer2.select(i-1).wait();
			tracer.select( i-1, j).wait();

			var A = val[i - 1] + DP[i - 1][j - wt[i - 1]];
			var B = DP[i - 1][j];
			/*
			find the maximum of these two values
			and take which gives us a greater weight
			 */
			if (A > B) {
				DP[i][j] = A;
				tracer.notify( i, j, DP[i][j]).wait();
			} else {
				DP[i][j] = B;
				tracer.notify( i, j, DP[i][j]).wait();
			}

			tracer.deselect( i-1, j);
			tracer.denotify( i, j);
			dataViewer2.deselect(i-1);
			dataViewer1.deselect(i-1);

		} else { // leave the current item from our collection 

			DP[i][j] = DP[i - 1][j];
			tracer.notify( i, j, DP[i][j]).wait();
			tracer.denotify( i, j);
		}
	}
}

logger.print(' Best value we can achieve is ' + DP[N][W]);
