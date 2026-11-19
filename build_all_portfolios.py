"""
COMPLETE MULTI-PORTFOLIO GENERATOR (PORTFOLIOS 4 TO 11)
8 COMPLETELY DIFFERENT DESIGN CONCEPTS, WIREFRAMES, AND USER EXPERIENCES
"""

import os, json

BASE_DIR = r"E:\Alanove\VS Code"

# ============================================================================
# 1. PORTFOLIO 4: TIMELINE NLE STUDIO (Non-Linear Editing Suite Interface)
# ============================================================================
def generate_portfolio_4():
    p = os.path.join(BASE_DIR, "Portfolio4")
    os.makedirs(p, exist_ok=True)

    html = '''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TIMELINE STUDIO // Professional NLE Suite & Portfolio</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
</head>
<body class="nle-body">

  <header class="nle-topbar">
    <div class="nle-brand">
      <div class="rec-dot"></div>
      <span class="nle-logo">TIMELINE // PRO SUITE</span>
      <span class="nle-ver">v2026.4</span>
    </div>

    <div class="nle-tc-box">
      <span class="tc-tag">TC</span>
      <span class="tc-digits" id="live-timecode">01:24:18:12</span>
    </div>

    <div class="nle-vu-meters">
      <span class="vu-tag">CH 1/2</span>
      <div class="vu-bar"><div class="vu-fill vu-l"></div></div>
      <div class="vu-bar"><div class="vu-fill vu-r"></div></div>
      <span class="vu-db">-4.8 dBFS</span>
    </div>

    <div class="nle-header-links">
      <a href="works.html" class="nle-nav-link">Project Bin</a>
      <a href="work/" class="nle-nav-link">Deliverables</a>
      <a href="admin/" class="nle-nav-link nle-nav-accent">Admin Suite</a>
    </div>
  </header>

  <div class="nle-viewport">
    
    <!-- Left Panel: Project Bin -->
    <aside class="nle-bin-panel">
      <div class="bin-title-bar">
        <span>PROJECT BIN // CLIPS</span>
        <span class="bin-counter">6 SEQUENCES</span>
      </div>
      <div class="bin-tabs">
        <button class="bin-tab active" onclick="filterBin('all', this)">ALL</button>
        <button class="bin-tab" onclick="filterBin('reels', this)">9:16 REELS</button>
        <button class="bin-tab" onclick="filterBin('commercial', this)">16:9 COMM</button>
      </div>
      <div class="bin-items-scroll" id="bin-items-list">
        <!-- Injected via app.js -->
      </div>
    </aside>

    <!-- Center: Master Sequence Monitor & Timeline -->
    <main class="nle-center-stage">
      <div class="monitor-wrapper">
        <div class="monitor-head">
          <span id="active-clip-name">SEQUENCE 01: URBAN VELOCITY &amp; CYBER RHYTHM</span>
          <span class="monitor-spec-tag">1080x1920 // 60 FPS // APPLE PRORES 422 HQ</span>
        </div>

        <div class="monitor-screen" onclick="playActiveModal()">
          <video id="monitor-video" src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" muted playsinline loop></video>
          <div class="monitor-overlay-crosshair"></div>
          <div class="monitor-play-pill"><span>▶ CLICK TO EXPAND LIGHTBOX</span></div>
        </div>

        <div class="transport-control-strip">
          <div class="transport-buttons">
            <button class="t-btn" onclick="seekRelative(-5)">⏮ -5s</button>
            <button class="t-btn t-play" id="btn-play-pause" onclick="togglePlay()">⏵ PLAY</button>
            <button class="t-btn" onclick="seekRelative(5)">+5s ⏭</button>
            <button class="t-btn" onclick="playActiveModal()">⛶ Fullscreen</button>
          </div>
          <div class="scrub-track-wrap">
            <input type="range" id="scrubber" min="0" max="100" value="30" class="nle-slider">
          </div>
          <span class="scrub-time" id="scrub-time-label">00:09:12 / 00:30:00</span>
        </div>
      </div>

      <!-- Multi-Track NLE Timeline -->
      <div class="timeline-container">
        <div class="timeline-ruler">
          <span>00:00:00</span><span>00:05:00</span><span>00:10:00</span><span>00:15:00</span><span>00:20:00</span><span>00:25:00</span><span>00:30:00</span>
        </div>
        
        <div class="timeline-tracks">
          <!-- Track V2: 9:16 Vertical Reels -->
          <div class="track-row">
            <div class="track-info-badge"><span class="t-id">V2</span><span class="t-desc">REELS 9:16</span></div>
            <div class="track-lane" id="track-lane-v2"></div>
          </div>
          <!-- Track V1: 16:9 Widescreen -->
          <div class="track-row">
            <div class="track-info-badge"><span class="t-id">V1</span><span class="t-desc">COMM 16:9</span></div>
            <div class="track-lane" id="track-lane-v1"></div>
          </div>
          <!-- Track A1: Audio Sync -->
          <div class="track-row audio-row">
            <div class="track-info-badge"><span class="t-id">A1</span><span class="t-desc">VOX / DIA</span></div>
            <div class="track-lane">
              <div class="audio-clip-block"><div class="audio-wave"></div><span>Dialogue_Track_Sync.wav</span></div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Right Panel: Inspector & Scopes -->
    <aside class="nle-inspector-panel">
      <div class="bin-title-bar">
        <span>VECTORSCOPE // RGB</span>
      </div>
      <div class="scope-box">
        <div class="scope-bars">
          <div class="s-bar s-r"></div>
          <div class="s-bar s-g"></div>
          <div class="s-bar s-b"></div>
        </div>
        <div class="scope-labels"><span>R: 88%</span><span>G: 64%</span><span>B: 92%</span></div>
      </div>

      <div class="bin-title-bar" style="margin-top:16px;">
        <span>PROJECT METADATA</span>
      </div>
      <div class="meta-list" id="meta-list-box">
        <div class="meta-item"><span>DIRECTOR</span><strong>Timeline Studio</strong></div>
        <div class="meta-item"><span>FORMAT</span><strong>4K DCI // Rec.709</strong></div>
        <div class="meta-item"><span>RENDER</span><strong>H.264 / Master ProRes</strong></div>
        <div class="meta-item"><span>STATUS</span><strong style="color:#00ff88;">Ready for Review</strong></div>
      </div>

      <div class="hire-card">
        <h4>Commission an Edit</h4>
        <p>Awaiting raw rushes. 24h fast turnarounds for brands &amp; creators.</p>
        <a href="https://api.whatsapp.com/send?phone=15550192834" target="_blank" class="hire-btn">Book Video Sequence ↗</a>
      </div>
    </aside>

  </div>

  <!-- Video Modal Player -->
  <div id="video-modal" class="modal-backdrop" onclick="closeModal(event)">
    <div class="modal-window">
      <button class="modal-close-btn" onclick="closeModalDirect()">✕</button>
      <div class="modal-video-wrapper">
        <video id="modal-video-player" controls preload="metadata" playsinline></video>
        <div id="modal-embed-container" style="display:none; width:100%; min-height:400px;"></div>
      </div>
      <h2 id="modal-title" style="margin:14px 0 6px 0; color:#fff; font-size:18px;"></h2>
      <p id="modal-desc" style="margin:0; color:#94a3b8; font-size:13px;"></p>
    </div>
  </div>

  <script src="app.js"></script>
</body>
</html>'''

    css = '''/* TIMELINE NLE STUDIO THEME */
* { box-sizing: border-box; margin: 0; padding: 0; }
body.nle-body {
  background: #090a0f;
  color: #e2e8f0;
  font-family: 'Inter', sans-serif;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.nle-topbar {
  height: 48px;
  background: #0f121d;
  border-bottom: 1px solid #1e2438;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
}
.nle-brand { display: flex; align-items: center; gap: 8px; }
.rec-dot { width: 8px; height: 8px; border-radius: 50%; background: #ff0055; animation: pulse 1.5s infinite; }
@keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
.nle-logo { font-weight: 700; color: #fff; letter-spacing: 0.05em; }
.nle-ver { background: #1e2438; color: #38bdf8; padding: 2px 6px; border-radius: 4px; font-size: 10px; }
.nle-tc-box { background: #000; border: 1px solid #22c55e; border-radius: 4px; padding: 4px 10px; color: #22c55e; font-weight: 700; display: flex; gap: 8px; }
.nle-vu-meters { display: flex; align-items: center; gap: 6px; }
.vu-bar { width: 60px; height: 6px; background: #1e293b; border-radius: 3px; overflow: hidden; }
.vu-fill { height: 100%; background: linear-gradient(90deg, #22c55e 60%, #eab308 85%, #ef4444 100%); width: 75%; animation: vuAnim 0.8s infinite alternate ease-in-out; }
.vu-r { width: 68%; animation-delay: 0.2s; }
@keyframes vuAnim { 0% { width: 45%; } 100% { width: 88%; } }
.vu-db { font-size: 10px; color: #64748b; }
.nle-header-links { display: flex; gap: 8px; }
.nle-nav-link { color: #94a3b8; text-decoration: none; padding: 4px 10px; border-radius: 4px; background: #141824; border: 1px solid #1e2438; font-size: 11px; }
.nle-nav-link:hover { color: #fff; border-color: #38bdf8; }
.nle-nav-accent { background: #0284c7; color: #fff; border-color: #0284c7; }

/* Main 3-column Layout */
.nle-main-layout, .nle-viewport {
  flex: 1;
  display: grid;
  grid-template-columns: 280px 1fr 280px;
  overflow: hidden;
  background: #090a0f;
}
.nle-bin-panel, .nle-inspector-panel {
  background: #0d101a;
  border-right: 1px solid #1a2033;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.nle-inspector-panel { border-right: none; border-left: 1px solid #1a2033; padding: 12px; }
.bin-title-bar { padding: 10px 14px; background: #111522; border-bottom: 1px solid #1e2438; font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 700; color: #94a3b8; display: flex; justify-content: space-between; }
.bin-tabs { display: flex; gap: 4px; padding: 8px 12px; background: #0b0e17; border-bottom: 1px solid #161b2a; }
.bin-tab { background: none; border: 1px solid #1e2438; color: #64748b; padding: 3px 8px; border-radius: 4px; font-size: 10px; font-family: 'JetBrains Mono', monospace; cursor: pointer; }
.bin-tab.active, .bin-tab:hover { background: #1e293b; color: #38bdf8; border-color: #38bdf8; }
.bin-items-scroll { flex: 1; overflow-y: auto; padding: 8px; display: flex; flex-direction: column; gap: 6px; }
.bin-item-card { background: #121624; border: 1px solid #1e2538; border-radius: 6px; padding: 8px; display: flex; gap: 10px; cursor: pointer; transition: all 0.2s; }
.bin-item-card:hover, .bin-item-card.active { border-color: #0ea5e9; background: #161c2e; }
.bin-thumb { width: 50px; height: 50px; border-radius: 4px; background: #000; object-fit: cover; }
.bin-info { flex: 1; display: flex; flex-direction: column; justify-content: center; }
.bin-title { font-size: 11px; font-weight: 600; color: #f1f5f9; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 170px; }
.bin-tag { font-size: 9.5px; color: #0284c7; font-family: 'JetBrains Mono', monospace; margin-top: 2px; }

/* Center Stage */
.nle-center-stage { display: flex; flex-direction: column; overflow: hidden; background: #06070a; border-right: 1px solid #1a2033; }
.monitor-wrapper { flex: 1; display: flex; flex-direction: column; padding: 12px; background: #07090e; overflow: hidden; }
.monitor-head { display: flex; justify-content: space-between; font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #94a3b8; margin-bottom: 6px; }
.monitor-screen { flex: 1; background: #000; border-radius: 6px; border: 1px solid #1e2538; position: relative; display: flex; align-items: center; justify-content: center; overflow: hidden; cursor: pointer; min-height: 240px; }
.monitor-screen video { width: 100%; height: 100%; object-fit: contain; }
.monitor-play-pill { position: absolute; bottom: 12px; background: rgba(14, 165, 233, 0.85); backdrop-filter: blur(8px); padding: 6px 14px; border-radius: 20px; font-size: 11px; font-weight: 700; color: #fff; font-family: 'JetBrains Mono', monospace; opacity: 0; transition: opacity 0.2s; }
.monitor-screen:hover .monitor-play-pill { opacity: 1; }
.transport-control-strip { height: 44px; display: flex; align-items: center; gap: 12px; background: #0d101a; border: 1px solid #1a2033; border-radius: 6px; margin-top: 8px; padding: 0 12px; font-family: 'JetBrains Mono', monospace; font-size: 11px; }
.transport-buttons { display: flex; gap: 4px; }
.t-btn { background: #161b2c; border: 1px solid #222b44; color: #94a3b8; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 11px; }
.t-btn:hover { color: #fff; background: #1e2538; }
.t-play { background: #0284c7; color: #fff; border-color: #0284c7; }
.scrub-track-wrap { flex: 1; }
.nle-slider { width: 100%; accent-color: #0284c7; }
.scrub-time { color: #64748b; font-size: 10.5px; }

/* Timeline Panel */
.timeline-container { height: 260px; background: #0d101a; border-top: 1px solid #1e2538; display: flex; flex-direction: column; overflow: hidden; }
.timeline-ruler { height: 24px; background: #090c14; border-bottom: 1px solid #1a2033; display: flex; justify-content: space-between; padding: 0 70px 0 90px; font-family: 'JetBrains Mono', monospace; font-size: 9.5px; color: #64748b; align-items: center; }
.timeline-tracks { flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 4px; padding: 6px 0; }
.track-row { height: 58px; display: flex; background: #090c14; border-top: 1px solid #161b2a; border-bottom: 1px solid #161b2a; }
.track-info-badge { width: 80px; background: #101422; border-right: 1px solid #1a2033; display: flex; flex-direction: column; justify-content: center; align-items: center; font-family: 'JetBrains Mono', monospace; }
.t-id { font-weight: 700; color: #38bdf8; font-size: 12px; }
.t-desc { font-size: 9px; color: #64748b; }
.track-lane { flex: 1; display: flex; gap: 8px; padding: 4px 10px; align-items: center; overflow-x: auto; }
.clip-block { height: 48px; min-width: 130px; background: #1e293b; border: 1px solid #334155; border-radius: 4px; padding: 4px 8px; display: flex; flex-direction: column; justify-content: space-between; cursor: pointer; transition: transform 0.15s, border-color 0.15s; font-size: 10.5px; font-weight: 600; color: #f1f5f9; }
.clip-block:hover { transform: translateY(-2px); border-color: #38bdf8; background: #243046; }
.clip-block.c-v2 { background: #0c4a6e; border-color: #0284c7; }
.clip-block.c-v1 { background: #4c1d95; border-color: #7c3aed; }
.audio-clip-block { height: 38px; width: 100%; background: #064e3b; border: 1px solid #059669; border-radius: 4px; padding: 4px 8px; display: flex; align-items: center; gap: 10px; font-size: 10px; color: #a7f3d0; font-family: 'JetBrains Mono', monospace; }
.audio-wave { height: 16px; flex: 1; background: repeating-linear-gradient(90deg, #10b981 0, #10b981 2px, transparent 2px, transparent 4px); opacity: 0.7; }

/* Right Inspector & Scopes */
.scope-box { height: 110px; background: #000; border-radius: 6px; border: 1px solid #1e2538; padding: 8px; display: flex; flex-direction: column; justify-content: space-between; }
.scope-bars { display: flex; justify-content: space-around; height: 75px; align-items: flex-end; }
.s-bar { width: 45px; border-radius: 2px 2px 0 0; }
.s-r { background: #ef4444; height: 85%; }
.s-g { background: #22c55e; height: 60%; }
.s-b { background: #3b82f6; height: 90%; }
.scope-labels { display: flex; justify-content: space-around; font-size: 9.5px; font-family: 'JetBrains Mono', monospace; color: #64748b; }
.meta-list { display: flex; flex-direction: column; gap: 8px; font-size: 11.5px; padding: 8px 0; }
.meta-item { display: flex; justify-content: space-between; border-bottom: 1px solid #161b2a; padding-bottom: 4px; }
.meta-item span { color: #64748b; font-family: 'JetBrains Mono', monospace; font-size: 10px; }
.hire-card { margin-top: auto; background: #131726; border: 1px solid #1e2840; border-radius: 8px; padding: 12px; }
.hire-card h4 { font-size: 12px; color: #fff; margin-bottom: 4px; }
.hire-card p { font-size: 11px; color: #94a3b8; line-height: 1.4; margin-bottom: 10px; }
.hire-btn { display: block; text-align: center; background: #f59e0b; color: #000; font-weight: 700; font-size: 11px; padding: 8px 12px; border-radius: 4px; text-decoration: none; font-family: 'JetBrains Mono', monospace; }
.hire-btn:hover { background: #fbbf24; }

/* Modal */
.modal-backdrop { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.85); backdrop-filter: blur(10px); z-index: 9999; align-items: center; justify-content: center; }
.modal-backdrop.active { display: flex; }
.modal-window { background: #0f121d; border: 1px solid #1e293b; border-radius: 10px; width: 90%; max-width: 680px; padding: 20px; position: relative; }
.modal-close-btn { position: absolute; top: 12px; right: 12px; background: none; border: none; color: #94a3b8; font-size: 18px; cursor: pointer; }
.modal-video-wrapper video { width: 100%; max-height: 60vh; border-radius: 6px; }
'''

    app_js = '''// TIMELINE NLE APP ENGINE
const clips = [
  { id: 'c1', title: 'Urban Velocity & Cyber Rhythm', cat: 'reels', track: 'v2', dur: '00:30', res: '9:16 Vertical', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', desc: 'Fast-cut commercial spot with beat sync and kinetic motion typography.' },
  { id: 'c2', title: 'Nocturnal Tokyo Moods', cat: 'cinematic', track: 'v2', dur: '00:25', res: '9:16 Vertical', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', desc: 'Moody neon cinematic visual piece with evocative soundscapes.' },
  { id: 'c3', title: 'Aura Cosmica — Luxury Fragrance', cat: 'commercial', track: 'v1', dur: '01:15', res: '16:9 Widescreen', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', desc: 'Studio commercial narrative with macro phantom focus and high-retention cadence.' },
  { id: 'c4', title: 'Creator Persona & Hook Mastery', cat: 'reels', track: 'v2', dur: '00:45', res: '9:16 Vertical', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4', desc: 'Talking head dialogue edit with punchy zoom cuts and icon highlights.' },
  { id: 'c5', title: 'Echoes of the High Plateau', cat: 'cinematic', track: 'v1', dur: '02:40', res: '16:9 Widescreen', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4', desc: 'Expansive travelogue documentary with orchestral grading.' },
  { id: 'c6', title: 'Retro Hardware Synth Waves', cat: 'reels', track: 'v2', dur: '00:28', res: '9:16 Vertical', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4', desc: 'Montage of analog hardware synths cut with tempo precision.' }
];

let activeClip = clips[0];

function initNLE() {
  renderBin(clips);
  renderTracks(clips);
  loadClipIntoMonitor(clips[0]);
  startTimecodeCounter();
}

function renderBin(items) {
  const list = document.getElementById('bin-items-list');
  if (!list) return;
  list.innerHTML = items.map(c => `
    <div class="bin-item-card ${c.id === activeClip.id ? 'active' : ''}" onclick="loadClipIntoMonitorById('${c.id}')">
      <div class="bin-thumb" style="display:flex;align-items:center;justify-content:center;color:#38bdf8;font-size:10px;">${c.dur}</div>
      <div class="bin-info">
        <span class="bin-title">${c.title}</span>
        <span class="bin-tag">${c.res}</span>
      </div>
    </div>
  `).join('');
}

function renderTracks(items) {
  const v2 = document.getElementById('track-lane-v2');
  const v1 = document.getElementById('track-lane-v1');
  if (!v2 || !v1) return;

  v2.innerHTML = items.filter(c => c.track === 'v2').map(c => `
    <div class="clip-block c-v2" onclick="loadClipIntoMonitorById('${c.id}')">
      <span>${c.title}</span>
      <span style="font-size:9px;opacity:0.8;">${c.dur} // 9:16</span>
    </div>
  `).join('');

  v1.innerHTML = items.filter(c => c.track === 'v1').map(c => `
    <div class="clip-block c-v1" onclick="loadClipIntoMonitorById('${c.id}')">
      <span>${c.title}</span>
      <span style="font-size:9px;opacity:0.8;">${c.dur} // 16:9</span>
    </div>
  `).join('');
}

function loadClipIntoMonitorById(id) {
  const found = clips.find(c => c.id === id);
  if (found) loadClipIntoMonitor(found);
}

function loadClipIntoMonitor(c) {
  activeClip = c;
  const v = document.getElementById('monitor-video');
  const t = document.getElementById('active-clip-name');
  if (v) { v.src = c.url; v.currentTime = 0; v.play().catch(()=>{}); }
  if (t) t.textContent = `SEQUENCE: ${c.title.toUpperCase()}`;
  document.querySelectorAll('.bin-item-card').forEach(el => el.classList.remove('active'));
}

function togglePlay() {
  const v = document.getElementById('monitor-video');
  const btn = document.getElementById('btn-play-pause');
  if (!v) return;
  if (v.paused) { v.play(); btn.textContent = '⏸ PAUSE'; }
  else { v.pause(); btn.textContent = '⏵ PLAY'; }
}

function seekRelative(sec) {
  const v = document.getElementById('monitor-video');
  if (v) v.currentTime = Math.max(0, v.currentTime + sec);
}

function playActiveModal() {
  const m = document.getElementById('video-modal');
  const v = document.getElementById('modal-video-player');
  const t = document.getElementById('modal-title');
  const d = document.getElementById('modal-desc');
  if (v) { v.src = activeClip.url; v.play(); }
  if (t) t.textContent = activeClip.title;
  if (d) d.textContent = activeClip.desc;
  if (m) m.classList.add('active');
}

function closeModal(e) {
  if (e.target.id === 'video-modal') closeModalDirect();
}

function closeModalDirect() {
  const m = document.getElementById('video-modal');
  const v = document.getElementById('modal-video-player');
  if (v) v.pause();
  if (m) m.classList.remove('active');
}

function filterBin(cat, btn) {
  document.querySelectorAll('.bin-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  if (cat === 'all') renderBin(clips);
  else if (cat === 'reels') renderBin(clips.filter(c => c.cat === 'reels'));
  else if (cat === 'commercial') renderBin(clips.filter(c => c.cat === 'commercial' || c.cat === 'cinematic'));
}

function startTimecodeCounter() {
  const tc = document.getElementById('live-timecode');
  let frame = 12;
  setInterval(() => {
    frame = (frame + 1) % 60;
    const fStr = frame < 10 ? '0' + frame : frame;
    if (tc) tc.textContent = `01:24:18:${fStr}`;
  }, 1000 / 30);
}

document.addEventListener('DOMContentLoaded', initNLE);
'''

    with open(os.path.join(p, "index.html"), "w", encoding="utf-8") as f: f.write(html)
    with open(os.path.join(p, "style.css"), "w", encoding="utf-8") as f: f.write(css)
    with open(os.path.join(p, "app.js"), "w", encoding="utf-8") as f: f.write(app_js)
    print("✓ Successfully generated Portfolio4: Timeline NLE Studio")

generate_portfolio_4()
