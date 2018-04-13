logger.print("Finding the greatest common divisor of " + a[0] + " and " + a[1]);

logger.print("Checking if first number is at most the second number");

if(a[0] > a[1]) {
    var tmp = a[0];
    a[0] = a[1];
    a[1] = tmp;
    logger.print("The first number is bigger than the second number. Switching the numbers.");
    tracer.set(a).wait();
}

while(a[0] > 0) {
    logger.print(a[1] + " % " + a[0] + " = " + a[1]%a[0]);
    logger.print("Switching a[1] with a[1]%a[0]");
    a[1] %= a[0];
    tracer.notify(1, a[1]).wait();
    logger.print("Now switching the two values to keep a[0] < a[1]");
    var tmp = a[0];
    a[0] = a[1];
    a[1] = tmp;
    tracer.notify(0, a[0]);
    tracer.notify(1, a[1]).wait();
    tracer.denotify(0);
    tracer.denotify(1);
}

logger.print("The greatest common divisor is " + a[1]);