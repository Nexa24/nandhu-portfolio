# Project & Chat Capsule: Nandhu Portfolio (Nandhulal P S)

**Capsule Generation Date:** November 05, 2026  
**Subject / Client:** Nandhulal P S (`nandhuthingsofficial@gmail.com`)  
**Workspace:** `e:\Alanove\VS Code\nandhu_portfolio`  
**Primary Tech Stack:** HTML5, Vanilla CSS3 (Custom Tokens), Vanilla JavaScript (ES6+), FormSubmit API, Local Static Server (`serve`)

---

## 1. Executive Summary & Purpose

This capsule encapsulates the entire conversational evolution, design rationale, implementation details, asset dependencies, and deployment procedures for the **Nandhulal P S Portfolio Website**. 

It aggregates all sessions from inception through design pivots, audio/video engine integrations, contact form configuration, and local dev tooling into a single authoritative handover document.

---

## 2. Chronological Conversation History & Milestones

### Session 1: Genesis, Video Editor Pivot & Feature Build
- **Conversation ID:** `305e3fd7-7d4a-4704-a21d-fc3525687d4f`
- **Date Range:** October 13, 2026 – October 15, 2026

#### Key Prompts & Iterations:
1. **Initial Scaffold:**
   - Prompt: `@[design.md] @[skill.md] use thiis and create`
   - Established the Folira Lite aesthetic (clean editorial minimalism, high-contrast typography, disciplined spacing).
2. **Niche & Persona Transition:**
   - Prompt: `optimize the website and change the elements suitable for video editor portfolio`
   - Pivot from generic portfolio to high-end post-production, commercial video editing, color grading, and motion graphics.
3. **Rotating Dynamic Hero Typography:**
   - Prompt: `this content is changing (a video editor, a SMM Stratagist, a motion graphic specialist)`
   - Built a dynamic typewriter loop cycling through:
     - *Video Editor*
     - *SMM Strategist*
     - *Motion Graphic Specialist*
   - Fixed layout jumping by reserving exact height constraints for the changing lines.
4. **Navbar Refinement:**
   - Prompt: `change the current navbar to this smaller one`
   - Replaced heavy standard header with a sleek, compact floating glass pill positioned at top-center/right.
5. **Hero Image Reconstruction:**
   - Prompts: `make the hero image like this @avatar.jpg`, `make he first image larger as in the same second image`, `not as a single image(two images as in the image)`
   - Structured hero visual container with dual images: background silhouette and foreground cutout (`nandhu_headphone.png` / `1hero_composite.png`).
6. **Micro-Interactions & Audio Experience:**
   - Ambient Track: `Serene Edit.mp3` added as ambient background audio with animated EQ bars and toggle button in the floating navbar.
   - Haptic Audio: `juniorsoundays-ui-sound-72-527849.mp3` hooked up to a global click listener with volume throttling to deliver tactile audio feedback.
7. **Vertical 9:16 Video Showcase & 3D Pop-Out:**
   - Prompts: `add something unique animation in work section`, `use these 3 video to check video, use these video repeted everywhere needed as to teest video working`
   - Built Behance/Instagram Reels-inspired 9:16 aspect ratio vertical cards.
   - Added IntersectionObserver to auto-play/pause videos (`simple.mp4`, `working.mp4`, `2026.mp4`) as they enter the screen.
   - Interactive expanding hover / side-peek preview animation.
8. **Photography & Cinematic Stills Section:**
   - Prompt: `add section for photography and videography`
   - Added `#lens-work` section showcasing high-resolution stills, color grade comparisons, and director-of-photography framing.
