import {parseShapesFromFile} from "./utils/parse";
import {RectangleFactory} from "./shapes/rectangle";
import {TetrahedronFactory} from "./shapes/tetrahedron";

const rectangles = parseShapesFromFile(
  './task1_Figures/input/rect',
  new RectangleFactory()
);

const tetrahedrons = parseShapesFromFile(
  './task1_Figures/input/tetra',
  new TetrahedronFactory()
);

console.log('Parsed Rectangles:', rectangles);
console.log('Parsed Tetrahedrons:', tetrahedrons);
