import { Point2D, Shape, ShapeFactory } from "./base";
import { ShapeValidator } from "../utils/utils";
import { Warehouse } from "../utils/warehouse";

export class Rectangle extends Shape {
  constructor(
    id: string,
    public p1: Point2D,
    public p2: Point2D,
    public p3: Point2D,
    public p4: Point2D
  ) {
    super(id);
  }

  isSquare(): boolean {
    return ShapeValidator.isSquare(this);
  }

  isRhombus(): boolean {
    return ShapeValidator.isRhombus(this);
  }

  calculateArea(): number {
    const a = ShapeValidator.calculateDistance(this.p1, this.p2);
    const b = ShapeValidator.calculateDistance(this.p2, this.p3);
    return a * b;
  }

  calculatePerimeter(): number {
    const a = ShapeValidator.calculateDistance(this.p1, this.p2);
    const b = ShapeValidator.calculateDistance(this.p2, this.p3);
    const c = ShapeValidator.calculateDistance(this.p3, this.p4);
    const d = ShapeValidator.calculateDistance(this.p4, this.p1);
    return a + b + c + d;
  }

  updatePoints(newPoints: [Point2D, Point2D, Point2D, Point2D]): void {
    [this.p1, this.p2, this.p3, this.p4] = newPoints;
    this.notifyObservers();
  }
}

export class RectangleFactory extends ShapeFactory<Rectangle> {
  validate(data: number[]): boolean {
    return data.length === 8;
  }

  create(id: string, data: number[]): Rectangle {
    if (!this.validate(data)) {
      throw new Error('Invalid data for Rectangle');
    }
    const points = [
      new Point2D(data[0], data[1]),
      new Point2D(data[2], data[3]),
      new Point2D(data[4], data[5]),
      new Point2D(data[6], data[7])
    ];
    // @ts-ignore
    const newShape = new Rectangle(id, ...points);
    newShape.addObserver(Warehouse.getInstance());
    newShape.notifyObservers();
    return newShape;
  }
}
