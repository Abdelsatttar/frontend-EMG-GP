# NEUROGRIP Frontend

Responsive React + TypeScript application interface for the NEUROGRIP AI-powered smart prosthetic hand graduation project.

## Project scope represented in the UI

The current hardware workflow is represented as:

1. One surface EMG sensor captures forearm muscle activity.
2. One analog EMG signal channel is acquired by the ESP32.
3. The signal-processing and recognition workflow identifies one of two supported gestures: **Open Hand** or **Fist**.
4. The ESP32 controls servo motors to operate the prosthetic fingers.

The interface intentionally does not describe cameras, pressure sensors, extra EMG channels, or unsupported gestures as implemented hardware capabilities.

## Included routes

### Public
- `/` — Product landing page
- `/login` — Login UI
- `/register` — Registration UI
- `/forgot-password` — Password reset request UI
- `/reset-password` — New password UI

### Application
- `/dashboard` — System overview
- `/dashboard/emg-monitoring` — Signal monitoring preview
- `/dashboard/gesture-recognition` — Open Hand and Fist classes
- `/dashboard/hand-control` — Two-state hand control preview
- `/dashboard/calibration` — Five-step calibration guide
- `/dashboard/history` — Searchable and filterable sample records
- `/dashboard/reports` — Reporting layout and sample visualizations
- `/dashboard/profile` — Local profile details and photo preview
- `/dashboard/settings` — Theme and interface preferences

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Stack
- React 18 + TypeScript + Vite
- Framer Motion
- Lucide React
- Responsive custom CSS

## Project structure

- `src/App.tsx` — application routes, page composition, and frontend interactions
- `src/index.css` — shared design system and responsive layouts
- `src/types/neurogrip.ts` — typed device, EMG, gesture, calibration, history, and profile models
- `src/services/contracts.ts` — service interfaces for the future API and device adapters
- `src/services/apiClient.ts` — configurable HTTP client; the API base URL must be supplied by the integrating environment

## Important integration status

This repository currently contains a frontend experience only. The following are **not connected or implemented as live services**:
- ESP32 communication, Bluetooth/Wi-Fi transport, or WebSocket streaming
- Real EMG sampling and calibrated signal values
- A trained gesture-recognition model or model confidence output
- Physical servo commands or device execution acknowledgements
- Backend authentication, Google OAuth, password reset delivery, and account security
- Persistent server-side profiles, sessions, calibration, history, or reports

Charts and example history rows are marked as simulated. Interactive preview controls do not send commands to physical hardware. The profile image is previewed locally only. Typed integration contracts are provided under `src/services` and `src/types`. They are interfaces only; provide real ASP.NET Core Web API implementations and a clearly defined ESP32 data transport contract before connecting the UI.

## Branding

NEUROGRIP uses the blue medical-technology design direction, responsive application shell, and consistent light/dark interface themes.
