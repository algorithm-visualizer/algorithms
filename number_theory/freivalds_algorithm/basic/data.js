var A = [[2,3],[3,4]];
var B = [[1,0],[1,2]];
var C = [[6,5],[8,7]];

var _a = new Array2DTracer('Matrix A'); _a.set(A);
var _b = new Array2DTracer('Matrix B'); _b.set(B);
var _c = new Array2DTracer('Matrix C'); _c.set(C);

var logger = new LogTracer();

var _r = new Array1DTracer('Random Vector'); 
var _p = new Array1DTracer('Result Vector'); 
