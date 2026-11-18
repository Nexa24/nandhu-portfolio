/**
 * Client-side Interactivity for Nandhalal ps — Video Editor Portfolio
 * Real video playback, post-production metadata modals, category filtering & smooth scroll spy
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initContactForm();
  initModalClose();
  initProcessScrollSpy();
  initVideoFilters();
  initDynamicRoleTyping();
  initReelPopout();
  initAutoPlayVisibleVideos();
  initAmbientMusic();
  initClickSound();
  initLensGallery();
  initWorksPage();
});

// Mobile menu toggle
function initMobileNav() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-drawer');
  const links = document.querySelectorAll('.mobile-nav-link');
  if (!menuBtn || !drawer) return;

  menuBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      drawer.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    } else {
      drawer.classList.add('open');
      menuBtn.setAttribute('aria-expanded', 'true');
    }
  });

  links.forEach(l => {
    l.addEventListener('click', () => {
      drawer.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

// Video Genre Filters
function initVideoFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const workCards = document.querySelectorAll('[data-genre]');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetGenre = btn.getAttribute('data-genre');

      workCards.forEach(card => {
        const cardGenre = card.getAttribute('data-genre');
        if (targetGenre === 'all' || cardGenre === targetGenre) {
          card.style.display = '';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });
}

// Process Sidebar Active Spy & Smooth Navigation
function initProcessScrollSpy() {
  const stepCards = document.querySelectorAll('.process-card-unit');
  const navLinks = document.querySelectorAll('.process-nav-link');
  if (!stepCards.length || !navLinks.length) return;

  function updateActiveLink() {
    let currentId = '';
    const scrollThreshold = window.innerHeight * 0.42;

    stepCards.forEach(card => {
      const rect = card.getBoundingClientRect();
      if (rect.top <= scrollThreshold) {
        currentId = card.getAttribute('id');
      }
    });

    if (!currentId && stepCards.length > 0) {
      currentId = stepCards[0].getAttribute('id');
    }

    if (currentId) {
      navLinks.forEach(link => {
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

  // Smooth scroll click handler
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });
  });
}

/* ==========================================================================
   VIDEO DATA STORE (POST-PRODUCTION METADATA)
   ========================================================================== */
