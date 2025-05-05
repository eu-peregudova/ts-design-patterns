import pinoLogger from './pino-logger';
import { Shape, ShapeFactory } from "../shapes/base";
import * as fs from 'node:fs';

export function parseShapesFromFile(filePath: string, factory: ShapeFactory<Shape>): Shape[] {
  let shapes = [];

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const allLines = fileContent.split('\n');

    for (let lineNumber = 0; lineNumber < allLines.length; lineNumber++) {
      const currentLine = allLines[lineNumber];

      if (!/^[-0-9.\s]+$/.test(currentLine)) {
        pinoLogger.warn('Skipping line ' + (lineNumber+1));
        continue;
      }

      let numbers = [];
      const parts = currentLine.trim().split(' ');
      for (let part of parts) {
        if (part === '') continue;
        numbers.push(parseFloat(part));
      }

      if (!factory.validate(numbers)) {
        pinoLogger.warn('Line ' + (lineNumber+1) + ' failed validation');
        continue;
      }

      try {
        const newShape = factory.create('shape' + (lineNumber+1).toString(), numbers);
        shapes.push(newShape);
        pinoLogger.info('Created shape: ' + newShape.id);
      } catch (err) {
        if (err instanceof Error) {
          pinoLogger.warn('Error in line ' + (lineNumber+1) + ': ' + err.message);
        } else {
          pinoLogger.warn('Unknown error in line ' + (lineNumber+1));
        }
      }
    }

  } catch (fileError) {
    pinoLogger.error('File error: ' + fileError);
  }

  return shapes;
}
