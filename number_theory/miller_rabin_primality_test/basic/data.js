var logger = new LogTracer();

var a = Math.floor(Math.random()*300); if (a % 2 === 0) a += 1;
testProbablyPrime(a);
logger.print("----------");

var a = Math.floor(Math.random()*300); if (a % 2 === 0) a += 1;
testProbablyPrime(a);
logger.print("----------");

var a = Math.floor(Math.random()*300); if (a % 2 === 0) a += 1;
testProbablyPrime(a);
logger.print("----------");

testProbablyPrime(151);
logger.print("----------");

testProbablyPrime(199, 10);