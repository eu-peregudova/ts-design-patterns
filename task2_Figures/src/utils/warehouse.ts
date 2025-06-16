import { Shape } from "../shapes/base";

export interface Observer {
  update(shape: Shape): void;
}

export class Warehouse implements Observer {
  private static instance: Warehouse;
  private metrics: Map<string, { area?: number; volume?: number; perimeter?: number }> = new Map();

  private constructor() {}

  static getInstance(): Warehouse {
    if (!Warehouse.instance) {
      Warehouse.instance = new Warehouse();
    }
    return Warehouse.instance;
  }

  update(shape: Shape): void {
    const area = "calculateArea" in shape ? (shape as any).calculateArea() : undefined;
    const volume = "calculateVolume" in shape ? (shape as any).calculateVolume() : undefined;
    const perimeter = "calculatePerimeter" in shape ? (shape as any).calculatePerimeter() : undefined;
    this.metrics.set(shape.id, { area, volume, perimeter });
  }

  getMetrics(id: string) {
    return this.metrics.get(id);
  }
}
