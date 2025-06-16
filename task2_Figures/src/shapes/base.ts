import {Observer} from "../utils/warehouse";

class Base {
  constructor(
    public readonly x: number,
    public readonly y: number,
    public readonly z?: number
  ) {}
}

export class Point2D extends Base {
  constructor(x: number, y: number) {
    super(x, y);
  }
}

export class Point3D extends Base {
  constructor(x: number, y: number, z: number) {
    super(x, y, z);
  }
}

export abstract class Shape {
  private observers: Observer[] = [];
  constructor(public readonly id: string) {}

  addObserver(observer: Observer): void {
    this.observers.push(observer);
  }

  notifyObservers(): void {
    this.observers.forEach(observer => observer.update(this));
  }
}

export abstract class ShapeFactory<T extends Shape> {
  abstract create(id: string, data: number[]): T;
  abstract validate(data: number[]): boolean;
}
