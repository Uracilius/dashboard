export interface statusStatistics {
    status: string;
    numOfAlerts: number;
  }

export interface alertStatistics {
    statusStatisticsList: statusStatistics[];
    numOfFiles: number;
  }