import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import {
  Activity, ArrowLeft, ArrowRight, Bell, CalendarDays, Check, CheckCircle2,
  ChevronDown, ChevronLeft, ChevronRight, CircleAlert, Clock3, Command, Cpu,
  Download, Eye, EyeOff, FileText, Filter, Fingerprint, Hand, Home, Info,
  LayoutDashboard, LockKeyhole, Menu, Moon, MoreHorizontal, Pause, Play,
  RefreshCw, RotateCcw, Save, Search, Settings, ShieldCheck, SlidersHorizontal,
  Square, Sun, UserRound, WifiOff, Waves, X, Zap, BarChart3, Gauge,
  ClipboardList
} from "lucide-react";

type Theme = "light" | "dark";
type Gesture = "Open Hand" | "Fist";
type Notice = { kind: "success" | "error" | "warning" | "info"; message: string };
type Route = { path: string; label: string; icon?: typeof Home; group?: string };

const navigation: Route[] = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard, group: "Workspace" },
  { path: "/dashboard/emg-monitoring", label: "EMG Monitoring", icon: Waves, group: "Workspace" },
  { path: "/dashboard/gesture-recognition", label: "Gesture Recognition", icon: Fingerprint, group: "Workspace" },
  { path: "/dashboard/hand-control", label: "Hand Control", icon: Hand, group: "Workspace" },
  { path: "/dashboard/calibration", label: "Calibration", icon: SlidersHorizontal, group: "Workspace" },
  { path: "/dashboard/history", label: "History", icon: Clock3, group: "Management" },
  { path: "/dashboard/reports", label: "Reports", icon: ChartNoAxesCombined, group: "Management" },
  { path: "/dashboard/profile", label: "Profile", icon: UserRound, group: "Account" },
  { path: "/dashboard/settings", label: "Settings", icon: Settings, group: "Account" }
];

const demoRows = [
  { id: "NG-0084", date: "2026-11-24 18:42:10", gesture: "Open Hand", status: "Simulated" },
  { id: "NG-0083", date: "2026-11-24 18:41:52", gesture: "Fist", status: "Simulated" },
  { id: "NG-0082", date: "2026-11-24 18:40:21", gesture: "Open Hand", status: "Simulated" },
  { id: "NG-0081", date: "2026-11-24 18:39:05", gesture: "Fist", status: "Simulated" },
  { id: "NG-0080", date: "2026-11-24 18:37:49", gesture: "Open Hand", status: "Simulated" },
  { id: "NG-0079", date: "2026-11-24 18:35:16", gesture: "Fist", status: "Simulated" },
  { id: "NG-0078", date: "2026-11-24 18:32:43", gesture: "Open Hand", status: "Simulated" },
  { id: "NG-0077", date: "2026-11-24 18:30:11", gesture: "Fist", status: "Simulated" }
];

function readStored<T>(key: string, fallback: T): T {
  try { const value = localStorage.getItem(key); return value ? JSON.parse(value) as T : fallback; }
  catch { return fallback; }
}

function Logo({ compact = false, light = false }: { compact?: boolean; light?: boolean }) {
  return <div className={"brand" + (light ? " brand-light" : "")}>
    <span className="brand-mark"><Hand size={21} strokeWidth={2.2} /></span>
    {!compact && <span className="brand-word">NEURO<span>GRIP</span><small>AI-POWERED PROSTHETIC</small></span>}
  </div>;
}

function Button({ children, variant = "primary", className = "", onClick, type = "button", disabled = false }: {
  children: ReactNode; variant?: "primary" | "secondary" | "ghost" | "danger"; className?: string;
  onClick?: () => void; type?: "button" | "submit"; disabled?: boolean;
}) {
  return <button type={type} disabled={disabled} onClick={onClick} className={"btn btn-" + variant + " " + className}>{children}</button>;
}

function Pill({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "blue" | "green" | "red" | "amber" }) {
  return <span className={"pill pill-" + tone}><i />{children}</span>;
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={"card " + className}>{children}</section>;
}

