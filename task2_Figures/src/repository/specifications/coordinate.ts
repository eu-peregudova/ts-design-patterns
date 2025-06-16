import { Specification } from "./specification";
import { Shape } from "../../shapes/base";

export class FirstQuadrantSpecification implements Specification<Shape> {
  isSatisfiedBy(shape: Shape): boolean {
    if ("p1" in shape && "p2" in shape && "p3" in shape) {
      const points = [shape.p1, shape.p2, shape.p3, (shape as any).p4].filter(Boolean);
      return points.every((pt: any) => pt.x > 0 && pt.y > 0);
    }
    return false;
  }
}