const videoProjectsData = {
  showreel: {
    title: ' P S — 2024 Video Editing & Finishing Reel ',
    desc: 'A dynamic cut demonstrating commercial pacing, rapid transient audio sync, cinematic ACES color grading, and VFX compositing across automotive, fashion, and technology films.',
    videoUrl: 'assets/copy_401AF4C0-359F-4FFD-929F-882FFA2F3C97 3.mov',
    poster: 'assets/nandhu_headphone.png',
    specs: ['4K UHD', '24 FPS', 'ACEScc Color', '5.1 Surround', 'ProRes 4444'],
    breakdown: [
      { key: 'Editorial Style', val: 'High-Retention Narrative & Beat-Sync' },
      { key: 'Color Pipeline', val: 'DaVinci Resolve · Kodak 2383 LUT' },
      { key: 'Sound Design', val: 'Custom Foley, Low-end Risers & Stems' }
    ]
  },
  desert_motion: {
    title: 'Echoes of the High Desert — Documentary Cinematography',
    desc: 'Captured in the open badlands and desert plains. Focus on barren natural geometries, subtle wildlife movement, and wide-gamut golden hour exposure preservation.',
    videoUrl: 'assets/2026.mp4',
    poster: 'assets/IMG_7502.jpg',
    specs: ['Documentary', 'Sony FX6', '4K 60p', 'S-Log3 / S-Gamut3.Cine', 'ProRes HQ'],
    breakdown: [
      { key: 'Role', val: 'Director of Photography & Colorist' },
      { key: 'Optics', val: 'Sony G-Master 24-70mm & 70-200mm f/2.8' },
      { key: 'Color Pipeline', val: 'ACEScc · DaVinci Resolve Wide Gamut' }
    ]
  },
  mechanical_cadence: {
    title: 'Mechanical Cadence — Industrial Hardware Motion',
    desc: 'High-precision commercial motion film exploring micro-electronics, silicon wafers, and industrial PCB assembly. Shot with macro optics and programmable motorized slider moves.',
    videoUrl: 'assets/copy_401AF4C0-359F-4FFD-929F-882FFA2F3C97 3.mov',
    poster: 'assets/proc3.jpg',
    specs: ['Industrial Film', 'RED Komodo 6K', 'Atlas Orion 2x Anamorphic', '6K RAW'],
    breakdown: [
      { key: 'Role', val: 'Cinematographer & Motion Specialist' },
      { key: 'Rigging', val: '6-Axis Dana Dolly & Motorized Focus Pull' },
      { key: 'Finishing', val: 'DCI-P3 Mastering & Custom Sound FX' }
    ]
  },
  urban_rhythm: {
    title: 'Urban Velocity — Kinetic Cityscape Spot',
    desc: 'Fast-paced metropolitan visual study capturing the pulse of the city through handheld gimbal moves, neon reflections, and seamless speed ramping.',
    videoUrl: 'assets/reel_3.MOV',
    poster: 'assets/reel_5.jpg',
    specs: ['Brand Spot', 'BMPCC 6K Pro', 'Zeiss CP.3 Primes', 'ProRes 422'],
    breakdown: [
      { key: 'Role', val: 'Camera Operator & Finishing Editor' },
      { key: 'Stabilization', val: 'DJI RS3 Pro & Wireless Follow Focus' },
      { key: 'Delivery', val: '4K DCI & 9:16 Social Cutdowns' }
    ]
  },
  work1: {
    title: 'Porsche Nocturne — Cyberpunk Night Commercial Spot',
    desc: 'High-energy commercial edit featuring rapid speed ramps, custom engine audio design, neon glow color grading, and razor-sharp cuts synced to industrial electronic percussion.',
    videoUrl: 'assets/reel_3.MOV',
    poster: 'assets/work1.jpg',
    isVertical: true,
    specs: ['Commercial', '01:30', 'RED V-Raptor 8K', 'ACES Color', '9:16 + 16:9'],
    breakdown: [
      { key: 'Client / Director', val: 'Apex Motors / Dir. Julian Vance' },
      { key: 'Pacing Technique', val: 'Match Cuts & Whip Pan Transitions' },
      { key: 'Master Delivery', val: 'Broadcast TV Master & Social Shorts' }
    ]
  },
  work2: {
    title: 'Nocturnal Echoes — Experimental Music Film',
    desc: 'Mood-driven narrative music video shot in low-light environments. Heavy emphasis on rhythmic breathing room, organic film grain layering, and subtle optical flares.',
    videoUrl: 'assets/2026.mp4',
    poster: 'assets/work2.jpg',
    isVertical: true,
    specs: ['Music Video', '03:45', 'ARRI Alexa Mini LF', 'Anamorphic 2.39:1'],
    breakdown: [
      { key: 'Artist / Label', val: 'Echo Wave / Subterranean Records' },
      { key: 'Color Palette', val: 'Teal & Deep Shadow Split-Tone' },
      { key: 'Sound Stems', val: '24-bit 96kHz Lossless Master' }
    ]
  },
  work3: {
    title: 'Craftsman of the Valley — Cinematic Documentary Short',
    desc: 'Human-centered documentary pacing balancing observational silences with kinetic artisan crafting close-ups. Clean dialogue mastering and ambient field recordings.',
    videoUrl: 'assets/copy_401AF4C0-359F-4FFD-929F-882FFA2F3C97 3.mov',
    poster: 'assets/work3.jpg',
    isVertical: true,
    specs: ['Documentary', '05:12', 'Sony FX9 & Cine Primes', 'Natural Light Color'],
    breakdown: [
      { key: 'Production Co.', val: 'Heritage Film Collective' },
      { key: 'Audio Restoration', val: 'iZotope RX Dialogue Denoise' },
      { key: 'Festival Honors', val: 'Official Selection Sundance Shorts' }
    ]
  },
  work4: {
    title: 'Aura Cinematic Short — Avant-Garde Beauty Campaign',
    desc: 'High-fashion editorial film emphasizing skin tone fidelity, soft floral contrasts, and ethereal time-dilation cuts.',
    videoUrl: 'assets/2026.mp4',
    poster: 'assets/auracloud.jpg',
    specs: ['Editorial', '02:20', 'RED Monstro 8K', 'Film Stock Emulation'],
    breakdown: [
      { key: 'Client', val: 'Aura Cosmica Paris' },
      { key: 'Color Science', val: 'ACEScc · Film Look LUTs' },
      { key: 'VFX', val: 'Subtle Beauty Clean-up & Retouch' }
    ]
  },
  work5: {
    title: 'Urban Monolith — Brutalist Architectural Motion',
    desc: 'Hypnotic geometric cuts synced to minimalist bass pulses. Exploring concrete textures, architectural perspective lines, and atmospheric haze.',
    videoUrl: 'assets/reel_3.MOV',
    poster: 'assets/work5.jpg',
    specs: ['Motion Film', '01:45', 'DJI Ronin 4D 6K', '60 FPS Smooth Flow'],
    breakdown: [
      { key: 'Exhibition', val: 'Berlin Architectural Biennial' },
      { key: 'Soundtrack', val: 'Ambient Drone & Sub-Bass Oscillations' },
      { key: 'Master Aspect', val: 'Square 1:1 & Widescreen 16:9' }
    ]
  },
  work6: {
    title: 'Bloom Botanica — Luxury Fragrance Commercial',
    desc: 'Macro lens choreography capturing liquid refraction, blossoming petals, and luminous outdoor sunlight with vibrant color separation.',
    videoUrl: 'assets/copy_401AF4C0-359F-4FFD-929F-882FFA2F3C97 3.mov',
    poster: 'assets/work6.jpg',
    specs: ['Commercial Spot', '00:45', 'Phantom Flex4K High-Speed', '1000 FPS'],
    breakdown: [
      { key: 'Client', val: 'Bloom Fragrances London' },
      { key: 'Finishing Suite', val: 'DaVinci Resolve Studio 19' },
      { key: 'Campaign Deliverable', val: 'Digital Billboard & TikTok 9:16' }
    ]
  },
  work7: {
    title: 'Ripple Sound & Rhythm — High-Fidelity Audio Experience',
    desc: 'An exploration in sound-first editing where visual cuts are driven purely by water acoustic transients, underwater hydrophone recordings, and immersive spatial panning.',
    videoUrl: 'assets/2026.mp4',
    poster: 'assets/work7.jpg',
    specs: ['Sound Experiment', '01:10', 'High-Speed Hydrophone', 'Dolby Atmos Stems'],
    breakdown: [
      { key: 'Audio Engine', val: 'Pro Tools & Ableton Live Sync' },
      { key: 'Cut Cadence', val: 'Microsecond Waveform Alignment' },
      { key: 'Master Grade', val: 'Deep Cyan & Cobalt Water Textures' }
    ]
  },
  creative: {
    title: 'Nandhalal ps — Creative Post-Production & Color Reel',
    desc: 'Cinematic visual suite showcasing color timing, ACEScc color science, multi-camera pacing, and sound design across brand commercials and music films.',
    videoUrl: 'assets/copy_401AF4C0-359F-4FFD-929F-882FFA2F3C97 3.mov',
    poster: 'assets/hero_poster.png',
    specs: ['ACEScc', '24 FPS', 'ProRes 4444', 'DaVinci Resolve Studio'],
    breakdown: [
      { key: 'Color Grade', val: 'Kodak 2383 Print LUT & Custom Curves' },
      { key: 'Audio Stems', val: 'Spatial Sound Design & Foley' },
      { key: 'Pacing', val: 'Beat-Matched High Velocity Cut' }
    ]
  },
  reel_louvre: {
    title: 'THE ART OF THE POUR — A LUXURY COCKTAIL EXPERIENCE',
    desc: 'Kinetic 3D motion graphic showcase featuring stylized Louvre pyramid geometry, French typography choreography, and ambient orchestral sound design.',
    videoUrl: 'assets/copy_401AF4C0-359F-4FFD-929F-882FFA2F3C97 3.mov',
    poster: 'assets/reel_louvre.jpg',
    isVertical: true,
    specs: ['9:16 Vertical Reel', '00:30', 'Motion Graphics', 'Typography Sync'],
    breakdown: [
      { key: 'Art Direction', val: 'Minimal Architectural Parallax' },
      { key: 'Typography', val: 'Custom Kinetic Title Animation' },
      { key: 'Delivery', val: 'Instagram Reels & TikTok 9:16 UHD' }
    ]
  },
  reel_travel: {
    title: 'Traveling Europe — Fast-Paced Kinetic Typography Reel',
    desc: 'Rapid viral hook reel combining vintage travel textures, bold purple aesthetic typography, and fast-tempo rhythmic cuts.',
    videoUrl: 'assets/2026.mp4',
    poster: 'assets/reel_travel.jpg',
    isVertical: true,
    specs: ['9:16 Vertical Reel', '00:25', 'Shorts Format', 'Kinetic Editorial'],
    breakdown: [
      { key: 'Pacing Technique', val: 'Rapid Rhythmic Whip Pans' },
      { key: 'Texture Overlay', val: 'Handmade Paper Grain & Halftone' },
      { key: 'Soundtrack', val: 'Punchy Lo-Fi Beat Sync' }
    ]
  },
  reel_retro: {
    title: 'Beyond the Beat',
    desc: 'Monochrome hardware aesthetic with punchy neon accent hits, technical readout overlays, and punchy analog clicks.',
    videoUrl: 'assets/reel_3.MOV',
    poster: 'assets/college dj event .MOV',
    isVertical: true,
    specs: ['9:16 Vertical Reel', '00:20', 'Retro Motion', 'Sound FX Design'],
    breakdown: [
      { key: 'Style', val: 'Industrial Brutalism & Synth Tech' },
      { key: 'Sound Foley', val: 'Tactile Mechanical Switch Clicks' },
      { key: 'Format', val: 'Social Story & Vertical Ad' }
    ]
  },
  reel_1: {
    title: 'SFX Fast Cut Edits',
    subtitle: 'Shoot + Edit',
    desc: 'A high-energy visual montage crafted using handheld footage, dynamic camera movements, rapid cuts, and carefully layered sound effects. With precise sound synchronization and rhythmic editing, ordinary moments are transformed into an engaging and visually impactful sequence.',
    videoUrl: 'assets/2026.mp4',
    poster: 'assets/reel_1.jpg',
    isVertical: true,
    specs: ['9:16 Vertical Reel', '00:15', 'Shoot + Edit'],
    tags: [
      'SFX Editing',
      'Fast Cut Editing',
      'Sound Design',
      'Handheld Videography',
      'Cinematic Montage',
      'Short-form Content'
    ],
    breakdown: [
      { key: 'Editing Style', val: 'SFX & Fast Cut Editing' },
      { key: 'Sound Design', val: 'Rhythmic Audio & Foley Sync' },
      { key: 'Cinematography', val: 'Handheld Videography' }
    ]
  },
  reel_2: {
    title: 'THE ART OF THE POUR — A LUXURY COCKTAIL EXPERIENCE',
    desc: 'Kinetic editorial motion reel featuring analog 35mm SLR camera mechanics, mechanical shutter Foley, and editorial serif title choreography.',
    videoUrl: 'assets/copy_401AF4C0-359F-4FFD-929F-882FFA2F3C97 3.mov',
    poster: 'assets/reel_2.jpg',
    isVertical: true,
    specs: ['9:16 Vertical Reel', '00:22', 'Editorial Motion', 'Analog Sound FX'],
    breakdown: [
      { key: 'Audio Track', val: 'Custom High-Speed Shutter Clicks' },
      { key: 'Motion Style', val: 'Stop-Motion Cutaways & Smooth Zooms' },
      { key: 'Audience', val: 'Creative & Fashion Demographic' }
    ]
  },
  reel_3: {
    title: 'Renaissance Masterpieces — Cultural 2.5D Parallax Reel',
    desc: 'Museum gallery promo utilizing 2.5D projection mapping, separating fine art classical statues and oil paintings into depth-layered parallax.',
    videoUrl: 'assets/reel_3.MOV',
    poster: 'assets/reel_3.jpg',
    isVertical: true,
    specs: ['9:16 Vertical Reel', '00:30', '2.5D Parallax', 'Museum Exhibition'],
    breakdown: [
      { key: 'VFX Technique', val: 'Multi-Plane Camera Projection' },
      { key: 'Color Fidelity', val: 'Natural Historic Pigment Balance' },
      { key: 'Platform', val: 'TikTok Cultural Spotlight' }
    ]
  },
  reel_4: {
    title: 'When Traveling — 3D Isometric App Promo Reel',
    desc: 'App launch promo featuring stylized miniature 3D beach vacation assets, smartphone mockups, and smooth camera rotations.',
    videoUrl: 'assets/2026.mp4',
    poster: 'assets/reel_4.jpg',
    isVertical: true,
    specs: ['9:16 Vertical Reel', '00:18', '3D Isometric', 'Product Marketing'],
    breakdown: [
      { key: 'Animation', val: 'Physics-Based Smooth Spring Dynamics' },
      { key: 'Sound Palette', val: 'Upbeat Melodic Pop & Interface Chimes' },
      { key: 'Deliverable', val: 'Instagram Sponsored Story Reel' }
    ]
  },
  reel_5: {
    title: 'Global Roaming SIM — Modern Vector Commercial Spot',
    desc: 'Sleek kinetic animation highlighting international eSIM switching with vibrant ultraviolet palette and micro-interaction animations.',
    videoUrl: 'assets/copy_401AF4C0-359F-4FFD-929F-882FFA2F3C97 3.mov',
    poster: 'assets/reel_5.jpg',
    isVertical: true,
    specs: ['9:16 Vertical Reel', '00:15', 'Vector Motion', 'Social Campaign'],
    breakdown: [
      { key: 'Design System', val: 'Minimal Modern Flat Vector Motion' },
      { key: 'Frame Timing', val: 'Snappy Ease-Out Velocity Curves' },
      { key: 'Channel', val: 'YouTube Shorts & Meta Ads' }
    ]
  }
};

