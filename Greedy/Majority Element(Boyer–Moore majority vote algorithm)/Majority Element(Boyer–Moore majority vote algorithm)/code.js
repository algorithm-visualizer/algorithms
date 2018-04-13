function isMajorityElement ( element ) {
	var count = 0;
	logger.print ('Verify majority element ' + element );
	for (var i = N - 1; i >= 0; i--) {
		tracer.notify (i,A[i]).wait ();
		if (A[i] == element) {
			count++;
		} else {
			tracer.denotify (i);
		}
	}
	logger.print ('Count of our assumed majority element ' + count);
	if(count>Math.floor (N/2)) {
		logger.print ('Our assumption was correct!');
		return true;
	}
	logger.print ('Our assumption was incorrect!');
	return false;
}

function findProbableElement () {
	var index = 0, count = 1;
	tracer.select (index).wait();
	logger.print ('Beginning with assumed majority element : ' + A[index] + ' count : ' +count);
	logger.print ('--------------------------------------------------------');
	for( var i = 1; i < N; i++ ) {
		tracer.notify (i,A[i]).wait ();
		if(A[index]==A[i]) {
			count++;
			logger.print ('Same as assumed majority element! Count : ' + count);
		} else {
			count--;
			logger.print ('Not same as assumed majority element! Count : ' + count);
		}

		if(count===0) {
			logger.print ('Wrong assumption in majority element');
			tracer.deselect (index);
			tracer.denotify (i);
			index = i;
			count = 1;
			tracer.select (i).wait ();
			logger.print ('New assumed majority element!'+ A[i]  +' Count : '+count);
			logger.print ('--------------------------------------------------------');
		} else {
			tracer.denotify (i);
		}
	}
	logger.print ('Finally assumed majority element ' + A[index]);
	logger.print ('--------------------------------------------------------');
	return A[index];
}

function findMajorityElement () {
	var element = findProbableElement ();
	if(isMajorityElement (element) === true) {
		logger.print ('Majority element is ' + element);
	} else {
		logger.print ('No majority element');
	}
}

findMajorityElement ();