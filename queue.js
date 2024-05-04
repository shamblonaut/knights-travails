export class Queue {
  #queue = [];

  queue(value) {
    this.#queue.push(value);
  }

  dequeue() {
    return this.#queue.shift();
  }

  empty() {
    return this.#queue.length === 0;
  }
}