window.openVideoPlayer = function (id) {
  const data = videoProjectsData[id];
  if (!data) return;

  const modal = document.getElementById('video-modal');
  const modalWindow = modal ? modal.querySelector('.modal-window') : null;
  const videoPlayer = document.getElementById('modal-video-player');
  const videoSrc = document.getElementById('modal-video-src');
  const specsContainer = document.getElementById('modal-specs');
  const breakdownContainer = document.getElementById('modal-breakdown');
  if (!modal || !videoPlayer) return;

  // Ensure video element is visible
  videoPlayer.style.display = 'block';

  // Toggle 9:16 vertical ratio styling for reels
  if (modalWindow) {
    if (data.isVertical) {
      modalWindow.classList.add('vertical-reel-player');
    } else {
      modalWindow.classList.remove('vertical-reel-player');
    }
  }

  // Set video source & poster
  videoSrc.src = data.videoUrl;
  videoPlayer.poster = data.poster;
  videoPlayer.load();

  // Populate Specs Chips
  specsContainer.innerHTML = '';
  data.specs.forEach((s, idx) => {
    const chip = document.createElement('span');
    chip.className = idx === 0 ? 'modal-spec-chip accent' : 'modal-spec-chip';
    chip.textContent = s;
    specsContainer.appendChild(chip);
  });

  // Populate Title & Description
  document.getElementById('video-modal-title').textContent = data.title;
  document.getElementById('video-modal-desc').textContent = data.desc;

  // Populate Tags if present
  const tagsContainer = document.getElementById('modal-tags');
  if (tagsContainer) {
    tagsContainer.innerHTML = '';
    if (data.tags && data.tags.length > 0) {
      tagsContainer.style.display = 'flex';
      data.tags.forEach(t => {
        const tag = document.createElement('span');
        tag.className = 'modal-spec-chip';
        tag.textContent = t;
        tagsContainer.appendChild(tag);
      });
    } else {
      tagsContainer.style.display = 'none';
    }
  }

  // Populate Breakdown Pillars
  breakdownContainer.innerHTML = '';
  data.breakdown.forEach(item => {
    const box = document.createElement('div');
    box.innerHTML = `
      <div class="breakdown-item-key">${item.key}</div>
      <div class="breakdown-item-val">${item.val}</div>
    `;
    breakdownContainer.appendChild(box);
  });

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  // Duck ambient background music when video modal plays
  if (window.duckAmbientAudio) window.duckAmbientAudio(true);

  // Play video smoothly
  videoPlayer.play().catch(() => { });
};

