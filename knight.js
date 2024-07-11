import { Node } from "./node.js";
import { Queue } from "./queue.js";

function indexToSquare(index) {
  return [Math.floor(index / 8), index % 8];
}

function squareToIndex(square) {
  return square[0] * 8 + square[1];
}

export class Knight {
  #relativeDestinations = [
    [2, 1],
    [1, 2],
    [-1, 2],
    [-2, 1],
    [-2, -1],
    [-1, -2],
    [1, -2],
    [2, -1],
  ];

  #graph = [];

  #searchQueue = new Queue();
  #scannedSquares = [];

  // scans = 0;

  constructor() {
    for (let i = 0; i < 64; i++) {
      const destinations = [];
      for (const relativeDestination of this.#relativeDestinations) {
        if (
          this.#isValidDestination(
            [Math.floor(i / 8), i % 8],
            relativeDestination,
          )
        ) {
          destinations.push(
            i + relativeDestination[0] * 8 + relativeDestination[1],
          );
        }
      }
      this.#graph.push(destinations);
    }
  }

  printGraph() {
    console.log(this.#graph);
  }

  #isValidDestination(startSquare, destinationSquare) {
    const destination = [
      startSquare[0] + destinationSquare[0],
      startSquare[1] + destinationSquare[1],
    ];
    return (
      destination[0] >= 0 &&
      destination[0] <= 7 &&
      destination[1] >= 0 &&
      destination[1] <= 7
    );
  }

  #isValidSquare(square) {
    return square[0] >= 0 && square[0] <= 7 && square[1] >= 0 && square[1] <= 7;
  }

  searchPath(startSquare, endSquare) {
    if (!this.#isValidSquare(startSquare)) {
      console.error("Invalid start square");
    }
    if (!this.#isValidSquare(endSquare)) {
      console.error("Invalid end square");
    }

    this.#searchQueue.queue(new Node(squareToIndex(startSquare), []));

    while (!this.#searchQueue.empty()) {
      const destination = this.scanDestinations(
        this.#searchQueue.dequeue(),
        squareToIndex(endSquare),
      );
      if (destination) {
        this.#scannedSquares = [];
        return [...destination.path, destination.value];
      }
    }
  }

  scanDestinations(node, endIndex) {
    const destinations = this.#graph[node.value].map(
      (destination) => new Node(destination, [...node.path, node.value]),
    );

    for (const destination of destinations) {
      if (this.#scannedSquares[destination.value]) {
        continue;
      }
      this.#scannedSquares[destination.value] = true;
      // this.scans++;

      if (destination.value === endIndex) {
        return destination;
      }

      this.#searchQueue.queue(destination);
    }
  }

  printPath(path) {
    console.log(
      `You made it from ${indexToSquare(path[0])} to ${indexToSquare(path[path.length - 1])} in ${path.length - 1} moves! Here's your path:`,
    );
    path.forEach((index) => console.log(indexToSquare(index)));
  }
}
