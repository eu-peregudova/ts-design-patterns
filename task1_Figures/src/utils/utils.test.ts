import {Rectangle, RectangleFactory} from "../shapes/rectangle";
import {ShapeValidator} from "./utils";

describe('Rectangle Validation', () => {
  test('should create valid rectangle', () => {
    const factory = new RectangleFactory();
    const validData = [0,0, 0,5, 5,5, 5,0];

    const rect = factory.create('rect1', validData);

    expect(rect).toBeInstanceOf(Rectangle);
    expect(ShapeValidator.isSquare(rect)).toBe(true);
    expect(ShapeValidator.isRhombus(rect)).toBe(true);
  });

  test('should throw error for invalid rectangle data', () => {
    const factory = new RectangleFactory();
    const invalidData = [0,0, 0,5, 5,5];

    expect(() => {
      factory.create('rect1', invalidData);
    }).toThrow('Invalid data for Rectangle');
  });
});
