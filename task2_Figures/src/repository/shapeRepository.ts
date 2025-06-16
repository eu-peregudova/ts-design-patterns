import { Shape } from "../shapes/base";
import {Specification} from "./specifications/specification";

export class ShapeRepository {
  private shapes: Map<string, Shape> = new Map();

  add(shape: Shape): void {
    this.shapes.set(shape.id, shape);
  }

  findAll(): Shape[] {
    return Array.from(this.shapes.values());
  }

  query(spec: Specification<Shape>): Shape[] {
    return this.findAll().filter(shape => spec.isSatisfiedBy(shape));
  }

  sort(comparator: (a: Shape, b: Shape) => number): Shape[] {
    return this.findAll().sort(comparator);
  }
}
