import {Point3D, Shape, ShapeFactory} from "./base";
import {VolumeCalculator} from "../utils/utils";

export class Tetrahedron extends Shape {
  constructor(
    id: string,
    public readonly p1: Point3D,
    public readonly p2: Point3D,
    public readonly p3: Point3D,
    public readonly p4: Point3D
  ) {
    super(id);
  }

  calculateVolume(): number {
    return VolumeCalculator.tetrahedronVolume(this.p1, this.p2, this.p3, this.p4);
  }
}

export class TetrahedronFactory extends ShapeFactory<Tetrahedron> {
  validate(data: number[]): boolean {
    return data.length === 12;
  }

  create(id: string, data: number[]): Tetrahedron {
    const points = [
      new Point3D(data[0], data[1], data[2]),
      new Point3D(data[3], data[4], data[5]),
      new Point3D(data[6], data[7], data[8]),
      new Point3D(data[9], data[10], data[11])
    ];

    if (!this.validate(data)) {
      throw new Error('Invalid data for Tetrahedron');
    }

    // @ts-ignore
    return new Tetrahedron(id, ...points);
  }
}
