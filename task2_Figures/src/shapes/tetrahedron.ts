import { Point3D, Shape, ShapeFactory } from "./base";
import { VolumeCalculator } from "../utils/utils";
import { Warehouse } from "../utils/warehouse";

export class Tetrahedron extends Shape {
  constructor(
    id: string,
    public p1: Point3D,
    public p2: Point3D,
    public p3: Point3D,
    public p4: Point3D
  ) {
    super(id);
  }

  calculateVolume(): number {
    return VolumeCalculator.tetrahedronVolume(this.p1, this.p2, this.p3, this.p4);
  }

  updatePoints(newPoints: [Point3D, Point3D, Point3D, Point3D]): void {
    [this.p1, this.p2, this.p3, this.p4] = newPoints;
    this.notifyObservers();
  }
}

export class TetrahedronFactory extends ShapeFactory<Tetrahedron> {
  validate(data: number[]): boolean {
    return data.length === 12;
  }

  create(id: string, data: number[]): Tetrahedron {
    if (!this.validate(data)) {
      throw new Error('Invalid data for Tetrahedron');
    }
    const points = [
      new Point3D(data[0], data[1], data[2]),
      new Point3D(data[3], data[4], data[5]),
      new Point3D(data[6], data[7], data[8]),
      new Point3D(data[9], data[10], data[11])
    ];
    // @ts-ignore
    const newShape = new Tetrahedron(id, ...points);
    newShape.addObserver(Warehouse.getInstance());
    newShape.notifyObservers();
    return newShape;
  }

  changeShape(tetra: Tetrahedron, data: number[]): Tetrahedron {
    if (!this.validate(data)) {
      throw new Error('Invalid data for Tetrahedron');
    }
    const points = [
      new Point3D(data[0], data[1], data[2]),
      new Point3D(data[3], data[4], data[5]),
      new Point3D(data[6], data[7], data[8]),
      new Point3D(data[9], data[10], data[11])
    ];
    tetra.updatePoints(points as [Point3D, Point3D, Point3D, Point3D]);
    return tetra;
  }
}