function initModalClose() {
  const modal = document.getElementById('video-modal');
  const modalWindow = modal ? modal.querySelector('.modal-window') : null;
  const closeBtn = document.getElementById('modal-close-btn');
  const videoPlayer = document.getElementById('modal-video-player');
  if (!modal || !closeBtn) return;

  const close = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    if (modalWindow) modalWindow.classList.remove('vertical-reel-player');
    document.body.style.overflow = '';
    if (videoPlayer) {
      videoPlayer.pause();
      videoPlayer.currentTime = 0;
    }
    // Restore ambient background music
    if (window.duckAmbientAudio) window.duckAmbientAudio(false);
  };

  closeBtn.addEventListener('click', close);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) close();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      close();
    }
  });
}

// Essay Articles
window.openArticle = function (type) {
  const essays = {
    hierarchy: {
      title: 'The psychology of the invisible cut in commercial pacing.',
      desc: 'In commercial video editing, the best cut is the one the viewer never consciously perceives. By cutting on subject motion, eye-trace alignment, and musical transients, the brain absorbs the narrative without cognitive interruption.'
    },
    typography: {
      title: 'Why sound design and Foley carry 70% of emotional weight.',
      desc: 'A gorgeous 8K RED or ARRI visual falls flat without tactile weight. Sub-bass risers, cloth rustles, room tone air, and crisp Foley impacts give physical reality to pixels.'
    },
    micro: {
      title: 'Developing a signature cinematic color grade in DaVinci.',
      desc: 'ACES color workflows allow colorists to normalize mismatched sensor gamuts (Sony S-Log, ARRI LogC, RED IPP2) into a unified wide gamut canvas before applying print film emulation curves.'
    },
    tokens: {
      title: 'High-retention editing: how pacing keeps audiences hooked.',
      desc: 'Retention is governed by information velocity. Varying shot lengths between 0.8s micro-beats and 4s atmospheric holds prevents viewer fatigue while keeping engagement graphs high.'
    }
  };

  const article = essays[type];
  if (!article) return;

  // Re-use video modal window to display article insights
  const modal = document.getElementById('video-modal');
  const videoPlayer = document.getElementById('modal-video-player');
  if (!modal) return;

  if (videoPlayer) {
    videoPlayer.pause();
    videoPlayer.style.display = 'none';
  }

  document.getElementById('modal-specs').innerHTML = '<span class="modal-spec-chip accent">EDITORIAL ESSAY</span>';
  document.getElementById('video-modal-title').textContent = article.title;
  document.getElementById('video-modal-desc').textContent = article.desc;
  document.getElementById('modal-breakdown').innerHTML = '';

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};



