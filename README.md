# NEUROGRIP Frontend

Responsive React + TypeScript frontend prototype for the NEUROGRIP EMG-powered prosthetic hand companion.

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
- Tailwind CSS
- Framer Motion
- Lucide React

## Included screens
Dashboard, How to Use, EMG Learning, Hand Practice, Live Monitor, My Sessions, My Profile, and Settings. The UI includes Arabic/English with RTL/LTR, persistent light/dark appearance, reduced-motion preference, local tutorial progress, local profile preferences, local video preview, and an animated startup screen.

## Important
Frontend-only prototype. No real ESP32 connection, real EMG capture, servo control, backend authentication, or server-side persistence is implemented. Waveforms are illustrative. Open Hand and Fist are the current core gestures; Pinch and Pointing are future possibilities. Selected videos are previewed locally and are not uploaded.
