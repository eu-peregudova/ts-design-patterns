import { parseShapesFromFile } from "./utils/parse";
import {Rectangle, RectangleFactory} from "./shapes/rectangle";
import { TetrahedronFactory } from "./shapes/tetrahedron";
import { ShapeRepository } from "./repository/shapeRepository";
import { Warehouse } from "./utils/warehouse";
import { FirstQuadrantSpecification } from "./repository/specifications/coordinate";
import {compareByFirstPointX, compareByFirstPointY, compareById} from "./repository/comparators/shapeComparator";
import {Point2D} from "./shapes/base";

const repository = new ShapeRepository();
const warehouse = Warehouse.getInstance();

const rectangles = parseShapesFromFile(
  './task1_Figures/input/rect',
  new RectangleFactory()
);

const tetrahedrons = parseShapesFromFile(
  './task1_Figures/input/tetra',
  new TetrahedronFactory()
);

rectangles.forEach(rect => {
  rect.addObserver(warehouse);
  rect.notifyObservers();
  repository.add(rect);
});


tetrahedrons.forEach(tetra => {
  tetra.addObserver(warehouse);
  tetra.notifyObservers();
  repository.add(tetra);
});

console.log('Warehouse metrics:');
[...rectangles, ...tetrahedrons].forEach(shape => {
  console.log(shape.id, warehouse.getMetrics(shape.id));
});

console.log('Updating rectangle points...');

(rectangles[0] as Rectangle).updatePoints([new Point2D(1,2), new Point2D(3,4), new Point2D(5,6), new Point2D(7,8)]);

console.log('Warehouse metrics:');
[...rectangles, ...tetrahedrons].forEach(shape => {
  console.log(shape.id, warehouse.getMetrics(shape.id));
});

console.log('Parsed Rectangles:', rectangles);
console.log('Parsed Tetrahedrons:', tetrahedrons);

console.log('Warehouse metrics:');
[...rectangles, ...tetrahedrons].forEach(shape => {
  console.log(shape.id, warehouse.getMetrics(shape.id));
});

// Query and sort
const firstQuadrantSpec = new FirstQuadrantSpecification();
const shapesInFirstQuadrant = repository.query(firstQuadrantSpec);
console.log('Shapes in first quadrant:', shapesInFirstQuadrant);

const sortedById = repository.sort(compareById);
console.log('Shapes sorted by ID:', sortedById);

const sortedByX = repository.sort(compareByFirstPointX);
console.log('Shapes sorted by first point X:', sortedByX);

const sortedByY = repository.sort(compareByFirstPointY);
console.log('Shapes sorted by first point Y:', sortedByY);

