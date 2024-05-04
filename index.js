import { Knight } from "./knight.js";

console.log("Knights, Formation!");

const k = new Knight();

const startSquare = JSON.parse(process.argv[2]) || [0, 0];
const endSquare = JSON.parse(process.argv[3]) || [7, 7];

const path = k.searchPath(startSquare, endSquare);
k.printPath(path);
// console.log(`Mind you, it took ${k.scans} scans!`);