// Video Project Brief Form (FormSubmit, Currency Switcher & Custom Budget)
function initContactForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('contact-submit-btn');
  const feedback = document.getElementById('contact-feedback');
  const currencyBtns = document.querySelectorAll('.currency-btn');
  const currencyHidden = document.getElementById('selected-currency');
  const symbolDisplay = document.getElementById('currency-symbol-display');
  const codeDisplay = document.getElementById('currency-code-display');
  const customAmountInput = document.getElementById('custom-amount-input');
  const presetCustomRadio = document.getElementById('preset-custom-radio');
  const preset1 = document.getElementById('budget-preset-1');
  const preset2 = document.getElementById('budget-preset-2');
  const preset3 = document.getElementById('budget-preset-3');

  if (!form) return;

  const currencyConfig = {
    USD: { symbol: '$', code: 'USD', p1: '< $1,500', p2: '$1,500 – $4,000', p3: '$4,000+' },
    EUR: { symbol: '€', code: 'EUR', p1: '< €1,400', p2: '€1,400 – €3,800', p3: '€3,800+' },
    GBP: { symbol: '£', code: 'GBP', p1: '< £1,200', p2: '£1,200 – £3,200', p3: '£3,200+' },
    INR: { symbol: '₹', code: 'INR', p1: '< ₹50,000', p2: '₹50,000 – ₹2,00,000', p3: '₹2,00,000+' }
  };

  // 1. Currency Switcher Handler
  currencyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currencyBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const curr = btn.getAttribute('data-currency');
      const cfg = currencyConfig[curr] || currencyConfig.USD;

      if (currencyHidden) currencyHidden.value = curr;
      if (symbolDisplay) symbolDisplay.textContent = cfg.symbol;
      if (codeDisplay) codeDisplay.textContent = cfg.code;

      if (preset1) preset1.textContent = cfg.p1;
      if (preset2) preset2.textContent = cfg.p2;
      if (preset3) preset3.textContent = cfg.p3;
    });
  });

  // 2. Custom Amount Input Focus / Typing
  if (customAmountInput && presetCustomRadio) {
    customAmountInput.addEventListener('input', () => {
      presetCustomRadio.checked = true;
    });
    customAmountInput.addEventListener('focus', () => {
      presetCustomRadio.checked = true;
    });
  }

  // 3. Form Submission (Supports direct FormSubmit & in-page AJAX with activation checking)
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();
    const reasonEl = form.querySelector('input[name="reason"]:checked');
    const reason = reasonEl ? reasonEl.value : 'Project Inquiry';
    const currency = currencyHidden ? currencyHidden.value : 'USD';
    const customAmount = customAmountInput ? customAmountInput.value.trim() : '';

    if (!name || !email || !message) {
      if (feedback) {
        feedback.className = 'form-feedback-box error';
        feedback.textContent = 'Please fill out all required fields (Name, Email, and Project Details).';
      }
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      if (feedback) {
        feedback.className = 'form-feedback-box error';
        feedback.textContent = 'Please enter a valid work email address.';
      }
      return;
    }

    // Determine clean budget summary for the email
    const currSymbol = symbolDisplay ? symbolDisplay.textContent : '$';
    let budgetDisplay = '';
    if (customAmount) {
      budgetDisplay = `${currSymbol}${customAmount} ${currency} (Custom Investment)`;
    } else {
      const selectedTier = form.querySelector('input[name="budget_tier"]:checked');
      if (selectedTier && selectedTier.value !== 'custom') {
        const tierLabel = selectedTier.closest('label')?.querySelector('.form-pill-label')?.textContent;
        budgetDisplay = tierLabel ? `${tierLabel} (${currency})` : `${selectedTier.value} (${currency})`;
      } else {
        budgetDisplay = `Negotiable / Flexible (${currency})`;
      }
    }

    // Populate hidden helper inputs for fallback standard submits
    const replyToInput = document.getElementById('form-reply-to');
    if (replyToInput) replyToInput.value = email;
    const formattedBudgetInput = document.getElementById('formatted-budget-input');
    if (formattedBudgetInput) formattedBudgetInput.value = budgetDisplay;
    const nextUrlInput = document.getElementById('form-next-url');
    if (nextUrlInput) nextUrlInput.value = window.location.href.split('#')[0] + '#contact';

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending Brief...';
    }

    // Structured payload sent to FormSubmit
    const payload = {
      _subject: `New Project Inquiry: ${reason} from ${name}`,
      _template: 'table',
      _captcha: 'false',
      _replyto: email,
      'Client Name': name,
      'Client Email': email,
      'Project Scope / Reason': reason,
      'Budget / Investment': budgetDisplay,
      'Project Details & Specs': message
    };

    // Format FormSubmit AJAX endpoint URL
    const actionUrl = form.action || 'https://formsubmit.co/nandhuthingsofficial@gmail.com';
    const ajaxEndpoint = actionUrl.includes('formsubmit.co') && !actionUrl.includes('/ajax/')
      ? actionUrl.replace('formsubmit.co/', 'formsubmit.co/ajax/')
      : actionUrl;

    try {
      const response = await fetch(ajaxEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json().catch(() => ({}));

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Send Project Brief</span><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>';
      }

      // Check if FormSubmit returned an error or activation notice
      if (!response.ok || result.success === 'false' || result.success === false) {
        const errorMsg = (result.message || '').toLowerCase();

        if (errorMsg.includes('activat')) {
          if (feedback) {
            feedback.className = 'form-feedback-box warning';
            feedback.innerHTML = `
              <div style="font-weight: 700; margin-bottom: 6px; font-size: 14px;">⚠️ Action Required: Form Activation Needed</div>
              <div>FormSubmit has sent an activation email to <strong>nandhuthingsofficial@gmail.com</strong> with an <em>'Activate Form'</em> button.</div>
              <div style="margin-top: 8px; font-size: 12.5px; opacity: 0.95;">Please open your Gmail inbox (and check your <strong>Spam / Junk</strong> folder) for an email from FormSubmit titled <em>"Action Required: Activate your form"</em> and click <strong>Activate Form</strong>.</div>
              <div style="margin-top: 6px; font-size: 12px; opacity: 0.85;">Once clicked, all future submissions will instantly appear in your email!</div>
            `;
          }
        } else if (errorMsg.includes('web server')) {
          if (feedback) {
            feedback.className = 'form-feedback-box warning';
            feedback.innerHTML = `
              <div><strong>Notice:</strong> FormSubmit requires running from a web server (e.g. <code>http://localhost:3005</code>) instead of a local file path.</div>
              <div style="margin-top: 8px;">Submitting directly to FormSubmit gateway...</div>
            `;
          }
          setTimeout(() => { form.submit(); }, 1200);
        } else {
          if (feedback) {
            feedback.className = 'form-feedback-box error';
            feedback.textContent = result.message || 'Submission could not be completed. Please try again or reach out to nandhuthingsofficial@gmail.com.';
          }
        }
        return;
      }

      // Successful delivery
      if (feedback) {
        feedback.className = 'form-feedback-box success';
        feedback.innerHTML = `
          <div style="font-weight: 700; margin-bottom: 4px;">✓ Project Brief Dispatched!</div>
          <div>Thank you, <strong>${name}</strong>! Your inquiry for <em>"${reason}"</em> with budget <strong>${budgetDisplay}</strong> has been sent to Nandhalal ps. You will receive a response within 24 hours.</div>
        `;
      }

      form.reset();
      if (symbolDisplay) symbolDisplay.textContent = '$';
      if (codeDisplay) codeDisplay.textContent = 'USD';
      if (currencyHidden) currencyHidden.value = 'USD';
      currencyBtns.forEach((b, idx) => {
        if (idx === 0) b.classList.add('active');
        else b.classList.remove('active');
      });

    } catch (err) {
      // Fallback: If network or CORS prevents fetch, submit standard FormSubmit POST
      if (form.action && form.action.includes('formsubmit.co')) {
        if (feedback) {
          feedback.className = 'form-feedback-box warning';
          feedback.textContent = 'Redirecting to secure FormSubmit portal...';
        }
        form.submit();
      } else {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>Send Project Brief</span><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>';
        }
        if (feedback) {
          feedback.className = 'form-feedback-box error';
          feedback.textContent = `Submission error. Please email directly to nandhuthingsofficial@gmail.com.`;
        }
      }
    }
  });
}

