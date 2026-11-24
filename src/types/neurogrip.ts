export type GestureClass = "Open Hand" | "Fist";

export type ConnectionState = "connected" | "disconnected" | "connecting" | "error";

export interface DeviceStatus {
  deviceId: string;
  connection: ConnectionState;
  controller: "ESP32";
  emgSensorConnected: boolean;
  lastSeenAt?: string;
}

export interface EmgSample {
  timestamp: string;
  channel: 1;
  amplitude: number;
}

export interface GestureEvent {
  id: string;
  gesture: GestureClass;
  detectedAt: string;
  confidence?: number;
  source: "hardware" | "simulation";
}

export interface HandCommand {
  gesture: GestureClass;
  issuedAt: string;
}

export interface CommandAcknowledgement {
  accepted: boolean;
  executed: boolean;
  acknowledgedAt?: string;
  message?: string;
}

export interface CalibrationStatus {
  currentStep: number;
  completed: boolean;
  restingSamples: number;
  fistSamples: number;
  openHandSamples: number;
  updatedAt?: string;
}

export interface CalibrationRequest {
  step: "resting" | "fist" | "open-hand";
  samples: EmgSample[];
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
  preferredHand?: "left" | "right";
}

export interface HistoryQuery {
  from?: string;
  to?: string;
  gesture?: GestureClass;
  page?: number;
  pageSize?: number;
  search?: string;
}

export interface PagedResult<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalCount: number;
}

export interface ReportSummary {
  from: string;
  to: string;
  totalGestures: number;
  openHandCount: number;
  fistCount: number;
  sessionCount: number;
}
