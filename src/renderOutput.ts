import path from 'path';
import fs from 'fs';
import { Canvas } from 'canvas';

const COLOURS = [
  '#213063',
  '#0e365c',
  '#13477d',
  '#4781a5',
  '#5a8fb8',
  '#93b4ce',
  '#7eb1c8',
  '#488e9a',
  '#559392',
  '#2f8c84',
  '#90c0b4',
  '#a2d6ad',
  '#71935c',
  '#7bb547',
  '#ffbf57',
  '#ffc840',
  '#ffa32b',
  '#f27842',
  '#ff7992',
  '#ffd7d7',
  '#fdb5b5',
  '#e04848',
  '#e31d42',
];

export const renderOutput = (
  calendar: (number | undefined)[][],
  outputFile: string
) => {
  const canvas = new Canvas(1000, 1000);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, 1000, 1000);

  calendar.flat();

  const minValue = calendar
    .flat()
    .reduce<number>((min, day) => Math.min(day || 9999, min), 9999);

  const maxValue = calendar
    .flat()
    .reduce<number>((min, day) => Math.max(day || -1, min), -1);

  const squareSize = Math.min(900 / calendar.length, 900 / 31);
  const horizontalPadding = (1000 - 31 * squareSize) / 2;

  calendar.map((month, index) => {
    const y = 50 + index * squareSize;
    month.map((day, dayNumber) => {
      const x = horizontalPadding + dayNumber * squareSize;

      const mappedValue =
        day === undefined
          ? -1
          : Math.floor(
              ((day - minValue) / (maxValue - minValue)) * COLOURS.length
            );

      console.log({ day, mappedValue });

      const colour = mappedValue === -1 ? 'white' : COLOURS[mappedValue];

      ctx.fillStyle = colour;
      ctx.fillRect(x, y, squareSize, squareSize);
    });
  });

  const output = canvas.toBuffer();

  const outputPath = path.resolve(outputFile);
  const pngPath = outputPath.endsWith('.png')
    ? outputPath
    : `${outputPath}.png`;
  fs.writeFileSync(pngPath, output);
};
