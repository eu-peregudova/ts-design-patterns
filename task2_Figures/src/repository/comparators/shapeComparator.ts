import { Shape } from "../../shapes/base";

export function compareById(a: Shape, b: Shape): number {
  return a.id.localeCompare(b.id);
}

export function compareByFirstPointX(a: any, b: any): number {
  return a.p1.x - b.p1.x;
}

export function compareByFirstPointY(a: any, b: any): number {
  return a.p1.y - b.p1.y;
}
