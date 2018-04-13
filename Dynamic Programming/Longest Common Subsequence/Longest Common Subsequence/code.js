var i,j;

// Build the memo table in bottom up fashion 
 for( i = 0; i <= m; i++ ) {
 	for( j = 0; j <= n; j++ ) {
 		if ( i === 0 || j === 0 ) {
 			A[i][j] = 0;
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
 			
 			if( A[i-1][j] > A[i][j-1] ) {
 				A[i][j] = A[i-1][j];
 			} else {
 				A[i][j] = A[i][j-1];
 			}
 			
 			tracer3.deselect ( i-1, j );
 			tracer3.deselect ( i, j-1 );
 		}
 		tracer3.notify ( i, j , A[i][j] ).wait ();
 		tracer3.denotify( i, j );
 	}
 }

var finalString = '';
i=m;
j=n;
while( i>=1 && j>=1 ) {

	tracer3.select ( i, j ).wait ();
	if( string1[i-1] == string2[j-1] ) {
		tracer1.select ( i-1 ).wait ();
 		tracer2.select ( j-1 ).wait ();
 		
		finalString = string1[i-1] + finalString;
		i--;
		j--;
	} else if( A[i-1][j] > A[i][j-1] ) {
		i--;
	} else {
		j--;
	}
}

logger.print ( 'Longest Common Subsequence Length is ' + A[m][n] );
logger.print ( 'Longest Common Subsequence is ' + finalString );