9. **FormSubmit Project Inquiry System:**
   - Prompts: `<form action="https://formsubmit.co/your@email.com" method="POST">... add a currency switch, add a custom amount, also for reason for contact`
   - Implemented dynamic budget calculator supporting 4 currencies: **USD ($)**, **EUR (€)**, **GBP (£)**, and **INR (₹)**.
   - Added reason-for-contact pills (*Commercial Video Editing*, *Color Grading & Finishing*, *Short-Form / Reels Motion*).
   - **FormSubmit Activation Bugfix:**
     - Prompt: `correct the issue that first message appeared in an email and when changed no message is appearing again`
     - Root cause: FormSubmit sends an initial "Activate Form" verification email to the target inbox (`nandhuthingsofficial@gmail.com`). Until clicked, subsequent submissions fail silently or trigger redirect loops.
     - Solution: Refactored [app.js](file:///e:/Alanove/VS%20Code/nandhu_portfolio/app.js) with AJAX `fetch()` submission, explicit `_replyto` and `_subject` payloads, and status toasts advising the owner to click the activation email.

---

### Session 2: Chat Retrieval & Dev Server Launch
- **Conversation ID:** `aa566cb5-e104-4765-ad8c-eb6684c72481`
- **Date:** October 29, 2026

#### Key Actions:
- Retrieved past chat memory and project context.
- User prompted: `npm run`
- Detected that the workspace was a static site without `package.json`.
- Initialized [package.json](file:///e:/Alanove/VS%20Code/nandhu_portfolio/package.json) with `serve` dev server:
  - `"dev": "npx serve -s . -l 3000"`
  - `"start": "npx serve -s . -l 3000"`
- Verified local live server running on `http://localhost:3000`.

---

### Session 3: Context Restoration & Capsule Generation
- **Conversation ID:** `242d67ef-8d82-4384-ab0a-94f5e7abb5b8`
- **Date:** November 05, 2026

#### Key Actions:
- Located past chat history across Gemini Antigravity IDE storage.
- Documented full timeline, architecture, assets, and code contracts into this [chat_capsule.md](file:///e:/Alanove/VS%20Code/nandhu_portfolio/chat_capsule.md).

---

## 3. Architecture & File Structure

```
e:\Alanove\VS Code\nandhu_portfolio/
│
├── index.html                 # Complete semantic single-page portfolio
├── style.css                  # Custom styling system, tokens & animations
├── app.js                     # All client-side logic, audio, form & interactions
├── package.json               # NPM run scripts (npx serve on port 3000)
├── design.md                  # Folira Lite design guidelines & typography specs
├── skill.md                   # Brand skill rules and tone of voice
├── chat_capsule.md            # Master project & chat capsule (this file)
│
└── assets/                    # Media, audio, video, icons and mockups
    ├── 1hero_composite.png    # Composite hero visual
    ├── nandhu_headphone.png   # Transparent cutout hero avatar
    ├── hero_poster.jpg        # Video hero fallback poster
    ├── Serene Edit.mp3        # Ambient background audio track
    ├── juniorsoundays-ui-sound-72-527849.mp3 # UI click sound
    ├── 2026.mp4               # Demo reel video 1
    ├── simple.mp4             # Demo reel video 2
    ├── working.mp4            # Demo reel video 3
    ├── ps.jpg                 # Adobe Photoshop badge
    ├── pr.jpg                 # Adobe Premiere Pro badge
    ├── dv.jpg                 # DaVinci Resolve badge
    ├── lr.jpg                 # Adobe Lightroom badge
    ├── cc.jpg                 # CapCut badge
    ├── cv.jpg                 # Canva badge
    ├── work1.jpg - work7.jpg  # Selected portfolio case study stills
    ├── reel_1.jpg - reel_5.jpg# 9:16 vertical video thumbnails
    ├── blog1.jpg - blog4.jpg  # Blog & thought article thumbnails
    ├── proc1.jpg - proc4.jpg  # 4-step workflow diagrams
    └── srv1.jpg - srv3.jpg    # Service tier graphic previews
```

---

## 4. Key Components & Implementation Details

### A. Floating Compact Navbar (`#navbar`)
- Styled as a glassmorphic pill (`backdrop-filter: blur(16px)`).
- Navigation links (`#hero`, `#works`, `#lens-work`, `#about`, `#writing`).
- **Sound Toggle Button** (`#sound-toggle-btn`): Displays a 4-bar CSS equalizer that animates during playback.
- **CTA Button**: Quick jump to `#contact`.
- **Mobile Drawer**: Responsive slide-down overlay for viewport widths `< 768px`.

### B. Hero Section (`#hero`)
- **Rotating Subtitle**: Cycles through Nandhulal's core specializations with a smooth blinking cursor effect.
- **Dual Visual Presentation**: Showcases Nandhu in an editor/creator studio persona with headphone visual assets.
- **Software Dock**: Grid of creative tools (Premiere Pro, DaVinci Resolve, Photoshop, Lightroom, CapCut, Canva).

### C. 9:16 Vertical Video Reels (`#works`)
- Dedicated showcase for Instagram Reels, YouTube Shorts, and TikTok commercial campaigns.
- Video containers use `aspect-ratio: 9 / 16`.
- Viewport Intersection Observer automatically pauses videos when scrolled out of view and plays on center alignment.
- Click to expand / sound unmute functionality.

### D. Photography & Cinematic Gallery (`#lens-work`)
- High-resolution editorial photo grid.
- Hover zoom and metadata overlays (Focal length, color LUT, camera profile).

### E. Interactive Project Inquiry Form (`#contact`)
- **Endpoint**: `https://formsubmit.co/ajax/nandhuthingsofficial@gmail.com`
- **Dynamic Currency Calculator**:
  - `USD ($)` | `EUR (€)` | `GBP (£)` | `INR (₹)`
  - Preset investment tiers + custom budget slider/input.
- **Scope Selection**: Radio pills for project type.
- **Verification Flow**: Notifies the sender upon submission and informs the admin if FormSubmit activation is pending.

---

## 5. Local Development & Deployment

### Running Locally
```powershell
cd "e:\Alanove\VS Code\nandhu_portfolio"
npm run dev
# or
npm start
```
The site will be available on **`http://localhost:3000`**.

### Contact Form Activation Step (Important)
If testing from a new domain or environment:
1. Submit a test inquiry through the contact form.
2. Open **`nandhuthingsofficial@gmail.com`**.
3. Locate the confirmation email from `submissions@formsubmit.co` with subject **"Action Required: Activate Form"**.
4. Click **"Activate Form"** once. All subsequent inquiries will be directly delivered to the inbox.

---

## 6. Handover & Extension Checklist
- [x] Full chat history documented
- [x] Responsive layout across Mobile, Tablet, Desktop
- [x] Ambient & click sound effects operational
- [x] Video player viewability optimizations implemented
- [x] FormSubmit endpoint and currency switcher tested
- [x] Local dev runner configured in `package.json`
- [ ] Add client testimonials or video testimonials once received
- [ ] Connect custom domain (e.g. `nandhualps.com` or `nandhuedits.com`)
