import {Point2D, Point3D} from "../shapes/base";
import {Rectangle} from "../shapes/rectangle";

export class ShapeValidator {
  static isSquare(rect: Rectangle): boolean {
    const [a, b, c] = [
      this.calculateDistance(rect.p1, rect.p2),
      this.calculateDistance(rect.p2, rect.p3),
      this.calculateDistance(rect.p3, rect.p4)
    ];
    return a === b && b === c;
  }

  static isRhombus(rect: Rectangle): boolean {
    const [a, b, c] = [
      this.calculateDistance(rect.p1, rect.p2),
      this.calculateDistance(rect.p2, rect.p3),
      this.calculateDistance(rect.p3, rect.p4)
    ];
    return a === b && b === c;
  }

  static calculateDistance(p1: Point2D, p2: Point2D): number {
    return Math.hypot(p2.x - p1.x, p2.y - p1.y);
  }
}

export class VolumeCalculator {
  static tetrahedronVolume(p1: Point3D, p2: Point3D, p3: Point3D, p4: Point3D): number {
    const v1 = [p2.x - p1.x, p2.y - p1.y, p2.z! - p1.z!];
    const v2 = [p3.x - p1.x, p3.y - p1.y, p3.z! - p1.z!];
    const v3 = [p4.x - p1.x, p4.y - p1.y, p4.z! - p1.z!];

    const cross = [
      v2[1]*v3[2] - v2[2]*v3[1],
      v2[2]*v3[0] - v2[0]*v3[2],
      v2[0]*v3[1] - v2[1]*v3[0]
    ];

    return Math.abs(v1[0]*cross[0] + v1[1]*cross[1] + v1[2]*cross[2]) / 6;
  }
}