function SectionTitle({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return <div className="section-title"><div><h2>{title}</h2>{description && <p>{description}</p>}</div>{action}</div>;
}

function PageHeader({ title, subtitle, eyebrow, actions }: { title: string; subtitle?: string; eyebrow?: string; actions?: ReactNode }) {
  return <div className="page-header"><div>{eyebrow && <div className="eyebrow">{eyebrow}</div>}<h1>{title}</h1>{subtitle && <p>{subtitle}</p>}</div>{actions && <div className="page-actions">{actions}</div>}</div>;
}

function DemoLabel({ children = "SIMULATION MODE" }: { children?: ReactNode }) {
  return <span className="demo-label"><span className="demo-dot" />{children}</span>;
}

function WaveChart({ large = false, paused = false }: { large?: boolean; paused?: boolean }) {
  return <div className={"chart-wrap" + (large ? " chart-large" : "") + (paused ? " chart-paused" : "")}>
    <div className="chart-y-labels"><span>High</span><span>Mid</span><span>Low</span></div>
    <svg viewBox="0 0 860 230" preserveAspectRatio="none" role="img" aria-label="Illustrative EMG waveform">
      <defs><linearGradient id="waveArea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2563eb" stopOpacity=".2" /><stop offset="1" stopColor="#2563eb" stopOpacity="0" /></linearGradient></defs>
      {[35, 85, 135, 185].map(y => <line key={y} x1="0" x2="860" y1={y} y2={y} className="chart-gridline" />)}
      {[100, 200, 300, 400, 500, 600, 700, 800].map(x => <line key={x} x1={x} x2={x} y1="10" y2="210" className="chart-gridline vertical" />)}
      <path d="M0 118 L18 116 32 121 47 114 61 119 76 116 90 120 105 115 120 117 132 118 145 115 158 119 172 117 186 118 200 116 214 120 228 113 241 118 252 120 266 116 280 117 294 119 308 117 321 118 333 115 347 123 359 43 371 192 386 78 398 130 410 113 422 121 436 116 449 119 464 117 478 121 492 115 506 120 519 117 532 118 546 116 560 119 573 115 587 120 600 117 614 118 627 38 640 196 654 74 667 126 680 114 694 120 707 116 720 119 735 115 748 122 762 115 776 118 790 116 804 120 818 115 832 119 846 117 860 118" fill="none" stroke="#2563eb" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M0 118 L18 116 32 121 47 114 61 119 76 116 90 120 105 115 120 117 132 118 145 115 158 119 172 117 186 118 200 116 214 120 228 113 241 118 252 120 266 116 280 117 294 119 308 117 321 118 333 115 347 123 359 43 371 192 386 78 398 130 410 113 422 121 436 116 449 119 464 117 478 121 492 115 506 120 519 117 532 118 546 116 560 119 573 115 587 120 600 117 614 118 627 38 640 196 654 74 667 126 680 114 694 120 707 116 720 119 735 115 748 122 762 115 776 118 790 116 804 120 818 115 832 119 846 117 860 118 L860 210 L0 210 Z" fill="url(#waveArea)" opacity=".8" />
    </svg>
    <div className="chart-x-labels"><span>−30s</span><span>−25s</span><span>−20s</span><span>−15s</span><span>−10s</span><span>−5s</span><span>Now</span></div>
    {paused && <div className="chart-overlay">Monitoring paused</div>}
  </div>;
}

function MiniBars() {
  return <div className="mini-bars" aria-label="Illustrative gesture distribution">
    {[42, 68, 50, 82, 58, 92, 63, 75, 47, 86, 61, 73].map((h, i) => <i key={i} style={{ height: h + "%" }} />)}
  </div>;
}

function AuthShell({ children, title, subtitle }: { children: ReactNode; title: string; subtitle: string }) {
  return <div className="auth-layout"><aside className="auth-visual">
    <Logo light /><div className="auth-visual-copy"><Pill tone="blue">EMG · AI · ESP32</Pill><h2>Technology that moves with you.</h2><p>NEUROGRIP translates a single muscle signal into meaningful prosthetic hand movement.</p>
    <div className="auth-hand"><img src="/assets/prosthetic-hand.webp" alt="Illustration of the NEUROGRIP prosthetic hand" /></div>
    <div className="auth-facts"><span><Activity size={16} /> Single-channel EMG</span><span><Cpu size={16} /> ESP32 controller</span><span><Hand size={16} /> Two supported gestures</span></div></div><div className="auth-visual-foot">A graduation project prototype · Hardware integration in progress</div></aside>
    <main className="auth-main"><div className="auth-mobile-brand"><Logo /></div><div className="auth-card"><div className="auth-heading"><h1>{title}</h1><p>{subtitle}</p></div>{children}<div className="auth-back"><a href="/" onClick={e => { e.preventDefault(); window.history.pushState({}, "", "/"); window.dispatchEvent(new PopStateEvent("popstate")); }}>Back to home</a></div><p className="auth-legal">Frontend demonstration · Authentication is not connected</p></div></main>
  </div>;
}

function Field({ label, type = "text", placeholder, value, onChange, required = false, hint, trailing }: {
  label: string; type?: string; placeholder?: string; value?: string; onChange?: (v: string) => void; required?: boolean; hint?: string; trailing?: ReactNode;
}) {
  return <label className="field"><span>{label}</span><div className="field-control"><input type={type} placeholder={placeholder} value={value} onChange={e => onChange?.(e.target.value)} required={required} />{trailing}</div>{hint && <small>{hint}</small>}</label>;
}

function App() {
  const [path, setPath] = useState(() => window.location.pathname || "/");
  const [theme, setTheme] = useState<Theme>(() => readStored("ng-theme", "light"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notice, setNotice] = useState<Notice | null>(null);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [range, setRange] = useState("30m");
  const [monitoring, setMonitoring] = useState(false);
  const [recording, setRecording] = useState(false);
  const [gesture, setGesture] = useState<Gesture>("Open Hand");
  const [calibrationStep, setCalibrationStep] = useState(0);
  const [profile, setProfile] = useState(() => readStored("ng-profile", { name: "", email: "", hand: "Right" }));
  const [historyFilter, setHistoryFilter] = useState("All");
  const [historyPage, setHistoryPage] = useState(0);
  const [sortAsc, setSortAsc] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formName, setFormName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [dateRange, setDateRange] = useState("7d");

  const notify = (message: string, kind: Notice["kind"] = "info") => {
    setNotice({ message, kind });
    window.setTimeout(() => setNotice(null), 3200);
  };

  const navigate = (to: string) => {
    if (to !== path) window.history.pushState({}, "", to);
    setPath(to);
    setMobileOpen(false);
    setNotificationOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const onPop = () => { setPath(window.location.pathname || "/"); setMobileOpen(false); };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("ng-theme", JSON.stringify(theme));
  }, [theme]);

  useEffect(() => {
    if (path === "/reset-password") setFormSuccess("");
  }, [path]);

  const currentNav = navigation.find(item => item.path === path);
  const pageTitle = currentNav?.label || "Dashboard";
  const isAuth = ["/login", "/register", "/forgot-password", "/reset-password"].includes(path);
  const isPublic = path === "/";
  const filteredRows = useMemo(() => {
    let rows = [...demoRows];
    if (historyFilter !== "All") rows = rows.filter(row => row.gesture === historyFilter);
    if (search.trim()) rows = rows.filter(row => (row.id + row.date + row.gesture).toLowerCase().includes(search.toLowerCase()));
    return rows.sort((a, b) => sortAsc ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date));
  }, [historyFilter, search, sortAsc]);
  const shownRows = filteredRows.slice(historyPage * 5, historyPage * 5 + 5);

  function exportCsv(rows = demoRows) {
    const csv = ["ID,Date and time,Gesture,Record type", ...rows.map(r => [r.id, r.date, r.gesture, "SIMULATED"].join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "neurogrip-simulated-records.csv"; a.click(); URL.revokeObjectURL(url);
    notify("Simulated sample CSV exported.", "success");
  }

  function submitAuth(e: FormEvent, mode: string) {
    e.preventDefault(); setFormError(""); setFormSuccess("");
    if (mode === "register" && formPassword !== confirmPassword) { setFormError("Passwords do not match."); return; }
    if (mode === "register" && !formName.trim()) { setFormError("Please enter your full name."); return; }
    if (mode === "login" || mode === "register") setFormError("Authentication is not connected yet. No account or session was created.");
    if (mode === "forgot") setFormSuccess("Password reset is not connected. No email has been sent.");
    if (mode === "reset") setFormError("A valid reset token and backend connection are required. No password was changed.");
  }

  const pageContent = () => {
    switch (path) {
      case "/dashboard": return <Dashboard navigate={navigate} notify={notify} />;
      case "/dashboard/emg-monitoring": return <Monitoring monitoring={monitoring} setMonitoring={setMonitoring} recording={recording} setRecording={setRecording} range={range} setRange={setRange} exportCsv={() => exportCsv()} notify={notify} />;
      case "/dashboard/gesture-recognition": return <Recognition gesture={gesture} notify={notify} />;
      case "/dashboard/hand-control": return <HandControl gesture={gesture} setGesture={setGesture} notify={notify} />;
      case "/dashboard/calibration": return <Calibration step={calibrationStep} setStep={setCalibrationStep} notify={notify} />;
      case "/dashboard/history": return <History rows={shownRows} total={filteredRows.length} filter={historyFilter} setFilter={v => { setHistoryFilter(v); setHistoryPage(0); }} search={search} setSearch={v => { setSearch(v); setHistoryPage(0); }} page={historyPage} setPage={setHistoryPage} sortAsc={sortAsc} setSortAsc={setSortAsc} exportCsv={() => exportCsv(filteredRows)} />;
      case "/dashboard/reports": return <Reports dateRange={dateRange} setDateRange={setDateRange} exportCsv={() => exportCsv()} />;
      case "/dashboard/profile": return <Profile profile={profile} setProfile={setProfile} notify={notify} />;
      case "/dashboard/settings": return <SettingsPage theme={theme} setTheme={setTheme} notify={notify} />;
      default: return <Dashboard navigate={navigate} notify={notify} />;
    }
  };

  if (isPublic) return <Landing navigate={navigate} />;
  if (isAuth) {
    const common = { formEmail, setFormEmail, formPassword, setFormPassword, passwordVisible, setPasswordVisible, formError, formSuccess, submitAuth, formName, setFormName, confirmPassword, setConfirmPassword, navigate };
    if (path === "/login") return <AuthShell title="Welcome back" subtitle="Sign in to continue to your NEUROGRIP workspace."><AuthForm mode="login" {...common} /></AuthShell>;
    if (path === "/register") return <AuthShell title="Create your account" subtitle="Set up your NEUROGRIP workspace."><AuthForm mode="register" {...common} /></AuthShell>;
    if (path === "/forgot-password") return <AuthShell title="Reset your password" subtitle="Enter the email associated with your account."><AuthForm mode="forgot" {...common} /></AuthShell>;
    return <AuthShell title="Choose a new password" subtitle="Use the secure reset link sent by your authentication provider."><AuthForm mode="reset" {...common} /></AuthShell>;
  }

  return <div className="app-shell">
    {mobileOpen && <button className="mobile-scrim" aria-label="Close navigation" onClick={() => setMobileOpen(false)} />}
    <aside className={"sidebar" + (mobileOpen ? " sidebar-open" : "")}>
      <div className="sidebar-brand"><Logo /><button className="icon-button sidebar-close" onClick={() => setMobileOpen(false)} aria-label="Close menu"><X size={18} /></button></div>
      <div className="sidebar-subtitle">PROSTHETIC CONTROL PLATFORM</div>
      {["Workspace", "Management", "Account"].map(group => <div className="nav-group" key={group}><div className="nav-group-label">{group}</div>{navigation.filter(item => item.group === group).map(item => {
        const Icon = item.icon || Home;
        return <button key={item.path} className={"nav-link" + (path === item.path ? " nav-active" : "")} onClick={() => navigate(item.path)}><Icon size={18} /><span>{item.label}</span>{path === item.path && <i className="active-indicator" />}</button>;
      })}</div>)}
      <div className="sidebar-bottom"><div className="device-mini"><span className="device-mini-icon"><WifiOff size={17} /></span><div><b>ESP32 device</b><small>Not connected</small></div><span className="status-dot red-dot" /></div><div className="sidebar-user"><span className="avatar"><UserRound size={17} /></span><div><b>{profile.name || "Demo User"}</b><small>{profile.email || "Local preview"}</small></div><button onClick={() => navigate("/dashboard/profile")} aria-label="Open profile"><MoreHorizontal size={18} /></button></div></div>
    </aside>
    <main className="main-area">
      <header className="topbar">
        <div className="topbar-left"><button className="icon-button menu-trigger" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu size={20} /></button><div className="breadcrumb"><span>NEUROGRIP</span><ChevronRight size={14} /><b>{pageTitle}</b></div></div>
        <div className="topbar-actions"><span className="topbar-device"><span className="status-dot red-dot" />Device disconnected</span>
          <div className="notification-wrap"><button className={"icon-button" + (notificationOpen ? " selected" : "")} onClick={() => setNotificationOpen(v => !v)} aria-label="Notifications"><Bell size={18} /><i /></button>{notificationOpen && <div className="notification-pop"><div className="notification-pop-head"><b>Notifications</b><span>Demo</span></div><div className="notification-empty"><CheckCircle2 size={22} /><b>You're all caught up</b><small>Device notifications will appear when hardware events are connected.</small></div></div>}</div>
          <button className="icon-button" onClick={() => setTheme(theme === "light" ? "dark" : "light")} aria-label="Toggle theme">{theme === "light" ? <Moon size={18} /> : <Sun size={18} />}</button>
          <button className="topbar-profile" onClick={() => navigate("/dashboard/profile")}><span className="avatar avatar-small"><UserRound size={15} /></span><span>{profile.name || "Demo User"}</span><ChevronDown size={14} /></button>
        </div>
      </header>
      <div className="content-area">
        <div className="demo-banner"><Info size={15} /><span><b>Simulation preview.</b> No ESP32 is connected. All charts and sample records are illustrative, not real sensor readings or AI predictions.</span><DemoLabel /></div>
        {pageContent()}
        <footer className="app-footer"><span>© 2026 NEUROGRIP · Graduation project prototype</span><span>Single-channel EMG <i /> ESP32 <i /> Open Hand &amp; Fist</span></footer>
      </div>
    </main>
    {notice && <div className={"toast toast-" + notice.kind}><span>{notice.kind === "success" ? <CheckCircle2 size={18} /> : notice.kind === "error" ? <CircleAlert size={18} /> : <Info size={18} />}</span>{notice.message}<button onClick={() => setNotice(null)} aria-label="Dismiss"><X size={15} /></button></div>}
  </div>;
}

function Landing({ navigate }: { navigate: (path: string) => void }) {
  return <div className="landing"><header className="landing-header"><Logo /><nav><a href="#features">Features</a><a href="#how-it-works">How it works</a><a href="#technology">Technology</a><a href="#about">About</a></nav><div><Button variant="ghost" onClick={() => navigate("/login")}>Log in</Button><Button onClick={() => navigate("/register")}>Get started <ArrowRight size={16} /></Button></div></header>
    <section className="landing-hero"><div className="hero-copy"><Pill tone="blue"><Zap size={13} /> SMART PROSTHETIC TECHNOLOGY</Pill><h1>Control the future.<br /><span>Feel the movement.</span></h1><p>NEUROGRIP transforms muscle activity captured by a single surface EMG sensor into intuitive prosthetic hand movement.</p><div className="hero-buttons"><Button onClick={() => navigate("/register")}>Explore NEUROGRIP <ArrowRight size={17} /></Button><Button variant="secondary" onClick={() => navigate("/dashboard")}>Explore demo <Play size={15} /></Button></div><div className="hero-proof"><span><CheckCircle2 size={16} /> Single EMG channel</span><span><CheckCircle2 size={16} /> ESP32 controlled</span><span><CheckCircle2 size={16} /> Two core gestures</span></div></div>
      <div className="hero-visual"><div className="hero-visual-glow" /><div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" /><img src="/assets/prosthetic-hand.webp" alt="NEUROGRIP prosthetic hand prototype" /><div className="float-card float-emg"><span><Waves size={17} /></span><div><b>Surface EMG</b><small>Single signal channel</small></div><Pill tone="blue">INPUT</Pill></div><div className="float-card float-ai"><span><Fingerprint size={18} /></span><div><b>Gesture recognition</b><small>Open Hand · Fist</small></div><Pill tone="green">2 GESTURES</Pill></div></div>
    </section>
    <section className="trust-strip"><span>BUILT AROUND REAL HARDWARE</span><b>Surface EMG</b><i /><b>ESP32</b><i /><b>Servo motors</b><i /><b>Prosthetic hand</b></section>
    <section className="landing-section" id="features"><div className="center-heading"><span className="eyebrow">DESIGNED AROUND THE USER</span><h2>One signal. Meaningful movement.</h2><p>A clear and focused system built around the actual capabilities of the current prototype.</p></div><div className="feature-grid">{[
      [Waves, "EMG signal acquisition", "Capture forearm muscle activity through one surface EMG sensor and a single signal channel."],
      [Cpu, "ESP32 processing", "Acquire the analog signal and coordinate the system's gesture recognition workflow."],
      [Fingerprint, "Two-gesture recognition", "The current project focuses on identifying Open Hand and Fist gestures."],
      [Hand, "Servo-controlled movement", "Servo motors operate the prosthetic fingers in response to the selected supported gesture."],
      [Gauge, "Signal monitoring", "Review the signal workflow through a monitoring interface prepared for future data streaming."],
      [SlidersHorizontal, "Guided calibration", "A structured frontend flow for resting-state, fist, and open-hand collection."]
    ].map(([Icon, title, desc], i) => { const I = Icon as typeof Activity; return <Card className="feature-card" key={i}><span className="feature-icon"><I size={21} /></span><h3>{title as string}</h3><p>{desc as string}</p></Card>; })}</div></section>
    <section className="landing-section how-section" id="how-it-works"><div className="center-heading"><span className="eyebrow">THE WORKFLOW</span><h2>From muscle signal to hand movement</h2><p>Five connected stages explain how the project is intended to work.</p></div><div className="workflow">{[
      ["01", "Muscle signal", "Forearm activity is captured by the surface EMG sensor."],
      ["02", "ESP32 acquisition", "The ESP32 receives the sensor's analog output."],
      ["03", "Signal processing", "The acquired signal is prepared for recognition."],
      ["04", "Gesture recognition", "The system identifies Open Hand or Fist."],
      ["05", "Servo movement", "Servo motors move the prosthetic fingers."]
    ].map((s, i) => <div className="workflow-step" key={s[0]}><span>{s[0]}</span><div><b>{s[1]}</b><p>{s[2]}</p></div>{i < 4 && <ArrowRight size={17} />}</div>)}</div></section>
    <section className="landing-section tech-section" id="technology"><div className="tech-copy"><span className="eyebrow">PROJECT TECHNOLOGY</span><h2>Focused engineering.<br />Human-centered outcomes.</h2><p>NEUROGRIP brings together a single-channel EMG input, ESP32 controller, gesture recognition, and servo-driven prosthetic fingers in one focused prototype.</p><div className="tech-list"><span><Check size={16} /> One surface EMG sensor</span><span><Check size={16} /> One signal channel</span><span><Check size={16} /> ESP32 as main controller</span><span><Check size={16} /> Open Hand and Fist only</span></div></div><div className="tech-visual"><img src="/assets/emg-electrodes.webp" alt="EMG sensor and electrode illustration" /><div className="tech-tag tag-a"><Waves size={15} /> EMG INPUT</div><div className="tech-tag tag-b"><Cpu size={15} /> ESP32</div><div className="tech-tag tag-c"><Hand size={15} /> SERVO HAND</div></div></section>
    <section className="landing-section about-section" id="about"><div><span className="eyebrow">ABOUT NEUROGRIP</span><h2>Technology should support independence.</h2></div><p>NEUROGRIP is an AI-powered smart prosthetic hand graduation project exploring how forearm muscle signals can provide an intuitive control method. The current prototype scope is intentionally focused on two gestures and a clear, testable hardware workflow.</p></section>
    <section className="landing-cta"><div><h2>Explore the NEUROGRIP platform.</h2><p>Preview the interface and follow the current hardware workflow.</p></div><Button onClick={() => navigate("/dashboard")}>Open demo dashboard <ArrowRight size={16} /></Button></section>
    <footer className="landing-footer"><Logo /><p>AI-powered smart prosthetic hand · Single-channel EMG + ESP32</p><span>© 2026 NEUROGRIP. Graduation project prototype.</span></footer>
  </div>;
}

type AuthProps = {
  formEmail: string; setFormEmail: (v: string) => void; formPassword: string; setFormPassword: (v: string) => void;
  passwordVisible: boolean; setPasswordVisible: (v: boolean) => void; formError: string; formSuccess: string;
  submitAuth: (e: FormEvent, mode: string) => void; formName: string; setFormName: (v: string) => void;
  confirmPassword: string; setConfirmPassword: (v: string) => void; navigate: (path: string) => void;
};
function AuthForm({ mode, ...p }: AuthProps & { mode: "login" | "register" | "forgot" | "reset" }) {
  const isLogin = mode === "login", isRegister = mode === "register", isForgot = mode === "forgot";
  return <form className="auth-form" onSubmit={e => p.submitAuth(e, mode)}>
    {isRegister && <Field label="Full name" placeholder="Your full name" value={p.formName} onChange={p.setFormName} required />}
    {!isForgot && mode !== "reset" && <Field label="Email address" type="email" placeholder="name@example.com" value={p.formEmail} onChange={p.setFormEmail} required />}
    {mode === "reset" && <div className="form-note"><Info size={17} /> This screen is a frontend integration point. A valid reset token must be supplied by the backend.</div>}
    {!isForgot && <Field label={mode === "reset" ? "New password" : "Password"} type={p.passwordVisible ? "text" : "password"} placeholder="Enter your password" value={p.formPassword} onChange={p.setFormPassword} required trailing={<button type="button" className="field-eye" onClick={() => p.setPasswordVisible(!p.passwordVisible)} aria-label="Toggle password visibility">{p.passwordVisible ? <EyeOff size={17} /> : <Eye size={17} />}</button>} />}
    {(isRegister || mode === "reset") && <Field label="Confirm password" type={p.passwordVisible ? "text" : "password"} placeholder="Confirm your password" value={p.confirmPassword} onChange={p.setConfirmPassword} required />}
    {isLogin && <div className="auth-options"><label className="check-label"><input type="checkbox" /> Remember me</label><button type="button" className="text-link" onClick={() => p.navigate("/forgot-password")}>Forgot password?</button></div>}
    {isRegister && <label className="check-label terms-check"><input type="checkbox" required /> I agree to the terms and privacy policy.</label>}
    {p.formError && <div className="form-alert alert-error"><CircleAlert size={16} />{p.formError}</div>}
    {p.formSuccess && <div className="form-alert alert-info"><Info size={16} />{p.formSuccess}</div>}
    <Button type="submit" className="auth-submit">{isLogin ? "Sign in" : isRegister ? "Create account" : isForgot ? "Send reset link" : "Update password"} <ArrowRight size={16} /></Button>
    <div className="auth-divider"><span />or<span /></div>
    <Button variant="secondary" className="google-btn" disabled><b className="google-g">G</b> Continue with Google <span>Unavailable</span></Button>
    <div className="auth-switch">{isLogin ? <>Don't have an account? <button type="button" onClick={() => p.navigate("/register")}>Create account</button></> : isRegister ? <>Already have an account? <button type="button" onClick={() => p.navigate("/login")}>Sign in</button></> : <button type="button" onClick={() => p.navigate("/login")}><ArrowLeft size={14} /> Back to sign in</button>}</div>
  </form>;
}

function Dashboard({ navigate, notify }: { navigate: (p: string) => void; notify: (m: string, k?: Notice["kind"]) => void }) {
  return <><PageHeader title="Dashboard" subtitle="Monitor your NEUROGRIP prosthetic hand system." eyebrow="OVERVIEW" actions={<><span className="date-chip"><CalendarDays size={15} /> Tuesday, 24 November 2026</span><Button variant="secondary" onClick={() => notify("No live device is connected.", "warning")}><RefreshCw size={15} /> Refresh</Button></>} />
    <div className="stats-grid">
      <StatCard icon={WifiOff} label="Device status" value="Disconnected" detail="ESP32 not detected" tone="red" />
      <StatCard icon={Hand} label="Current gesture" value="No live data" detail="Awaiting EMG input" tone="blue" />
      <StatCard icon={Activity} label="EMG activity" value="—" detail="No sensor samples received" tone="cyan" />
      <StatCard icon={Fingerprint} label="Recognized gestures" value="—" detail="Actual records unavailable" tone="purple" />
    </div>
    <div className="dashboard-grid">
      <Card className="signal-card"><div className="card-top"><div><h3>EMG signal overview</h3><p>Illustrative waveform preview</p></div><DemoLabel /></div><WaveChart /><div className="chart-legend"><span><i className="legend-blue" /> Illustrative signal</span><span>Actual data: unavailable</span></div></Card>
      <Card className="distribution-card"><div className="card-top"><div><h3>Gesture distribution</h3><p>Demo interface preview</p></div><MoreHorizontal size={18} /></div><div className="donut-row"><div className="donut-chart"><div><b>2</b><small>GESTURES</small></div></div><div className="donut-legend"><span><i className="legend-blue" />Open Hand <b>Supported</b></span><span><i className="legend-cyan" />Fist <b>Supported</b></span></div></div><p className="small-note">No real gesture counts have been received.</p></Card>
      <Card className="hand-preview-card"><div className="card-top"><div><h3>Prosthetic hand preview</h3><p>Visual reference only</p></div><Pill tone="red">Offline</Pill></div><div className="hand-preview"><img src="/assets/prosthetic-hand.webp" alt="Prosthetic hand visual reference" /></div><div className="hand-preview-foot"><span>Two supported states</span><Button variant="secondary" onClick={() => navigate("/dashboard/hand-control")}>Open controls <ArrowRight size={14} /></Button></div></Card>
      <Card className="activity-card"><div className="card-top"><div><h3>Recent activity</h3><p>Sample records, not device events</p></div><Button variant="ghost" onClick={() => navigate("/dashboard/history")}>View history <ArrowRight size={14} /></Button></div><div className="activity-list">{demoRows.slice(0, 4).map(row => <div className="activity-row" key={row.id}><span className="activity-icon"><Hand size={16} /></span><div><b>{row.gesture}</b><small>{row.date}</small></div><Pill>Demo</Pill></div>)}</div></Card>
    </div>
    <SectionTitle title="Quick actions" description="Jump to a system workspace." /><div className="quick-grid">
      <QuickAction icon={Waves} title="EMG monitoring" desc="Inspect the signal display" onClick={() => navigate("/dashboard/emg-monitoring")} />
      <QuickAction icon={SlidersHorizontal} title="Start calibration" desc="Review the guided steps" onClick={() => navigate("/dashboard/calibration")} />
      <QuickAction icon={ClipboardList} title="Gesture history" desc="Browse sample records" onClick={() => navigate("/dashboard/history")} />
    </div>
  </>;
}

function StatCard({ icon: Icon, label, value, detail, tone }: { icon: typeof Activity; label: string; value: string; detail: string; tone: string }) {
  return <Card className="stat-card"><div className={"stat-icon stat-" + tone}><Icon size={19} /></div><span className="stat-label">{label}</span><b className="stat-value">{value}</b><small>{detail}</small></Card>;
}
function QuickAction({ icon: Icon, title, desc, onClick }: { icon: typeof Activity; title: string; desc: string; onClick: () => void }) {
  return <button className="quick-action card" onClick={onClick}><span><Icon size={19} /></span><div><b>{title}</b><small>{desc}</small></div><ArrowRight size={16} /></button>;
}

function Monitoring({ monitoring, setMonitoring, recording, setRecording, range, setRange, exportCsv, notify }: {
  monitoring: boolean; setMonitoring: (v: boolean) => void; recording: boolean; setRecording: (v: boolean) => void;
  range: string; setRange: (v: string) => void; exportCsv: () => void; notify: (m: string, k?: Notice["kind"]) => void;
}) {
  return <><PageHeader title="Live EMG Monitoring" subtitle="Monitor muscle activity captured by the single-channel EMG sensor." eyebrow="SIGNAL ACQUISITION" actions={<DemoLabel />} />
    <div className="status-strip"><StatusItem label="EMG sensor" value="Not connected" tone="red" /><StatusItem label="ESP32 controller" value="Not connected" tone="red" /><StatusItem label="Signal acquisition" value="No samples" tone="neutral" /><StatusItem label="Mode" value="Simulation preview" tone="blue" /></div>
    <Card className="monitor-panel"><div className="card-top"><div><h3>Signal waveform</h3><p>Signal amplitude · Time window: {range === "30m" ? "30 seconds" : range === "1m" ? "1 minute" : "5 minutes"}</p></div><div className="monitor-head-actions"><Pill tone={monitoring ? "amber" : "neutral"}>{monitoring ? "Preview running" : "Stopped"}</Pill><select value={range} onChange={e => setRange(e.target.value)} aria-label="Signal time window"><option value="30m">30 seconds</option><option value="1m">1 minute</option><option value="5m">5 minutes</option></select></div></div><WaveChart large paused={!monitoring} /><div className="chart-legend"><span><i className="legend-blue" /> Illustrative waveform</span><span>Unit: not applicable (no sensor samples)</span></div><div className="monitor-actions"><Button onClick={() => { setMonitoring(!monitoring); notify(!monitoring ? "Simulation preview started. No hardware is being read." : "Simulation preview paused."); }}>{monitoring ? <Pause size={15} /> : <Play size={15} />}{monitoring ? "Pause preview" : "Start preview"}</Button><Button variant="secondary" onClick={() => { setRecording(!recording); notify(!recording ? "Demo recording indicator enabled. No sensor data is stored." : "Demo recording indicator stopped.", "warning"); }}>{recording ? <Square size={14} /> : <CircleAlert size={14} />}{recording ? "Stop demo recording" : "Record session"}</Button><Button variant="secondary" onClick={() => notify("No live chart samples to clear.")}><RotateCcw size={15} /> Clear view</Button><Button variant="secondary" onClick={exportCsv}><Download size={15} /> Export sample CSV</Button></div></Card>
    <div className="metrics-grid">{["Current value", "Minimum value", "Maximum value", "Average value", "Peak activity"].map(x => <Card className="metric-tile" key={x}><span>{x}</span><b>—</b><small>No real samples received</small></Card>)}</div>
    <div className="notice-panel"><Info size={18} /><div><b>Hardware connection is not implemented.</b><p>This page is prepared for future ESP32 data streaming. Connect a backend or WebSocket before displaying real EMG readings. The chart above is illustrative only.</p></div></div>
  </>;
}
function StatusItem({ label, value, tone }: { label: string; value: string; tone: string }) {
  return <div className="status-item"><span>{label}</span><b><i className={"status-dot " + (tone === "red" ? "red-dot" : tone === "blue" ? "blue-dot" : "gray-dot")} />{value}</b></div>;
}

function Recognition({ gesture, notify }: { gesture: Gesture; notify: (m: string, k?: Notice["kind"]) => void }) {
  return <><PageHeader title="Gesture Recognition" subtitle="Review the two gesture classes supported by the current project version." eyebrow="AI RECOGNITION" actions={<DemoLabel />} />
    <div className="recognition-callout"><Info size={17} /><span>Recognition is not connected to a trained model or live EMG stream. The highlighted state below is a UI demonstration, not an AI prediction.</span></div>
    <div className="gesture-grid">{(["Open Hand", "Fist"] as Gesture[]).map((g, i) => <Card className={"gesture-option" + (gesture === g ? " gesture-selected" : "")} key={g}><div className="gesture-card-top"><Pill tone={gesture === g ? "blue" : "neutral"}>{gesture === g ? "Preview selected" : "Supported class"}</Pill>{gesture === g && <CheckCircle2 size={19} />}</div><div className={"gesture-art " + (i === 1 ? "gesture-fist" : "")}><img src={i === 0 ? "/assets/prosthetic-hand.webp" : "/assets/hand-practice.webp"} alt={g + " hand illustration"} /></div><h2>{g}</h2><p>{i === 0 ? "Fingers extended and palm open." : "Fingers flexed into a closed hand."}</p><Button variant={gesture === g ? "primary" : "secondary"} onClick={() => notify("Preview selection changed. This is not a recognition result.")}>{gesture === g ? "Selected for preview" : "Preview this gesture"}</Button></Card>)}</div>
    <Card className="current-recognition"><div><span className="eyebrow">CURRENT UI PREVIEW</span><h3>{gesture}</h3><p>Selected illustration state · Not detected from sensor input</p></div><div className="recognition-meta"><div><small>Confidence</small><b>Not available</b></div><div><small>Detection time</small><b>Not available</b></div><Pill tone="amber">Demo only</Pill></div></Card>
    <Card className="table-card"><div className="card-top"><div><h3>Recent sample records</h3><p>Example interface rows; not model predictions</p></div><Pill>Simulated</Pill></div><SimpleRows rows={demoRows.slice(0, 4)} /></Card>
  </>;
}

function HandControl({ gesture, setGesture, notify }: { gesture: Gesture; setGesture: (g: Gesture) => void; notify: (m: string, k?: Notice["kind"]) => void }) {
  const change = (g: Gesture) => { setGesture(g); notify(g + " visual preview selected. No physical hand command was sent."); };
  return <><PageHeader title="Prosthetic Hand Control" subtitle="Preview the two supported hand states and the control workflow." eyebrow="MOVEMENT CONTROL" actions={<DemoLabel />} />
    <div className="control-layout"><Card className="hand-stage-card"><div className="card-top"><div><h3>Prosthetic hand visualization</h3><p>Illustrative prototype asset · Not a live 3D model</p></div><Pill tone="red">Device offline</Pill></div><div className={"large-hand-visual " + (gesture === "Fist" ? "show-fist" : "")}><img src={gesture === "Fist" ? "/assets/hand-practice.webp" : "/assets/prosthetic-hand.webp"} alt={gesture + " prosthetic hand visual preview"} /><span className="hand-state-tag"><i />{gesture}</span></div><div className="hand-stage-footer"><span><Info size={15} /> Visual state only. No servo command sent.</span><Button variant="secondary" onClick={() => change(gesture === "Open Hand" ? "Fist" : "Open Hand")}><RotateCcw size={15} /> Switch preview</Button></div></Card>
      <Card className="command-card"><span className="eyebrow">CONTROL PANEL</span><h3>Choose a hand state</h3><p>Select one of the movements supported by the current prototype.</p><button className={"command-choice" + (gesture === "Open Hand" ? " command-active" : "")} onClick={() => change("Open Hand")}><span className="command-icon"><Hand size={21} /></span><span><b>Open Hand</b><small>Extend the prosthetic fingers</small></span>{gesture === "Open Hand" && <CheckCircle2 size={19} />}</button><button className={"command-choice" + (gesture === "Fist" ? " command-active" : "")} onClick={() => change("Fist")}><span className="command-icon"><Hand size={21} /></span><span><b>Fist</b><small>Close the prosthetic fingers</small></span>{gesture === "Fist" && <CheckCircle2 size={19} />}</button><div className="command-status"><span>Command execution</span><Pill tone="amber">Not sent · Simulation</Pill></div><Button className="full-width" onClick={() => notify("Cannot send command: ESP32 is not connected.", "warning")}><Command size={16} /> Send to device</Button><p className="safety-copy"><ShieldCheck size={15} /> Physical movement is never claimed unless the connected device confirms execution.</p></Card></div>
  </>;
}

const calibrationSteps = [
  { title: "Device check", desc: "Verify the ESP32 controller and EMG sensor connection before collecting samples.", action: "Review device status", prompt: "Confirm that the device is powered and connected." },
  { title: "Resting state", desc: "Relax your forearm muscles and prepare the resting-state signal sample.", action: "Review resting state", prompt: "Keep your forearm relaxed during the resting-state collection." },
  { title: "Fist gesture", desc: "Make a fist and follow the collection instructions for this gesture.", action: "Review fist gesture", prompt: "Close your hand into a comfortable fist." },
  { title: "Open Hand gesture", desc: "Open your hand and follow the collection instructions for this gesture.", action: "Review open hand", prompt: "Extend your fingers into an open-hand position." },
  { title: "Review", desc: "Review the calibration workflow and wait for the actual system to report its results.", action: "Review final step", prompt: "No calibration data has been collected or saved in this frontend demo." }
];
function Calibration({ step, setStep, notify }: { step: number; setStep: (s: number) => void; notify: (m: string, k?: Notice["kind"]) => void }) {
  const s = calibrationSteps[step];
  return <><PageHeader title="EMG Calibration" subtitle="A guided five-step workflow for preparing the signal recognition system." eyebrow="SETUP" actions={<DemoLabel />} />
    <Card className="calibration-card"><div className="calibration-progress"><div><span>WORKFLOW PROGRESS</span><b>Step {step + 1} of 5</b></div><div className="progress-track"><i style={{ width: (step / 5 * 100) + "%" }} /></div></div><div className="stepper">{calibrationSteps.map((item, i) => <button key={item.title} className={"stepper-item" + (i === step ? " step-current" : "") + (i < step ? " step-done" : "")} onClick={() => setStep(i)}><span>{i < step ? <Check size={15} /> : i + 1}</span><small>{item.title}</small></button>)}</div><div className="calibration-body"><div className="calibration-visual"><div className="calibration-icon">{step === 0 ? <WifiOff size={38} /> : step === 1 ? <Activity size={38} /> : step < 4 ? <Hand size={38} /> : <ClipboardList size={38} />}</div><span className="eyebrow">STEP {step + 1}</span><h2>{s.title}</h2><p>{s.desc}</p><div className="instruction-box"><Info size={17} />{s.prompt}</div></div><div className="calibration-details"><div className="detail-row"><span>ESP32 connection</span><Pill tone="red">Not connected</Pill></div><div className="detail-row"><span>EMG sensor</span><Pill tone="red">Unavailable</Pill></div><div className="detail-row"><span>Sample collection</span><b>Not started</b></div><div className="detail-row"><span>Calibration result</span><b>Not available</b></div><div className="calibration-warning"><ShieldCheck size={18} /><p>This interface cannot collect samples or save calibration data until connected to the actual hardware and backend.</p></div></div></div><div className="calibration-footer"><Button variant="secondary" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}><ChevronLeft size={16} /> Previous</Button><Button onClick={() => { if (step < 4) { setStep(step + 1); notify("Step reviewed in the frontend preview. No samples were collected."); } else notify("Calibration cannot be saved because the device and backend are not connected.", "warning"); }}>{step === 4 ? "Finish review" : "Continue"} <ChevronRight size={16} /></Button></div></Card>
  </>;
}

function History({ rows, total, filter, setFilter, search, setSearch, page, setPage, sortAsc, setSortAsc, exportCsv }: {
  rows: typeof demoRows; total: number; filter: string; setFilter: (v: string) => void; search: string; setSearch: (v: string) => void;
  page: number; setPage: (v: number) => void; sortAsc: boolean; setSortAsc: (v: boolean) => void; exportCsv: () => void;
}) {
  return <><PageHeader title="Activity History" subtitle="Search and review gesture records." eyebrow="MANAGEMENT" actions={<Button variant="secondary" onClick={exportCsv}><Download size={15} /> Export CSV</Button>} />
    <Card className="table-card"><div className="table-toolbar"><div className="search-box"><Search size={16} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search records..." /></div><div className="table-filters"><Filter size={15} /><select value={filter} onChange={e => setFilter(e.target.value)}><option>All</option><option>Open Hand</option><option>Fist</option></select></div><DemoLabel /></div>
      <div className="table-scroll"><table><thead><tr><th>Record ID</th><th><button className="sort-button" onClick={() => setSortAsc(!sortAsc)}>Date &amp; time <ChevronDown size={14} /></button></th><th>Detected gesture</th><th>Confidence</th><th>Device status</th><th>Result</th></tr></thead><tbody>{rows.map(r => <tr key={r.id}><td className="record-id">{r.id}</td><td>{r.date}</td><td><span className="gesture-cell"><Hand size={15} />{r.gesture}</span></td><td>Not available</td><td><Pill tone="red">Offline</Pill></td><td><Pill>Simulated</Pill></td></tr>)}</tbody></table></div>
      {rows.length === 0 && <div className="table-empty"><Search size={24} /><b>No matching records</b><p>Try changing your search or filters.</p></div>}
      <div className="table-footer"><span>Showing {rows.length ? page * 5 + 1 : 0}–{page * 5 + rows.length} of {total} sample records</span><div><Button variant="secondary" disabled={page === 0} onClick={() => setPage(Math.max(0, page - 1))}><ChevronLeft size={15} /> Previous</Button><Button variant="secondary" disabled={(page + 1) * 5 >= total} onClick={() => setPage(page + 1)}>Next <ChevronRight size={15} /></Button></div></div>
    </Card><div className="notice-panel"><Info size={18} /><div><b>Sample history only.</b><p>These rows are example data to demonstrate the table interface. No real gesture events have been recorded.</p></div></div>
  </>;
}

function SimpleRows({ rows }: { rows: typeof demoRows }) {
  return <div className="simple-rows">{rows.map(row => <div className="simple-row" key={row.id}><span className="activity-icon"><Hand size={15} /></span><div><b>{row.gesture}</b><small>{row.date}</small></div><Pill>Demo</Pill></div>)}</div>;
}

function Reports({ dateRange, setDateRange, exportCsv }: { dateRange: string; setDateRange: (v: string) => void; exportCsv: () => void }) {
  return <><PageHeader title="Reports & Analytics" subtitle="Explore gesture activity and system trends." eyebrow="INSIGHTS" actions={<><select className="select-control" value={dateRange} onChange={e => setDateRange(e.target.value)}><option value="today">Today</option><option value="7d">Last 7 days</option><option value="30d">Last 30 days</option><option value="custom">Custom date range</option></select><Button variant="secondary" onClick={exportCsv}><Download size={15} /> Export CSV</Button><Button variant="secondary" onClick={() => window.print()}><FileText size={15} /> Print</Button></>} />
    <div className="report-warning"><Info size={16} /> Analytics below are illustrative layout examples. Actual statistics require real recorded sessions.</div>
    <div className="stats-grid report-stats"><StatCard icon={Fingerprint} label="Gesture events" value="—" detail="No real events available" tone="blue" /><StatCard icon={Hand} label="Open Hand" value="—" detail="No real count available" tone="cyan" /><StatCard icon={Hand} label="Fist" value="—" detail="No real count available" tone="purple" /><StatCard icon={Clock3} label="Active sessions" value="—" detail="No session data available" tone="green" /></div>
    <div className="reports-grid"><Card className="report-chart-card"><div className="card-top"><div><h3>EMG activity over time</h3><p>Illustrative signal trend</p></div><DemoLabel /></div><WaveChart large /></Card><Card className="report-chart-card"><div className="card-top"><div><h3>Gesture activity</h3><p>Visual sample only</p></div><MoreHorizontal size={18} /></div><MiniBars /><div className="bars-labels"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div></Card></div>
    <Card className="session-summary"><div className="card-top"><div><h3>Session summaries</h3><p>Actual session information will appear after backend integration.</p></div><Pill>Not connected</Pill></div><div className="empty-inline"><CalendarClock size={25} /><b>No actual sessions available</b><span>Sample charts above are not calculated from user records.</span></div></Card>
  </>;
}

function Profile({ profile, setProfile, notify }: { profile: { name: string; email: string; hand: string }; setProfile: (p: { name: string; email: string; hand: string }) => void; notify: (m: string, k?: Notice["kind"]) => void }) {
  const [draft, setDraft] = useState(profile);
  return <><PageHeader title="My Profile" subtitle="Manage the profile information saved in this browser preview." eyebrow="ACCOUNT" />
    <Card className="profile-card"><div className="profile-banner"><div className="profile-avatar"><UserRound size={29} /></div><div><h2>{profile.name || "Demo User"}</h2><p>{profile.email || "No email added"}</p></div><Pill>Local preview</Pill></div><div className="profile-form"><div className="form-section-title"><h3>Personal information</h3><p>These details are stored locally in this browser only.</p></div><div className="profile-fields"><Field label="Full name" value={draft.name} onChange={v => setDraft({ ...draft, name: v })} placeholder="Enter your name" /><Field label="Email address" type="email" value={draft.email} onChange={v => setDraft({ ...draft, email: v })} placeholder="name@example.com" /><label className="field"><span>Preferred hand</span><select value={draft.hand} onChange={e => setDraft({ ...draft, hand: e.target.value })}><option>Right</option><option>Left</option></select></label></div><div className="profile-actions"><Button variant="secondary" onClick={() => setDraft(profile)}>Cancel</Button><Button onClick={() => { setProfile(draft); localStorage.setItem("ng-profile", JSON.stringify(draft)); notify("Profile details saved in this browser.", "success"); }}><Save size={15} /> Save changes</Button></div></div></Card>
    <Card className="security-card"><div className="security-icon"><LockKeyhole size={20} /></div><div><h3>Security</h3><p>Password management requires a connected authentication provider.</p></div><Button variant="secondary" onClick={() => notify("Password management is not connected.", "warning")}>Change password</Button></Card>
  </>;
}

function SettingsPage({ theme, setTheme, notify }: { theme: Theme; setTheme: (t: Theme) => void; notify: (m: string, k?: Notice["kind"]) => void }) {
  const [notifications, setNotifications] = useState(true);
  const [reduced, setReduced] = useState(false);
  return <><PageHeader title="Settings" subtitle="Adjust your NEUROGRIP interface preferences." eyebrow="PREFERENCES" />
    <div className="settings-stack"><Card className="settings-card"><div className="setting-icon"><Sun size={19} /></div><div className="setting-content"><h3>Appearance</h3><p>Choose the interface theme for this browser.</p><div className="segmented"><button className={theme === "light" ? "seg-selected" : ""} onClick={() => setTheme("light")}><Sun size={15} /> Light</button><button className={theme === "dark" ? "seg-selected" : ""} onClick={() => setTheme("dark")}><Moon size={15} /> Dark</button></div></div></Card>
      <Card className="settings-card"><div className="setting-icon"><Bell size={19} /></div><div className="setting-content"><h3>Notifications</h3><p>Control non-essential interface notifications.</p><label className="switch-row"><span>Enable interface notifications</span><input type="checkbox" checked={notifications} onChange={e => setNotifications(e.target.checked)} /><i /></label></div></Card>
      <Card className="settings-card"><div className="setting-icon"><Activity size={19} /></div><div className="setting-content"><h3>Motion</h3><p>Reduce non-essential animations across the interface.</p><label className="switch-row"><span>Reduce motion</span><input type="checkbox" checked={reduced} onChange={e => setReduced(e.target.checked)} /><i /></label></div></Card>
      <Card className="settings-card"><div className="setting-icon"><Cpu size={19} /></div><div className="setting-content"><h3>Device configuration</h3><p>Hardware connection details for this prototype.</p><div className="device-details"><span>Controller<b>ESP32</b></span><span>EMG channels<b>1</b></span><span>Connection<b className="text-red">Not connected</b></span><span>Supported gestures<b>Open Hand · Fist</b></span></div></div></Card>
      <div className="settings-save"><Button onClick={() => notify("Preferences are applied in this browser preview.", "success")}><Save size={15} /> Save preferences</Button><Button variant="secondary" onClick={() => { setTheme("light"); setNotifications(true); setReduced(false); notify("Interface preferences reset."); }}>Reset</Button></div>
    </div>
  </>;
}

export default App;
