import { Node } from "./node.js";
import { Queue } from "./queue.js";

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

  #searchQueue = new Queue();
  #scannedSquares = [];

  // scans = 0;

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

    this.#searchQueue.queue(new Node(startSquare, []));

    while (!this.#searchQueue.empty()) {
      const destination = this.scanDestinations(
        this.#searchQueue.dequeue(),
        endSquare,
      );
      if (destination) return [...destination.path, destination.value];
    }
  }

  scanDestinations(node, endSquare) {
    const destinations = this.#relativeDestinations.map((destination) => {
      return new Node(
        [destination[0] + node.value[0], destination[1] + node.value[1]],
        [...node.path, node.value],
      );
    });

    for (const destination of destinations) {
      if (!this.#isValidSquare(destination.value)) continue;

      if (this.#scannedSquares[destination.value[0] * destination.value[1]]) {
        continue;
      }

      this.#scannedSquares[destination.value[0] * destination.value[1]] = true;
      // this.scans++;

      if (
        destination.value[0] === endSquare[0] &&
        destination.value[1] === endSquare[1]
      ) {
        return destination;
      }

      this.#searchQueue.queue(destination);
    }
  }

  printPath(path) {
    console.log(
      `You made it from ${path[0]} to ${path[path.length - 1]} in ${path.length - 1} moves! Here's your path:`,
    );
    path.forEach((square) => console.log(square));
  }
}
