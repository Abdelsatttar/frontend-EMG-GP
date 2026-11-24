import type {
  CalibrationRequest, CalibrationStatus, CommandAcknowledgement, DeviceStatus,
  EmgSample, GestureClass, GestureEvent, HandCommand, HistoryQuery, PagedResult,
  ReportSummary, UserProfile
} from "../types/neurogrip";

export interface AuthService {
  login(email: string, password: string): Promise<void>;
  register(fullName: string, email: string, password: string): Promise<void>;
  requestPasswordReset(email: string): Promise<void>;
  resetPassword(token: string, newPassword: string): Promise<void>;
  logout(): Promise<void>;
}

export interface UserProfileService {
  getProfile(): Promise<UserProfile>;
  updateProfile(profile: Partial<Pick<UserProfile, "fullName" | "email" | "preferredHand">>): Promise<UserProfile>;
  uploadAvatar(file: File): Promise<{ avatarUrl: string }>;
  removeAvatar(): Promise<void>;
}

export interface DeviceService {
  getStatus(): Promise<DeviceStatus>;
}

export interface EmgMonitoringService {
  getLatestSample(): Promise<EmgSample | null>;
  subscribe(onSample: (sample: EmgSample) => void, onError?: (error: Error) => void): () => void;
}

export interface GestureRecognitionService {
  getCurrentGesture(): Promise<GestureEvent | null>;
  getHistory(query?: HistoryQuery): Promise<PagedResult<GestureEvent>>;
  onGesture(onEvent: (event: GestureEvent) => void, onError?: (error: Error) => void): () => void;
}

export interface HandControlService {
  sendCommand(command: HandCommand): Promise<CommandAcknowledgement>;
}

export interface CalibrationService {
  getStatus(): Promise<CalibrationStatus>;
  submitSamples(request: CalibrationRequest): Promise<CalibrationStatus>;
  complete(): Promise<CalibrationStatus>;
  reset(): Promise<void>;
}

export interface HistoryService {
  query(query?: HistoryQuery): Promise<PagedResult<GestureEvent>>;
}

export interface ReportsService {
  getSummary(from: string, to: string): Promise<ReportSummary>;
}

export interface NeurogripServices {
  auth: AuthService;
  profile: UserProfileService;
  device: DeviceService;
  emg: EmgMonitoringService;
  recognition: GestureRecognitionService;
  handControl: HandControlService;
  calibration: CalibrationService;
  history: HistoryService;
  reports: ReportsService;
}

// These are contracts only. Supply real ASP.NET Core / ESP32 adapters before using hardware data.
export type GestureSelection = GestureClass;
