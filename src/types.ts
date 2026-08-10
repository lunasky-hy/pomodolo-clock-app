export type SessionType = "作業" | "休憩";

export interface Session {
  type: SessionType;
  startTime: number;
}

export interface HistoryLog {
  id: number;
  timeString: string;
  type: SessionType;
  timestamp: number;
}
