import {Rectangle, RectangleFactory} from './rectangle';
import {ShapeValidator} from "../utils/utils";

test('given valid data, when create is called, rectangle is created', () => {
  const factory = new RectangleFactory();
  const data = [0, 0, 0, 2, 3, 2, 3, 0];

  const rect = factory.create('rect1', data);

  expect(rect).toBeInstanceOf(Rectangle);
  expect(rect.p1.x).toBe(0);
  expect(rect.p3.y).toBe(2);
  expect(rect.p1.z).toBe(undefined);
  expect(rect.calculateArea()).toBe(6);
  expect(rect.calculatePerimeter()).toBe(10);
  expect(rect.isSquare()).toBe(false);
  expect(rect.isRhombus()).toBe(false);
});