// Dynamic Rotating Role Typewriter
function initDynamicRoleTyping() {
  const roleTextEl = document.getElementById('rotating-role-text');
  if (!roleTextEl) return;

  const roles = [
    'a Video Editor.',
    'a SMM Strategist.',
    'a I phone videographer'
  ];

  let roleIndex = 0;
  let charIndex = roles[0].length;
  let isDeleting = true;

  function typeTick() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      charIndex--;
      roleTextEl.textContent = currentRole.substring(0, charIndex);
    } else {
      charIndex++;
      roleTextEl.textContent = currentRole.substring(0, charIndex);
    }

    let delay = isDeleting ? 35 : 65 + Math.random() * 30;

    if (!isDeleting && charIndex === currentRole.length) {
      // Completed full phrase: hold for 2200ms
      isDeleting = true;
      delay = 2200;
    } else if (isDeleting && charIndex === 0) {
      // Completed erasing: pause then switch to next role
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 350;
    }

    setTimeout(typeTick, delay);
  }

  // Initial delay before first delete
  setTimeout(typeTick, 2400);
}

// Auto-play videos across the page when in visible area
function initAutoPlayVisibleVideos() {
  const gridVideos = document.querySelectorAll('.grid-reel-video');
  if (!gridVideos.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const video = entry.target;
      const card = video.closest('.work-card-reel');
      if (entry.isIntersecting) {
        video.play().then(() => {
          if (card) card.classList.add('playing');
        }).catch(() => { });
      } else {
        video.pause();
        if (card) card.classList.remove('playing');
      }
    });
  }, {
    threshold: 0.15
  });

  gridVideos.forEach(v => {
    observer.observe(v);
    const card = v.closest('.work-card-reel');
    if (card) {
      card.addEventListener('mouseenter', () => {
        v.play().then(() => {
          card.classList.add('playing');
        }).catch(() => { });
      });
    }
  });
}

// Interactive 3D Pop-Out Reel Deck with Video Play & Repeat Loop Choreography
function initReelPopout() {
  const banner = document.querySelector('.motion-reel-banner');
  const deck = document.getElementById('reel-stack-deck');
  const mainVideo = document.getElementById('reel-main-video');
  const leftVideo = document.getElementById('reel-left-video');
  const rightVideo = document.getElementById('reel-right-video');
  const toggleBtn = document.getElementById('toggle-reels-btn');
  const btnLabel = document.getElementById('reels-btn-label');
  if (!deck || !mainVideo) return;

  let isInView = false;
  let isTransitioning = false;

  function updateBtnUI(isPopped) {
    if (btnLabel) btnLabel.textContent = isPopped ? 'Collapse Stack' : 'Pop Out 3 Reels';
    if (toggleBtn) toggleBtn.setAttribute('aria-expanded', isPopped ? 'true' : 'false');
  }

  // Pop Out and play all 3 videos
  function popOutAndPlay() {
    deck.classList.add('popped-out', 'video-playing');
    updateBtnUI(true);

    if (leftVideo) leftVideo.play().catch(() => { });
    if (rightVideo) rightVideo.play().catch(() => { });
    mainVideo.play().catch(() => { });
  }

  // Pop In (collapse) back to 1 card and pause auxiliary videos
  function popInAndPause() {
    deck.classList.remove('popped-out', 'video-playing');
    updateBtnUI(false);
    if (leftVideo) leftVideo.pause();
    if (rightVideo) rightVideo.pause();
  }

  // Choreographed repeat sequence:
  // "when repeats in pop in and then pop out then play"
  function runRepeatSequence() {
    if (!isInView || isTransitioning) return;
    isTransitioning = true;

    // 1. POP IN: The 3 reels smoothly collapse back into that one video
    popInAndPause();

    // 2. In collapsed state, reset video timelines
    setTimeout(() => {
      if (!isInView) {
        isTransitioning = false;
        return;
      }

      mainVideo.currentTime = 0;
      if (leftVideo) leftVideo.currentTime = 0;
      if (rightVideo) rightVideo.currentTime = 0;

      // 3. POP OUT: The 3 reels smoothly pop out and fan out again
      deck.classList.add('popped-out', 'video-playing');
      updateBtnUI(true);

      // 4. THEN PLAY: Resume playback once popped out!
      setTimeout(() => {
        if (isInView) {
          mainVideo.play().catch(() => { });
          if (leftVideo) leftVideo.play().catch(() => { });
          if (rightVideo) rightVideo.play().catch(() => { });
        }
        isTransitioning = false;
      }, 350);

    }, 700);
  }

  // Trigger repeat when center video reaches end
  mainVideo.addEventListener('ended', () => {
    runRepeatSequence();
  });

  // Also trigger repeat rhythmically every ~9.8 seconds of playback
  mainVideo.addEventListener('timeupdate', () => {
    if (isInView && !isTransitioning && mainVideo.currentTime >= 9.8) {
      runRepeatSequence();
    }
  });

  // When center video starts playing, ensure deck pops out
  mainVideo.addEventListener('play', () => {
    if (isInView && !isTransitioning && !deck.classList.contains('popped-out')) {
      deck.classList.add('popped-out', 'video-playing');
      updateBtnUI(true);
      if (leftVideo) leftVideo.play().catch(() => { });
      if (rightVideo) rightVideo.play().catch(() => { });
    }
  });

  // IntersectionObserver: auto play when video is in visible area
  const deckObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        isInView = true;
        popOutAndPlay();
      } else {
        isInView = false;
        mainVideo.pause();
        if (leftVideo) leftVideo.pause();
        if (rightVideo) rightVideo.pause();
        popInAndPause();
      }
    });
  }, {
    threshold: 0.15
  });

  deckObserver.observe(banner || deck);

  // Manual Toggle button
  if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isPopped = deck.classList.contains('popped-out');
      if (isPopped) {
        popInAndPause();
      } else {
        popOutAndPlay();
      }
    });
  }

  // Hover or tap deck to pop out and play
  deck.addEventListener('mouseenter', () => {
    popOutAndPlay();
  });

  deck.addEventListener('click', (e) => {
    if (!deck.classList.contains('popped-out')) {
      popOutAndPlay();
    }
  });

  // Keyboard accessibility
  deck.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const isPopped = deck.classList.contains('popped-out');
      if (isPopped) {
        popInAndPause();
      } else {
        popOutAndPlay();
      }
    }
  });
}

