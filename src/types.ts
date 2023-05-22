export interface AutoHealthExportEntry {
  source: string;
  date: string;
  qty: number;
}

export interface AutoHealthExportMetric {
  name: string;
  units: string;
  data: AutoHealthExportEntry[];
}

export interface AutoHealthExportData {
  data: {
    metrics: AutoHealthExportMetric[];
  };
}

export interface StepCountRecord {
  date: Date;
  count: number;
}
