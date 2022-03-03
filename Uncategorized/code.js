	// import visualization libraries {
	const { Array2DTracer, Layout, LogTracer, Tracer, VerticalLayout } = require('algorithm-visualizer');
	// }

	// define tracer variables {
	const patternTracer = new Array2DTracer('Pattern')
	const textTracer = new Array2DTracer('Text')
	// }

	// define input variables
	const pattern = 'abacabab';
	const text = 'ababacabacababacabad'

	// define KMP array
	let KMP = [];
	
	// calculate KMP table for pattern
	function build_table() {
		KMP.push(0);
		// visualize {
		patternTracer.patch(2,0,0);
		Tracer.delay();
		patternTracer.depatch(2,0);
		// }
		let n = 0;
		for (let i=2; i <= pattern.length; i++) {
			// visualize {
			patternTracer.patch(0,n,pattern[n]);
			patternTracer.patch(1,i-1,pattern[i-1]);
			Tracer.delay();
			// }
			while (n > 0 && pattern[i-1] != pattern[n]) {
				// visualize {
				patternTracer.patch(2,n-1,KMP[n-1]);
				Tracer.delay();
				patternTracer.depatch(2,n-1);
				patternTracer.depatch(0,n);
				patternTracer.deselectRow(0,KMP[n-1],n-1);
				patternTracer.deselectRow(1,i-1-n,i-2-KMP[n-1]);
				// }
				n = KMP[n-1];
				// visualize {
				patternTracer.patch(0,n,pattern[n]);
				Tracer.delay();
				// }
			}
			// visualize {
			patternTracer.depatch(0,n);
			patternTracer.depatch(1,i-1);
			// }
			if (pattern[i-1] == pattern[n]) {
				// visualize {
				patternTracer.select(0,n);
				patternTracer.select(1,i-1);
				// }
				n++;
			}
			KMP.push(n);
			// visualize {
			patternTracer.patch(2,i-1,n);
			Tracer.delay();
			patternTracer.depatch(2,i-1);
			// }
		}
		// visualize {
		patternTracer.deselect(0,0,1,pattern.length-1);
		// }
	}
	
	// search pattern in text
	function search_pattern() {
		let n = 0;
		for (let i=1; i <= text.length; i++) {
			// visualize {
			if (n < pattern.length) {
				patternTracer.patch(0,n,pattern[n]);
			}
			textTracer.patch(0,i-1,text[i-1]);
			Tracer.delay();
			// }
			while (n > 0 && text[i-1] != pattern[n]) {
				// visualize {
				patternTracer.patch(1,n-1,KMP[n-1]);
				Tracer.delay();
				patternTracer.depatch(1,n-1);
				if (n < pattern.length) {
					patternTracer.depatch(0,n);
				}
				patternTracer.deselectRow(0,KMP[n-1],n-1);
				textTracer.deselectRow(0,i-1-n,i-2-KMP[n-1]);
				// }
				n = KMP[n-1];
				// visualize {
				patternTracer.patch(0,n,pattern[n]);
				Tracer.delay();
				// }
			}
			// visualize {
			patternTracer.depatch(0,n);
			textTracer.depatch(0,i-1);
			// }
			if (text[i-1] == pattern[n]) {
				// visualize {
				patternTracer.select(0,n);
				textTracer.select(0,i-1);
				// }
				n++;
			}
			// visualize {
			textTracer.patch(1,i-1,n);
			Tracer.delay();
			textTracer.depatch(1,i-1);
			if (n == pattern.length) {
				textTracer.select(1,i-1);
			}
			// }
		}
		// visualize {
		patternTracer.deselectRow(0,0,pattern.length-1);
		textTracer.deselectRow(0,0,text.length-1);
		// }
	}
			


	(function main() {
	  // visualize {
	  Layout.setRoot(new VerticalLayout([patternTracer,textTracer]));
	  patternTracer.set([pattern,pattern,[]]);
	  textTracer.set([text,[]]);
	  Tracer.delay();
	  // }
	  build_table();
	  // visualize {
	  patternTracer.set([pattern,KMP]);
	  Tracer.delay();
	  // }
	  search_pattern();
	})();
