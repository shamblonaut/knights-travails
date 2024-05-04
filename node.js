export class Node {
  constructor(value, path) {
    this.value = value;
    this.path = path;
    // this.neighbors = [];
  }

  // addNeighbor(node) {
  //   this.neighbors.push(node);
  // }
  //
  // removeNeighbor(node) {
  //   const nodeIndex = this.neighbors.find(node);
  //   if (nodeIndex) this.neighbors.splice(nodeIndex, 1);
  // }

  print() {
    console.dir(this);
  }
}