// Background Ambient Music Controller ("Serene Edit.mp3")
function initAmbientMusic() {
  const audio = document.getElementById('bg-ambient-audio');
  const toggleBtn = document.getElementById('sound-toggle-btn');
  const mobileToggleBtn = document.getElementById('mobile-sound-toggle-btn');
  const statusText = toggleBtn ? toggleBtn.querySelector('.sound-status-text') : null;
  const mobileStatusText = document.getElementById('mobile-sound-text');
  if (!audio) return;

  const TARGET_VOLUME = 0.35;
  let isMutedByUser = false;
  let wasPlayingBeforeDuck = false;
  let fadeInterval = null;

  audio.volume = TARGET_VOLUME;

  function updateSoundUI(isPlaying) {
    if (toggleBtn) {
      if (isPlaying) {
        toggleBtn.classList.add('playing');
        toggleBtn.setAttribute('aria-label', 'Mute ambient sound');
        if (statusText) statusText.textContent = 'Sound ON';
      } else {
        toggleBtn.classList.remove('playing');
        toggleBtn.setAttribute('aria-label', 'Play ambient sound');
        if (statusText) statusText.textContent = 'Sound';
      }
    }

    if (mobileToggleBtn) {
      if (isPlaying) {
        mobileToggleBtn.classList.add('playing');
        if (mobileStatusText) mobileStatusText.textContent = 'Ambient Music: ON (Serene Edit)';
      } else {
        mobileToggleBtn.classList.remove('playing');
        if (mobileStatusText) mobileStatusText.textContent = 'Ambient Music: OFF (Serene Edit)';
      }
    }
  }

  function fadeIn(targetVol = TARGET_VOLUME, duration = 800) {
    clearInterval(fadeInterval);
    audio.volume = 0;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        updateSoundUI(true);
        const step = targetVol / (duration / 50);
        fadeInterval = setInterval(() => {
          if (audio.volume + step >= targetVol) {
            audio.volume = targetVol;
            clearInterval(fadeInterval);
          } else {
            audio.volume += step;
          }
        }, 50);
      }).catch(() => {
        updateSoundUI(false);
      });
    }
  }

  function fadeOut(onComplete, duration = 400) {
    clearInterval(fadeInterval);
    const step = audio.volume / (duration / 50);
    fadeInterval = setInterval(() => {
      if (audio.volume - step <= 0.02) {
        audio.volume = 0;
        clearInterval(fadeInterval);
        audio.pause();
        updateSoundUI(false);
        if (onComplete) onComplete();
      } else {
        audio.volume -= step;
      }
    }, 50);
  }

  function togglePlay() {
    if (audio.paused || audio.volume === 0) {
      isMutedByUser = false;
      fadeIn();
    } else {
      isMutedByUser = true;
      fadeOut();
    }
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      togglePlay();
    });
  }

  if (mobileToggleBtn) {
    mobileToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      togglePlay();
    });
  }

  // Gracefully start ambient music on user's first interaction with document
  const handleFirstInteraction = () => {
    if (!isMutedByUser && audio.paused) {
      fadeIn();
    }
    document.removeEventListener('click', handleFirstInteraction);
    document.removeEventListener('keydown', handleFirstInteraction);
    document.removeEventListener('touchstart', handleFirstInteraction);
  };

  document.addEventListener('click', handleFirstInteraction, { once: true });
  document.addEventListener('keydown', handleFirstInteraction, { once: true });
  document.addEventListener('touchstart', handleFirstInteraction, { once: true });

  // Expose ducking helper for videos & modals
  window.duckAmbientAudio = function (duck) {
    if (duck) {
      wasPlayingBeforeDuck = !audio.paused && audio.volume > 0;
      if (wasPlayingBeforeDuck) {
        fadeOut(null, 300);
      }
    } else {
      if (wasPlayingBeforeDuck && !isMutedByUser) {
        fadeIn(TARGET_VOLUME, 800);
      }
    }
  };
}

