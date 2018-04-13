var gridSize = 10;
var generations = 4;
var fillChance = 0.55;

var G = [];
var nextG = [];
for (var i = 0; i < gridSize; i++) {
	G[i] = [];
	nextG[i] = [];
	for (var j = 0; j < gridSize; j++) {
		if (Math.random() < fillChance || i === 0 || j === 0 || i == gridSize - 1 || j == gridSize - 1) {
			G[i][j] = '#';
		} else {
			G[i][j] = '.';
		}
		nextG[i][j] = '#';
	}
}
var tracer = new Array2DTracer ();
tracer.set(G);

for (var gi = 0; gi < G.length; gi++) {
	for (var gj = 0; gj < G[gi].length; gj++) {
		if (G[gi][gj] == '#') {
			tracer.notify(gi, gj, G[gi][gj]);
		}
	}
}

function CellularAutomata(fillShape, emptyShape) {
	var nextGrid = [];

	for (let i = 0; i < G.length; i++) {
		nextGrid[i] = [];
		for (let j = 0; j < G[i].length; j++) {
			var adjCount = 0;
			var twoAwayCount = 0;
			//look at the states of the neighboring cells
			for (var x = -2; x <= 2; x++) {
				for (var y = -2; y <= 2; y++) {
					if ((i + x >= 0 && i + x < G.length) && (j + y >= 0 && j + y < G[i].length)) {
						if (!(x !== 0 && y !== 0) && G[i + x][j + y] == emptyShape) {
							if (x == -2 || x == 2 || y == -2 || y == 2) {
								twoAwayCount++;
							} else {
								adjCount++;
							}
						}
					}
				}
			}
			//change the current cell's state according to these rules
			if ((adjCount >= 5)) {
				nextGrid[i][j] = fillShape;
			} else if (adjCount <= 1) {
				if (twoAwayCount < 3) {
					nextGrid[i][j] = fillShape;
				} else {
					nextGrid[i][j] = emptyShape;
				}
			} else {
				nextGrid[i][j] = emptyShape;
			}
		}
	}
	
	for (let i = 0; i < nextGrid.length; i++) {
		for (let j = 0; j < nextGrid[i].length; j++) {
			tracer.denotify(i, j, G[i][j]);
			tracer.select(i, j).wait();
			G[i][j] = nextGrid[i][j];
			if (G[i][j] == fillShape) {
				tracer.notify(i, j, G[i][j]);
			} else {
				tracer.notify(i, j, G[i][j]);
				tracer.denotify(i, j, G[i][j]);
				tracer.deselect(i, j);
			}
		}
	}
}

for (var iter = 0; iter < generations; iter++) {
	CellularAutomata('#', '.');
}