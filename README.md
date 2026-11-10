# NEUROGRIP Frontend

A responsive React + TypeScript frontend prototype for the NEUROGRIP EMG-powered prosthetic hand companion.

## Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS (base + utility layer) and custom design tokens/components
- Framer Motion for page transitions and micro-interactions
- Lucide React icons

## Run locally

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
npm run preview
```

## Included screens

- User Dashboard
- How to Use (six-step learning path with locally saved completion state)
- EMG Learning Center (local video preview; files are not uploaded)
- Hand Practice (Open Hand and Fist presented as the current core gestures; Pinch and Pointing are labeled as future possibilities)
- Live Monitor (clearly marked illustrative/demo waveform, no live device connection)
- My Sessions (honest empty state; no fabricated history)
- My Profile (local browser-only preferences)
- Settings (English/Arabic, RTL/LTR, persistent light/dark appearance, motion preference)
- Readable typography pass (minimum 12px for small UI text; key descriptions use 13px and darker contrast)
- Branded startup loading screen with a short animated progress indicator

## Important project-state notes

This is a frontend-only prototype. It does not authenticate users, connect to an ESP32, receive EMG signals, command servos, or persist data to a server. The waveform is illustrative only. Profile fields and tutorial completion are saved locally in the browser using `localStorage`. A selected video is previewed locally using a browser object URL and is not uploaded.

The physical prototype and ML research should remain distinct until the real-time ML model is integrated and validated. The interface therefore avoids presenting experimental ML performance as deployed device performance.

## Image assets

The visual assets used by the interface are stored in `public/assets/`. `dashboard-reference.png` is retained as a design reference.
