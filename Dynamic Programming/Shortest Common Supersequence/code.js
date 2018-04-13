var string1 = 'AGGTAB';
var string2 = 'GXTXAYB';
var m = string1.length;
var n = string2.length;
var A = new Array (m+1);
for (var i = 0; i < m+1; i++ ) {
	A[i] = new Array (n+1);
}

var tracer1 = new Array1DTracer ( 'String 1').set ( string1 );
var tracer2 = new Array1DTracer ( 'String 2').set ( string2 );
var tracer3 = new Array2DTracer ( 'Memo Table').set ( A );
var logger = new LogTracer ();

var i,j;

// Fill memo table in bottom up manner 
for ( i = 0; i <= m; i++ ) {
	for ( j = 0; j <= n; j++ ) {
		if( i === 0 ) {
			A[i][j] = j;
		} else if ( j === 0 ) {
			A[i][j] = i;
		} else if ( string1[i-1] == string2[j-1] ) {
			tracer1.select ( i-1 ).wait ();
 			tracer2.select ( j-1 ).wait ();
 			tracer3.select ( i-1, j-1 ).wait ();

			A[i][j] = A[i-1][j-1] + 1;

			tracer1.deselect ( i-1 );
 			tracer2.deselect ( j-1 );
 			tracer3.deselect ( i-1, j-1 );
		} else {
			tracer3.select ( i-1, j ).wait ();
 			tracer3.select ( i, j-1 ).wait ();

			if ( A[i-1][j] < A[i][j-1] ) {
				A[i][j] = 1 + A[i-1][j];
			} else {
				A[i][j] = 1 + A[i][j-1];
			}

			tracer3.deselect ( i-1, j );
 			tracer3.deselect ( i, j-1 );
		}
		tracer3.notify ( i, j , A[i][j] ).wait ();
 		tracer3.denotify( i, j );
	}
}

 logger.print ( 'Shortest Common Supersequence is ' + A[m][n] );
