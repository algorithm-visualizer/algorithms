// import visualization libraries {
const { Tracer, Array2DTracer, Array1DTracer, Layout, VerticalLayout } = require('algorithm-visualizer');
// }

// define map information. {
const row = 10;
const col = 10;
let map = [
    ['', '', '', '', '', '', '', '', '', ''],           // 0
    ['', '', '💣', '', '', '', '', '', '', ''],         // 1
    ['', 'S', '', '💣', '', '', '', '', '', ''],        // 2
    ['', '', '', '💣', '', '', '', '', '', ''],         // 3
    ['', '', '', '', '', '💣', '', '', '', ''],         // 4
    ['', '', '', '', '💣', '💣', '', '', '', ''],       // 5
    ['', '', '', '', '', '💣', '', '', '', ''],         // 6
    ['', '', '', '', '', '', '💣', '', 'E', ''],        // 7
    ['', '', '', '', '', '', '💣', '', '', ''],         // 8
    ['', '', '', '', '', '', '', '', '', '']            // 9
];
const start = [2, 1];
const end = [7, 8];
let pqueue = [start];
let que_keys = [0];
let visit = new Set();
// }

// define tracer variables {
const mapTracer = new Array2DTracer('Map');
const priorityQueueTracer = new Array1DTracer('PriorityQueue-key');
Layout.setRoot(new VerticalLayout([mapTracer, priorityQueueTracer]));

mapTracer.set(map);
priorityQueueTracer.set(que_keys);
Tracer.delay();
// }

function hamiltonDistance(pos1, pos2) {
    return Math.abs(pos1[0]-pos2[0]) + Math.abs(pos1[1]-pos2[1]);
}

function insertQueue(que_keys, k, v) {
    let put = false;
    que_keys.push(0); pqueue.push(0);
    if (que_keys.length > 1) {
        for (let i = que_keys.length - 2; i >= 0; i--) {
            if (k < que_keys[i]) {
                pqueue[i+1] = v;
                que_keys[i+1] = k;
                put = true;
                priorityQueueTracer.patch(i+1, k);
                break;
            } else {
                pqueue[i+1] = pqueue[i];
                que_keys[i+1] = que_keys[i];
                priorityQueueTracer.patch(i+1, que_keys[i]);
            }
        }
    }
    if (put === false) {
        que_keys[0] = k;
        pqueue[0] = v;
        priorityQueueTracer.patch(0, k);
    }
}

function isEnd(pos) { return pos[0] == end[0] && pos[1] == end[1]; }

function isBlock(pos) {
    return map[pos[0]][pos[1]] === '💣';
}

function isVisited(pos) {
    return visit.has(pos[0]*col + pos[1]);
}

function findPath() {
    while (pqueue.length > 0) {
        let cur = pqueue.pop(); que_keys.pop();
        if (isEnd(cur)) break;
        if (isVisited(cur)) continue;
        visit.add(cur[0]*col + cur[1]);
        let up = [cur[0]-1, cur[1]];
        let down = [cur[0]+1, cur[1]];
        let left = [cur[0], cur[1]-1];
        let right = [cur[0], cur[1]+1];
        let cur_dist = hamiltonDistance(cur, start);
        if (up[0] >= 0 && !isVisited(up) && !isBlock(up)) {
            let dist = cur_dist + hamiltonDistance(up, end);
            insertQueue(que_keys, dist, up);
            map[up[0]][up[1]] = '↓';
            // visualize {
            if (!isEnd(up)) {
                mapTracer.patch(up[0], up[1], '↓');
            }
            // }
        } 
        if (down[0] < row && !isVisited(down) && !isBlock(down)) {
            let dist = cur_dist + hamiltonDistance(down, end);
            insertQueue(que_keys, dist, down);
            map[down[0]][down[1]] = '↑';
            // visualize {
            if (!isEnd(down)) {
                mapTracer.patch(down[0], down[1], '↑');
            }
            // }
        }
        if (left[1] >= 0 && !isVisited(left) && !isBlock(left)) {
            let dist = cur_dist + hamiltonDistance(left, end);
            insertQueue(que_keys, dist, left);
            map[left[0]][left[1]] = '→';
            // visualize {
            if (!isEnd(left)) {
                mapTracer.patch(left[0], left[1], '→');
            }
            // }
        } 
        if (right[1] < col && !isVisited(right) && !isBlock(right)) {
            let dist = cur_dist + hamiltonDistance(right, end);
            insertQueue(que_keys, dist, right);
            map[right[0]][right[1]] = '←';
            // visualize {
            if (!isEnd(right)) {
                mapTracer.patch(right[0], right[1], '←');
            }
            // }
        }
        // visualize {
        Tracer.delay();
        // }
    }
}

findPath();
