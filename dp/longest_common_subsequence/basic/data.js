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