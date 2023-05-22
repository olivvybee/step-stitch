import path from 'path';
import fs from 'fs';
import { AutoHealthExportData, StepCountRecord } from './types';

export const loadData = (inputFile: string): StepCountRecord[] => {
  const filePath = path.resolve(inputFile);
  const contents = fs.readFileSync(filePath, 'utf-8');

  const data = JSON.parse(contents) as AutoHealthExportData;
  const metric = data.data.metrics.find(
    (metric) => metric.name === 'step_count'
  );

  if (!metric) {
    throw new Error('Could not find step_count metric in json data');
  }

  return metric.data
    .map((entry) => ({
      date: new Date(entry.date),
      count: Math.round(entry.qty),
    }))
    .sort((a, b) => (a.date.toISOString() < b.date.toISOString() ? -1 : 1));
};
