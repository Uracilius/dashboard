export interface statusStatistics {
    status: string;
    numOfAlerts: number;
  }

export interface alertStatistics {
    statusStatisticsList: statusStatistics[];
    numOfFiles: number;
  }

export class AlertDTO {
  filePath: string;
  numOfLines: number;
  status: string;
  text: string;
  meta: string;

  constructor(numOfLines: number, status: string, text: string, meta: string, filePath: string) {
    this.filePath = filePath; 
    this.numOfLines = numOfLines;
    this.status = status;
    this.text = text;
    this.meta = meta;
  }
}