// Global UI Click Sound ("juniorsoundays-ui-sound-72-527849.mp3")
function initClickSound() {
  const CLICK_AUDIO_SRC = 'assets/juniorsoundays-ui-sound-72-527849.mp3';
  const POOL_SIZE = 6;
  const pool = [];
  let poolIndex = 0;

  // Pre-instantiate audio pool for instant zero-latency playback on rapid clicks
  for (let i = 0; i < POOL_SIZE; i++) {
    const audio = new Audio(CLICK_AUDIO_SRC);
    audio.preload = 'auto';
    audio.volume = 0.5;
    pool.push(audio);
  }

  function playClick() {
    try {
      const sound = pool[poolIndex];
      poolIndex = (poolIndex + 1) % POOL_SIZE;
      sound.currentTime = 0;
      const playPromise = sound.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => { });
      }
    } catch (err) {
      // Audio playback handling
    }
  }

  // Plays when clicked anywhere on the document (mouse, touchpad, touch screen)
  window.addEventListener('pointerdown', playClick, { passive: true });
}

// Photography & Videography Gallery (Filters, Video Previews, and Photo Lightbox)
function initLensGallery() {
  const filterBtns = document.querySelectorAll('.lens-filter-btn');
  const cards = document.querySelectorAll('.lens-card');
  const previewVideos = document.querySelectorAll('.lens-preview-video');

  // Filter Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-lens-filter');
      cards.forEach(card => {
        const type = card.getAttribute('data-lens-type');
        if (filter === 'all' || type === filter) {
          card.style.display = '';
          setTimeout(() => { card.style.opacity = '1'; }, 10);
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });

  // Hover video previews
  cards.forEach(card => {
    const video = card.querySelector('.lens-preview-video');
    if (video) {
      card.addEventListener('mouseenter', () => {
        video.play().catch(() => { });
      });
      card.addEventListener('mouseleave', () => {
        video.pause();
      });
    }
  });

  // IntersectionObserver for auto-playing preview videos when scrolled into view
  if (previewVideos.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const video = entry.target;
        if (entry.isIntersecting) {
          video.play().catch(() => { });
        } else {
          video.pause();
        }
      });
    }, { threshold: 0.25 });

    previewVideos.forEach(v => observer.observe(v));
  }

  // Photo Lightbox Modal
  const photoModal = document.getElementById('photo-modal');
  const photoImg = document.getElementById('photo-modal-img');
  const photoTitle = document.getElementById('photo-modal-title');
  const photoSpec = document.getElementById('photo-modal-spec');
  const photoClose = document.getElementById('photo-modal-close');

  window.openPhotoLightbox = function (src, title, spec) {
    if (!photoModal || !photoImg) return;
    photoImg.src = src;
    if (photoTitle) photoTitle.textContent = title;
    if (photoSpec) photoSpec.textContent = spec;
    photoModal.classList.add('open');
    photoModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closePhotoModal = () => {
    if (!photoModal) return;
    photoModal.classList.remove('open');
    photoModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (photoClose) photoClose.addEventListener('click', closePhotoModal);
  if (photoModal) {
    photoModal.addEventListener('click', (e) => {
      if (e.target === photoModal) closePhotoModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && photoModal && photoModal.classList.contains('open')) {
      closePhotoModal();
    }
  });
}

// All Works Showcase Page Interactivity (Multi-Category Filtering, Real-Time Search & Live Counts)
function initWorksPage() {
  const cards = document.querySelectorAll('.works-catalog-item');
  const filterTabs = document.querySelectorAll('[data-works-filter]');
  const searchInput = document.getElementById('works-search-input');
  const counterEl = document.getElementById('works-counter-number');
  const noResultsEl = document.getElementById('works-no-results');
  const resetBtn = document.getElementById('works-reset-search');

  if (!cards.length) return;

  let currentCategory = 'all';
  let currentSearch = '';

  function filterCatalog() {
    let visibleCount = 0;
    const query = currentSearch.toLowerCase().trim();

    cards.forEach(card => {
      const categories = (card.getAttribute('data-category') || '').toLowerCase().split(/\s+/);
      const title = (card.querySelector('.works-item-title')?.textContent || '').toLowerCase();
      const desc = (card.querySelector('.works-item-desc')?.textContent || '').toLowerCase();
      const client = (card.querySelector('.works-item-client')?.textContent || '').toLowerCase();
      const keywords = (card.getAttribute('data-keywords') || '').toLowerCase();

      const matchesCat = currentCategory === 'all' || categories.includes(currentCategory);
      const matchesText = !query ||
        title.includes(query) ||
        desc.includes(query) ||
        client.includes(query) ||
        keywords.includes(query);

      if (matchesCat && matchesText) {
        card.style.display = '';
        setTimeout(() => { card.style.opacity = '1'; }, 10);
        visibleCount++;
      } else {
        card.style.display = 'none';
        card.style.opacity = '0';
      }
    });

    if (counterEl) counterEl.textContent = visibleCount;
    if (noResultsEl) {
      noResultsEl.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  // Filter Tab Handlers
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategory = tab.getAttribute('data-works-filter');
      filterCatalog();
    });
  });

  // URL query parameter support (e.g. works.html?filter=commercial)
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const filterParam = urlParams.get('filter');
    if (filterParam) {
      const matchingTab = document.querySelector(`[data-works-filter="${filterParam}"]`);
      if (matchingTab) {
        filterTabs.forEach(t => t.classList.remove('active'));
        matchingTab.classList.add('active');
        currentCategory = filterParam;
        filterCatalog();
      }
    }
  } catch (err) { }

  // Search Input Handler
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value;
      filterCatalog();
    });
  }

  // Reset Button Handler
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      currentCategory = 'all';
      currentSearch = '';
      if (searchInput) searchInput.value = '';
      filterTabs.forEach(t => {
        if (t.getAttribute('data-works-filter') === 'all') t.classList.add('active');
        else t.classList.remove('active');
      });
      filterCatalog();
    });
  }

  // Keyboard accessibility: Enter or Space triggers card action
  cards.forEach(card => {
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  // Auto-play videos inside catalog cards when in view or on hover
  const catalogVideos = document.querySelectorAll('.works-catalog-item video');
  if (catalogVideos.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const vid = entry.target;
        if (entry.isIntersecting) {
          vid.play().catch(() => { });
        } else {
          vid.pause();
        }
      });
    }, { threshold: 0.25 });

    catalogVideos.forEach(v => observer.observe(v));
  }
}




