import { Array1DTracer, GraphTracer, LogTracer } from 'algorithm-visualizer';

const T = {};

const elements = [5, 8, 10, 3, 1, 6, 9, 7, 2, 0, 4]; // item to be inserted
const graphTracer = new GraphTracer(' BST - Elements marked red indicates the current status of tree ');
const elemTracer = new Array1DTracer(' Elements ').set(elements);
const logger = new LogTracer(' Log ');
graphTracer.log(logger).delay();

function bstInsert(root, element, parent) { // root = current node , parent = previous node
  graphTracer.visit(root, parent).delay();
  const treeNode = T[root];
  let propName = '';
  if (element < root) {
    propName = 'left';
  } else if (element > root) {
    propName = 'right';
  }
  if (propName !== '') {
    if (!(propName in treeNode)) { // insert as left child of root
      treeNode[propName] = element;
      T[element] = {};
      graphTracer.addNode(element).addEdge(root, element).select(element, root).delay().deselect(element, root);
      logger.println(`${element} Inserted`);
    } else {
      bstInsert(treeNode[propName], element, root);
    }
  }
  graphTracer.leave(root, parent).delay();
}

const Root = elements[0]; // take first element as root
T[Root] = {};
graphTracer.addNode(Root).layoutTree(Root, true);
logger.println(`${Root} Inserted as root of tree `);

for (let i = 1; i < elements.length; i++) {
  elemTracer.select(i).delay();
  bstInsert(Root, elements[i]); // insert ith element
  elemTracer.deselect(i).delay();
}
