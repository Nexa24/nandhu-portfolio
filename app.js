/**
 * Client-side Interactivity for Nandhalal ps — Video Editor Portfolio
 * Real video playback, post-production metadata modals, category filtering & smooth scroll spy
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initContactForm();
  initModalClose();
  initProcessScrollSpy();
  initDynamicHomeWorks();
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

// Dynamic Home Page Selected Works Synchronizer
// Renders and replaces home page videos dynamically from LocalStorage (Admin) & Supabase Database
function initDynamicHomeWorks() {
  const vertGrid = document.getElementById('vertical-works-grid');
  const horizGrid = document.getElementById('horizontal-works-grid');
  if (!vertGrid && !horizGrid) return; // Exit if not on home page

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function getCleanCats(rawCats) {
    if (!Array.isArray(rawCats)) {
      if (typeof rawCats === 'string') rawCats = rawCats.split(/[\s,]+/);
      else rawCats = [];
    }
    return rawCats
      .filter(c => Boolean(c) && !['hide-home', 'hide-works', 'featured-slot-1', 'featured-slot-2', 'featured-slot-3'].includes(c))
      .map(c => c.toLowerCase().trim().replace(/\s+/g, '-'));
  }

  function renderCard(p, isVertical) {
    const cleanCats = getCleanCats(p.categories);
    const catAttr = cleanCats.join(' ');

    let primaryCat = 'Selected Work';
    if (cleanCats.length > 0) {
      primaryCat = cleanCats[0].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    } else if (p.category) {
      primaryCat = p.category;
    }

    const isShotAndEdited = (p.productionType || '').toLowerCase().includes('shot');
    const badgeClass = isShotAndEdited ? 'shot-edited' : 'editing-only';
    const badgeLabel = p.productionType || (isShotAndEdited ? 'Shot & Edited by Me' : 'Editing Only');
    const softwareLabel = Array.isArray(p.software) ? p.software.join(', ') : (p.software || (isVertical ? 'CapCut Desktop' : 'Adobe Premiere Pro'));
    const durationLabel = p.duration || '00:30';
    const posterUrl = p.thumbnail || p.poster || (isVertical ? 'assets/reel_1.jpg' : 'assets/work3.jpg');
    const rawVideoUrl = (p.videoUrl || p.video_url || '').trim();

    const isDirectVideo = rawVideoUrl && !rawVideoUrl.includes('<') && (
      rawVideoUrl.endsWith('.mp4') || rawVideoUrl.includes('.mp4') || rawVideoUrl.includes('supabase.co') || rawVideoUrl.endsWith('.webm')
    );

    const mediaClass = isVertical ? 'grid-reel-video' : 'grid-horizontal-video';
    let mediaHtml = '';

    if (isDirectVideo) {
      mediaHtml = `<video class="${mediaClass}" src="${escapeHtml(rawVideoUrl)}" poster="${escapeHtml(posterUrl)}" muted playsinline loop preload="metadata"></video>`;
    } else {
      mediaHtml = `<img class="${mediaClass}" src="${escapeHtml(posterUrl)}" alt="${escapeHtml(p.title)}" loading="lazy" style="width:100%;height:100%;object-fit:cover;">`;
    }

    if (isVertical) {
      return `
        <article class="work-card-reel" data-project-id="${escapeHtml(p.id)}"
          data-categories="${escapeHtml(catAttr)}" tabindex="0"
          role="button" aria-label="Play ${escapeHtml(p.title)}" onclick="openVideoPlayer('${escapeHtml(p.id)}')">
          <div class="work-reel-media">
            ${mediaHtml}
            <div class="card-play-hover" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </div>
          </div>
          <div class="work-reel-info">
            <div class="work-card-meta-row">
              <span class="work-reel-tag">${escapeHtml(primaryCat)}</span>
              <span class="prod-type-badge ${badgeClass}">${escapeHtml(badgeLabel)}</span>
            </div>
            <h3 class="work-reel-title" style="margin-top: 6px;">${escapeHtml(p.title)}</h3>
            <p class="work-card-desc-snippet">${escapeHtml(p.description || '')}</p>
            <div class="work-card-meta-row" style="margin-top: 10px;">
              <span class="work-card-software-tag">${escapeHtml(softwareLabel)}</span>
              <span class="work-card-duration-tag">${escapeHtml(durationLabel)}</span>
            </div>
          </div>
        </article>
      `;
    } else {
      return `
        <article class="work-card-horizontal" data-project-id="${escapeHtml(p.id)}"
          data-categories="${escapeHtml(catAttr)}" tabindex="0" role="button"
          aria-label="Play ${escapeHtml(p.title)}" onclick="openVideoPlayer('${escapeHtml(p.id)}')">
          <div class="work-horizontal-media">
            ${mediaHtml}
            <div class="card-play-hover" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </div>
          </div>
          <div class="work-horizontal-info">
            <div class="work-horizontal-header">
              <span class="work-horizontal-tag">${escapeHtml(primaryCat)}</span>
              <span class="prod-type-badge ${badgeClass}">${escapeHtml(badgeLabel)}</span>
            </div>
            <h4 class="work-horizontal-title">${escapeHtml(p.title)}</h4>
            <p class="work-horizontal-desc">${escapeHtml(p.description || '')}</p>
            <div class="work-horizontal-footer">
              <span class="work-card-software-tag">${escapeHtml(softwareLabel)}</span>
              <span class="work-card-duration-tag">${escapeHtml(durationLabel)}</span>
            </div>
          </div>
        </article>
      `;
    }
  }

  function renderProjectsToHome(list) {
    if (!Array.isArray(list) || !list.length) return;

    // 1. Register projects into videoProjectsData for player
    list.forEach(p => {
      if (p.id) {
        videoProjectsData[p.id] = {
          title: p.title,
          desc: p.description,
          videoUrl: p.videoUrl || p.video_url,
          poster: p.thumbnail || p.poster,
          isVertical: p.aspectRatio === '9:16' || p.isVertical === true || p.is_vertical === true,
          specs: p.specs || [p.aspectRatio || '9:16', p.duration || '00:30', p.productionType || 'Shot & Edited by Me'],
          breakdown: p.breakdown || []
        };
      }
    });

    // 2. Filter projects to display on home (exclude drafts and showOnHome === false)
    const homeList = list.filter(p => p.showOnHome !== false && p.visible !== false && p.status !== 'draft');

    // 3. Separate into vertical (9:16) and horizontal (16:9)
    const verticals = homeList.filter(p => p.aspectRatio === '9:16' || p.isVertical === true || p.is_vertical === true);
    const horizontals = homeList.filter(p => !(p.aspectRatio === '9:16' || p.isVertical === true || p.is_vertical === true));

    // 4. Update DOM containers
    if (vertGrid && verticals.length > 0) {
      vertGrid.innerHTML = verticals.map(p => renderCard(p, true)).join('');
    }

    if (horizGrid && horizontals.length > 0) {
      horizGrid.innerHTML = horizontals.map(p => renderCard(p, false)).join('');
    }

    // 5. Update category pill counts
    const allPills = document.querySelectorAll('.category-pill-btn');
    if (allPills.length > 0) {
      allPills.forEach(pill => {
        const cat = pill.getAttribute('data-category');
        const countSpan = pill.querySelector('.category-pill-count');
        if (countSpan) {
          if (cat === 'all') {
            countSpan.textContent = homeList.length;
          } else {
            const count = homeList.filter(p => {
              const cats = getCleanCats(p.categories);
              return cats.includes(cat);
            }).length;
            countSpan.textContent = count;
          }
        }
      });
    }

    // 6. Refresh category filters and autoplay observers
    if (typeof window.refreshVideoFilters === 'function') {
      window.refreshVideoFilters();
    }
    if (typeof initAutoPlayVisibleVideos === 'function') {
      initAutoPlayVisibleVideos();
    }
  }

  // Initial immediate synchronous render from localStorage or default PORTFOLIO_DATA
  let initialList = [];
  try {
    const raw = localStorage.getItem('nandhu_admin_portfolio');
    if (raw) initialList = JSON.parse(raw);
  } catch (e) {}

  if ((!initialList || !initialList.length) && window.PORTFOLIO_DATA && Array.isArray(window.PORTFOLIO_DATA.projects)) {
    initialList = window.PORTFOLIO_DATA.projects;
  }

  if (initialList && initialList.length > 0) {
    renderProjectsToHome(initialList);
  }

  // Background Cloud Sync from Supabase
  fetch('https://npswzpmqdsxvqkndtvav.supabase.co/rest/v1/portfolio_projects?select=*&status=eq.published&order=sort_order.asc', {
    headers: {
      'apikey': 'sb_publishable_LbI_vgi8e9baElyLznZjXA_1nCBK0XL',
      'Authorization': 'Bearer sb_publishable_LbI_vgi8e9baElyLznZjXA_1nCBK0XL'
    }
  })
  .then(res => res.ok ? res.json() : [])
  .then(data => {
    if (Array.isArray(data) && data.length > 0) {
      const mapped = data.map(r => {
        const rawCats = Array.isArray(r.categories) ? r.categories : [];
        const showOnHome = !rawCats.includes('hide-home');
        const showOnWorks = !rawCats.includes('hide-works');
        let featuredSlot = 'none';
        if (rawCats.includes('featured-slot-1')) featuredSlot = '1';
        else if (rawCats.includes('featured-slot-2')) featuredSlot = '2';
        else if (rawCats.includes('featured-slot-3')) featuredSlot = '3';
        const cleanCats = rawCats.filter(c => !['hide-home', 'hide-works', 'featured-slot-1', 'featured-slot-2', 'featured-slot-3'].includes(c));

        return {
          id: r.id,
          title: r.title,
          description: r.description || '',
          thumbnail: r.poster || '',
          poster: r.poster || '',
          videoUrl: r.video_url || '',
          aspectRatio: r.aspect_ratio || (r.is_vertical ? '9:16' : '16:9'),
          isVertical: Boolean(r.is_vertical || r.aspect_ratio === '9:16'),
          categories: cleanCats,
          productionType: r.production_type || 'Shot & Edited by Me',
          software: r.software ? (typeof r.software === 'string' ? r.software.split(',').map(s => s.trim()) : r.software) : ['CapCut Desktop'],
          duration: r.duration || '00:30',
          featured: Boolean(r.featured) || featuredSlot !== 'none',
          featuredSlot: featuredSlot,
          showOnHome: showOnHome,
          showOnWorks: showOnWorks,
          sortOrder: r.sort_order || 0
        };
      });

      localStorage.setItem('nandhu_admin_portfolio', JSON.stringify(mapped));
      renderProjectsToHome(mapped);
    }
  })
  .catch(e => console.warn('Supabase home sync error:', e));

  // Real-time cross-tab synchronization:
  // When user edits/saves in Admin tab, Home tab updates instantly!
  window.addEventListener('storage', (e) => {
    if (e.key === 'nandhu_admin_portfolio' && e.newValue) {
      try {
        const updated = JSON.parse(e.newValue);
        if (Array.isArray(updated)) {
          renderProjectsToHome(updated);
        }
      } catch (err) {}
    }
  });
}

// Smart Project Category Filtering System
function initVideoFilters() {
  const filterBtns = document.querySelectorAll('.category-pill-btn');
  const statusBar = document.getElementById('category-status-bar');
  const statusName = document.getElementById('category-status-name');
  const directLink = document.getElementById('category-direct-page-link');
  const verticalHeading = document.getElementById('vertical-reels-heading-wrap');
  const horizontalHeading = document.getElementById('horizontal-showcase-heading-wrap');
  const emptyState = document.getElementById('selected-works-empty-state');

  if (!filterBtns.length) return;

  let currentCategory = 'all';

  function applyCategory(catSlug, updateUrl = true) {
    const slug = (catSlug || 'all').toLowerCase().trim();
    currentCategory = slug;

    // Dynamically query current cards in DOM so newly rendered/replaced videos are captured
    const reelCards = document.querySelectorAll('.work-card-reel');
    const horizCards = document.querySelectorAll('.work-card-horizontal');

    // 1. Update Active Pill
    let activeBtn = null;
    filterBtns.forEach(btn => {
      const btnCat = btn.getAttribute('data-category');
      if (btnCat === slug) {
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        activeBtn = btn;
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      }
    });

    // Scroll active pill into view smoothly on mobile
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }

    // 2. Filter Reel Cards
    let visibleReels = 0;
    reelCards.forEach(card => {
      const cardCats = (card.getAttribute('data-categories') || '').split(/\s+/);
      if (slug === 'all' || cardCats.includes(slug)) {
        card.style.display = '';
        card.style.opacity = '1';
        visibleReels++;
      } else {
        card.style.display = 'none';
        card.style.opacity = '0';
      }
    });

    // 3. Filter Horizontal Cards
    let visibleHoriz = 0;
    horizCards.forEach(card => {
      const cardCats = (card.getAttribute('data-categories') || '').split(/\s+/);
      if (slug === 'all' || cardCats.includes(slug)) {
        card.style.display = '';
        card.style.opacity = '1';
        visibleHoriz++;
      } else {
        card.style.display = 'none';
        card.style.opacity = '0';
      }
    });

    const totalVisible = visibleReels + visibleHoriz;

    // 4. Toggle Section Sub-Headings
    if (verticalHeading) {
      verticalHeading.style.display = visibleReels > 0 ? '' : 'none';
    }
    if (horizontalHeading) {
      horizontalHeading.style.display = visibleHoriz > 0 ? '' : 'none';
    }

    // 5. Toggle Empty State
    if (emptyState) {
      emptyState.style.display = totalVisible === 0 ? 'block' : 'none';
    }

    // 6. Update Status Feedback & Dedicated Page Link
    if (statusBar && directLink) {
      if (slug === 'all') {
        statusBar.style.display = 'none';
      } else {
        const catName = activeBtn ? activeBtn.querySelector('span:first-child').textContent : slug;
        if (statusName) statusName.textContent = `${catName} (${totalVisible} projects)`;
        directLink.href = `work/${slug}/`;
        directLink.setAttribute('aria-label', `Open dedicated shareable portfolio page for ${catName}`);
        statusBar.style.display = 'flex';
      }
    }

    // 7. Update URL Hash without Page Reload
    if (updateUrl && history.replaceState) {
      const newHash = slug === 'all' ? '#works' : `#category=${slug}`;
      history.replaceState(null, '', newHash);
    }
  }

  window.refreshVideoFilters = function() {
    applyCategory(currentCategory, false);
  };

  // Bind click handlers to filter pills
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetCat = btn.getAttribute('data-category');
      applyCategory(targetCat, true);
    });
  });

  // Check URL on load for deep-linked category (?cat=... or #category=...)
  const urlParams = new URLSearchParams(window.location.search);
  const catQuery = urlParams.get('cat') || urlParams.get('category');
  const hashMatch = window.location.hash.match(/category=([a-z0-9-]+)/i);
  const initialCategory = catQuery || (hashMatch ? hashMatch[1] : 'all');

  if (initialCategory && initialCategory !== 'all') {
    applyCategory(initialCategory, false);
  }
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
   STRUCTURED PORTFOLIO PROJECTS DATA
   Easily editable repository for vertical and horizontal video projects.
   ========================================================================== */
const verticalProjects = [
  {
    id: 'video1',
    title: 'Urban Sound & Brand Spot',
    category: 'Commercial Reels',
    description: 'Product promotions and dynamic brand advertisements with high-retention pacing, rhythmic cuts, and tailored sound design.',
    thumbnail: 'assets/reel_1.jpg',
    videoUrl: 'assets/video1.mp4',
    aspectRatio: '9:16',
    productionType: 'Shot & Edited by Me',
    software: 'CapCut Desktop',
    duration: '00:30',
    featured: true
  },
  {
    id: 'video2',
    title: 'Kinetic Travel & Movement',
    category: 'Fast-Cut Edits',
    description: 'High-energy editing with speed ramps, dynamic transitions, punchy sound design, and microsecond beat alignment.',
    thumbnail: 'assets/reel_travel.jpg',
    videoUrl: 'assets/video2.mp4',
    aspectRatio: '9:16',
    productionType: 'Editing Only',
    software: 'CapCut Desktop',
    duration: '00:25',
    featured: true
  },
  {
    id: 'video3',
    title: 'Creator Persona & Intro',
    category: 'Self-Presentation Videos',
    description: 'Personal branding and creator introduction video highlighting clear visual hierarchy, authentic framing, and storytelling.',
    thumbnail: 'assets/reel_louvre.jpg',
    videoUrl: 'assets/video3.mp4',
    aspectRatio: '9:16',
    productionType: 'Shot & Edited by Me',
    software: 'CapCut Desktop',
    duration: '00:45',
    featured: true
  },
  {
    id: 'video4',
    title: 'Educational Insights & Dialogue',
    category: 'Talking Head Videos',
    description: 'Personality-driven video editing featuring crisp audio cleanup, subtle framing shifts, captions, and educational flow.',
    thumbnail: 'assets/reel_2.jpg',
    videoUrl: 'assets/video4.mp4',
    aspectRatio: '9:16',
    productionType: 'Editing Only',
    software: 'Adobe Premiere Pro',
    duration: '01:00',
    featured: true
  },
  {
    id: 'video5',
    title: 'Atmospheric City Reflections',
    category: 'Creative & Cinematic Edits',
    description: 'Visually engaging cinematic storytelling captured on mobile and edited with atmospheric pacing and moody color tones.',
    thumbnail: 'assets/work6.jpg',
    videoUrl: 'assets/video5.mp4',
    aspectRatio: '9:16',
    productionType: 'Shot & Edited by Me',
    software: 'CapCut Desktop',
    duration: '00:35',
    featured: true
  },
  {
    id: 'video6',
    title: 'Nocturnal Visual Rhythm',
    category: 'Recent Editing Projects',
    description: 'Recent creative edit with rhythm-matched cuts, customized transitions, and modern social format finishing.',
    thumbnail: 'assets/work1.jpg',
    videoUrl: 'assets/video6.mp4',
    aspectRatio: '9:16',
    productionType: 'Editing Only',
    software: 'CapCut Desktop',
    duration: '00:28',
    featured: true
  }
];

const horizontalProjects = [
  {
    id: 'video7',
    title: 'Long-Form Storytelling & Pacing',
    category: 'YouTube Videos',
    description: 'Structured YouTube video pacing, engaging b-roll placement, audio leveling, and viewer-retention structuring.',
    thumbnail: 'assets/work3.jpg',
    videoUrl: 'assets/video7.mp4',
    aspectRatio: '16:9',
    productionType: 'Editing Only',
    software: 'CapCut Desktop',
    duration: '04:15',
    featured: true
  },
  {
    id: 'video8',
    title: 'Brand Showcase & Product Visuals',
    category: 'Horizontal Commercial Videos',
    description: 'Widescreen commercial edit balancing product highlights, clean motion graphics, and punchy promotional timing.',
    thumbnail: 'assets/work5.jpg',
    videoUrl: 'assets/video8.mp4',
    aspectRatio: '16:9',
    productionType: 'Shot & Edited by Me',
    software: 'CapCut Desktop',
    duration: '01:20',
    featured: true
  },
  {
    id: 'video9',
    title: 'Cinematic Atmosphere & Field Reel',
    category: 'Cinematic / Creative Video Projects',
    description: 'Mobile-captured cinematic project exploring natural landscapes, light transitions, and evocative soundscapes.',
    thumbnail: 'assets/work2.jpg',
    videoUrl: 'assets/video9.mp4',
    aspectRatio: '16:9',
    productionType: 'Shot & Edited by Me',
    software: 'Adobe Premiere Pro',
    duration: '02:10',
    featured: true
  }
];

/* ==========================================================================
   VIDEO DATA STORE (POST-PRODUCTION METADATA)
   ========================================================================== */
const videoProjectsData = {
  // Showreel & Creator Intro
  showreel: {
    title: 'Nandhalal P S — Video Editor & Content Creator Reel',
    desc: 'A dynamic showcase of rhythmic cuts, speed ramps, sound design, color styling, and visual storytelling across commercial videos and vertical reels.',
    videoUrl: 'assets/video1.mp4',
    poster: 'assets/nandhu_headphone.png',
    specs: ['Creator Reel', '1080p / 4K', 'CapCut & Premiere Pro', 'Sound Design'],
    breakdown: [
      { key: 'Role', val: 'Video Editor & Videographer' },
      { key: 'Primary Tool', val: 'CapCut Desktop' },
      { key: 'Focus', val: 'Fast-Paced Rhythmic Storytelling & Color Grading' }
    ]
  },

  // 6 Vertical Showcase Projects (9:16)
  video1: {
    title: 'Urban Sound & Brand Spot',
    desc: 'Product promotions and dynamic brand advertisements with high-retention pacing, rhythmic cuts, and tailored sound design.',
    videoUrl: 'assets/video1.mp4',
    poster: 'assets/reel_1.jpg',
    isVertical: true,
    specs: ['9:16 Vertical Reel', '00:30', 'Commercial Reels', 'Shot & Edited by Me'],
    breakdown: [
      { key: 'Production Type', val: 'Shot & Edited by Me' },
      { key: 'Software', val: 'CapCut Desktop' },
      { key: 'Focus', val: 'Product staging, transient sound sync & brand timing' }
    ],
    tags: ['Commercial', 'Reels', 'Shot & Edited', 'Sound Design']
  },
  video2: {
    title: 'Kinetic Travel & Movement',
    desc: 'High-energy fast-cut edit with rhythmic speed ramps, seamless transitions, punchy sound design, and microsecond beat alignment.',
    videoUrl: 'assets/video2.mp4',
    poster: 'assets/reel_travel.jpg',
    isVertical: true,
    specs: ['9:16 Vertical Reel', '00:25', 'Fast-Cut Edits', 'Editing Only'],
    breakdown: [
      { key: 'Production Type', val: 'Editing Only' },
      { key: 'Software', val: 'CapCut Desktop' },
      { key: 'Technique', val: 'Speed Ramps, Whip Transitions & Impact Audio' }
    ],
    tags: ['Fast-Cut', 'Transitions', 'Editing Only', 'Rhythm']
  },
  video3: {
    title: 'Creator Persona & Intro',
    desc: 'Personal branding and creator introduction video highlighting clear visual hierarchy, authentic framing, and storytelling.',
    videoUrl: 'assets/video3.mp4',
    poster: 'assets/reel_louvre.jpg',
    isVertical: true,
    specs: ['9:16 Vertical Reel', '00:45', 'Self-Presentation', 'Shot & Edited by Me'],
    breakdown: [
      { key: 'Production Type', val: 'Shot & Edited by Me' },
      { key: 'Software', val: 'CapCut Desktop' },
      { key: 'Style', val: 'Creator Introduction & Visual Narrative' }
    ],
    tags: ['Creator', 'Self-Presentation', 'Shot & Edited', 'Branding']
  },
  video4: {
    title: 'Educational Insights & Dialogue',
    desc: 'Personality-driven talking-head video editing with voice clarity optimization, animated captions, and subtle zoom emphasis.',
    videoUrl: 'assets/video4.mp4',
    poster: 'assets/reel_2.jpg',
    isVertical: true,
    specs: ['9:16 Vertical Reel', '01:00', 'Talking Head', 'Editing Only'],
    breakdown: [
      { key: 'Production Type', val: 'Editing Only' },
      { key: 'Software', val: 'Adobe Premiere Pro' },
      { key: 'Audio & Text', val: 'Dialogue Cleanup, EQ & Animated Subtitles' }
    ],
    tags: ['Talking Head', 'Educational', 'Premiere Pro', 'Subtitles']
  },
  video5: {
    title: 'Atmospheric City Reflections',
    desc: 'Visually engaging cinematic storytelling captured on mobile and edited with atmospheric pacing and moody color tones.',
    videoUrl: 'assets/video5.mp4',
    poster: 'assets/work6.jpg',
    isVertical: true,
    specs: ['9:16 Vertical Reel', '00:35', 'Cinematic Edits', 'Shot & Edited by Me'],
    breakdown: [
      { key: 'Production Type', val: 'Shot & Edited by Me' },
      { key: 'Software', val: 'CapCut Desktop' },
      { key: 'Camera', val: 'Shot on iPhone · 4K Mobile Video' }
    ],
    tags: ['Cinematic', 'Shot & Edited', 'Mobile Video', 'Atmospheric']
  },
  video6: {
    title: 'Nocturnal Visual Rhythm',
    desc: 'Recent creative edit with rhythm-matched cuts, customized transitions, and modern social format finishing.',
    videoUrl: 'assets/video6.mp4',
    poster: 'assets/work1.jpg',
    isVertical: true,
    specs: ['9:16 Vertical Reel', '00:28', 'Recent Projects', 'Editing Only'],
    breakdown: [
      { key: 'Production Type', val: 'Editing Only' },
      { key: 'Software', val: 'CapCut Desktop' },
      { key: 'Finishing', val: 'Color Grading & Beat Synchronization' }
    ],
    tags: ['Recent', 'Editing Only', 'Beat Sync', 'CapCut']
  },

  // 3 Horizontal Showcase Projects (16:9)
  video7: {
    title: 'Long-Form Storytelling & Pacing',
    desc: 'Structured YouTube video editing balancing storytelling arc, b-roll cutaways, dynamic sound design, and audience retention pacing.',
    videoUrl: 'assets/video7.mp4',
    poster: 'assets/work3.jpg',
    isVertical: false,
    specs: ['16:9 Widescreen', '04:15', 'YouTube Videos', 'Editing Only'],
    breakdown: [
      { key: 'Production Type', val: 'Editing Only' },
      { key: 'Software', val: 'CapCut Desktop' },
      { key: 'Format', val: '16:9 Long-Form / YouTube' }
    ],
    tags: ['YouTube', 'Long-Form', 'Editing Only', 'Retention']
  },
  video8: {
    title: 'Brand Showcase & Product Visuals',
    desc: 'Widescreen commercial production balancing product highlights, clean motion graphics, and punchy promotional timing.',
    videoUrl: 'assets/video8.mp4',
    poster: 'assets/work5.jpg',
    isVertical: false,
    specs: ['16:9 Widescreen', '01:20', 'Commercial Video', 'Shot & Edited by Me'],
    breakdown: [
      { key: 'Production Type', val: 'Shot & Edited by Me' },
      { key: 'Software', val: 'CapCut Desktop' },
      { key: 'Format', val: '16:9 Commercial Showcase' }
    ],
    tags: ['Commercial', 'Widescreen', 'Shot & Edited', 'Product']
  },
  video9: {
    title: 'Cinematic Atmosphere & Field Reel',
    desc: 'Atmospheric visual piece captured on mobile and edited with cinematic pacing, evocative soundscapes, and color grading.',
    videoUrl: 'assets/video9.mp4',
    poster: 'assets/work2.jpg',
    isVertical: false,
    specs: ['16:9 Widescreen', '02:10', 'Cinematic Projects', 'Shot & Edited by Me'],
    breakdown: [
      { key: 'Production Type', val: 'Shot & Edited by Me' },
      { key: 'Software', val: 'Adobe Premiere Pro' },
      { key: 'Camera & Shooting', val: 'Shot on iPhone · Natural Light' }
    ],
    tags: ['Cinematic', 'Shot & Edited', 'iPhone Video', 'Widescreen']
  },

  // Photography & Videography Showcase Items
  video10: {
    title: 'Echoes of the Open Horizon',
    desc: 'Mobile-captured landscape visual exploring natural light, horizon geometries, and wide golden hour illumination.',
    videoUrl: 'assets/video10.mp4',
    poster: 'assets/work2.jpg',
    specs: ['Mobile Video', 'Shot on iPhone', '4K 60fps', 'Natural Light'],
    breakdown: [
      { key: 'Shooting Device', val: 'iPhone (Handheld)' },
      { key: 'Editing & Grade', val: 'CapCut Desktop & Premiere Pro' },
      { key: 'Focus', val: 'Natural Landscape Geometry & Light' }
    ]
  },
  video11: {
    title: 'Urban Cadence & Pace',
    desc: 'Dynamic mobile videography exploring urban textures, architectural elements, and handheld tracking movement.',
    videoUrl: 'assets/video11.mp4',
    poster: 'assets/proc3.jpg',
    specs: ['Mobile Video', 'Shot on iPhone', '4K 60fps', 'Handheld'],
    breakdown: [
      { key: 'Shooting Device', val: 'iPhone' },
      { key: 'Editing', val: 'CapCut Desktop' },
      { key: 'Focus', val: 'Street Rhythm & Movement Pacing' }
    ]
  },
  video12: {
    title: 'Night City Glow & Movement',
    desc: 'Handheld mobile night shoot capturing neon reflections, low-light street mood, and rhythmic visual movement.',
    videoUrl: 'assets/video12.mp4',
    poster: 'assets/reel_5.jpg',
    specs: ['Mobile Video', 'Shot on iPhone', 'Low-Light', 'Night Mode'],
    breakdown: [
      { key: 'Shooting Device', val: 'iPhone' },
      { key: 'Editing & Grade', val: 'CapCut Desktop' },
      { key: 'Focus', val: 'Night Ambient Light & Reflection Pacing' }
    ]
  },
  work1: {
    title: 'Porsche Nocturne — Cyberpunk Night Commercial Spot',
    desc: 'High-energy commercial edit featuring rapid speed ramps, custom engine audio design, neon glow color grading, and razor-sharp cuts synced to industrial electronic percussion.',
    videoUrl: 'assets/video1.mp4',
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
    videoUrl: 'assets/video6.mp4',
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
    videoUrl: 'assets/video7.mp4',
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
    videoUrl: 'assets/video8.mp4',
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
    videoUrl: 'assets/video8.mp4',
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
    videoUrl: 'assets/video5.mp4',
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
    videoUrl: 'assets/video12.mp4',
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
    videoUrl: 'assets/video9.mp4',
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
    videoUrl: 'assets/video2.mp4',
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
    videoUrl: 'assets/video1.mp4',
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
    videoUrl: 'assets/video3.mp4',
    poster: 'assets/reel_3.jpg',
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
    videoUrl: 'assets/video1.mp4',
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
    videoUrl: 'assets/video5.mp4',
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
    videoUrl: 'assets/video5.mp4',
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
    videoUrl: 'assets/video1.mp4',
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
    videoUrl: 'assets/video2.mp4',
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

// Aliases for seamless backward compatibility across all video keys
videoProjectsData.showreel = videoProjectsData.video1;
videoProjectsData.reel_travel = videoProjectsData.video1;
videoProjectsData.reel_louvre = videoProjectsData.video2;
videoProjectsData.reel_retro = videoProjectsData.video3;
videoProjectsData.vert_1 = videoProjectsData.video1;
videoProjectsData.vert_2 = videoProjectsData.video2;
videoProjectsData.vert_3 = videoProjectsData.video3;
videoProjectsData.vert_4 = videoProjectsData.video4;
videoProjectsData.vert_5 = videoProjectsData.video5;
videoProjectsData.vert_6 = videoProjectsData.video6;
videoProjectsData.horiz_1 = videoProjectsData.video7;
videoProjectsData.horiz_2 = videoProjectsData.video8;
videoProjectsData.horiz_3 = videoProjectsData.video9;
videoProjectsData.desert_motion = videoProjectsData.video10;
videoProjectsData.mechanical_cadence = videoProjectsData.video11;
videoProjectsData.urban_rhythm = videoProjectsData.video12;

// Dynamic Cloud / Local sync for public portfolio videos
(function initDynamicPortfolioSync() {
  try {
    const cached = JSON.parse(localStorage.getItem('nandhu_admin_portfolio') || 'null');
    if (Array.isArray(cached)) {
      cached.forEach(p => {
        if (p.id) {
          videoProjectsData[p.id] = {
            title: p.title,
            desc: p.description,
            videoUrl: p.videoUrl,
            poster: p.thumbnail,
            isVertical: p.aspectRatio === '9:16',
            specs: p.specs || [p.aspectRatio, p.duration, p.productionType],
            breakdown: p.breakdown || []
          };
        }
      });
    }
  } catch (e) {}

  if (window.supabase && window.supabase.createClient) {
    try {
      const sb = window.supabase.createClient('https://npswzpmqdsxvqkndtvav.supabase.co', 'sb_publishable_LbI_vgi8e9baElyLznZjXA_1nCBK0XL');
      sb.from('portfolio_projects').select('*').eq('status', 'published').then(({ data, error }) => {
        if (!error && Array.isArray(data) && data.length > 0) {
          data.forEach(p => {
            videoProjectsData[p.id] = {
              title: p.title,
              desc: p.description,
              videoUrl: p.video_url,
              poster: p.poster,
              isVertical: p.is_vertical || p.aspect_ratio === '9:16',
              specs: [p.aspect_ratio, p.duration, p.production_type],
              breakdown: []
            };
          });
        }
      }).catch(() => {});
    } catch (e) {}
  }
})();

window.openVideoPlayer = function (id) {
  const data = videoProjectsData[id] || (window.PORTFOLIO_DATA && typeof window.PORTFOLIO_DATA.getProjectById === 'function' ? window.PORTFOLIO_DATA.getProjectById(id) : null);
  if (!data) return;

  const modal = document.getElementById('video-modal');
  const modalWindow = modal ? modal.querySelector('.modal-window') : null;
  const videoPlayer = document.getElementById('modal-video-player');
  const videoSrc = document.getElementById('modal-video-src');
  const specsContainer = document.getElementById('modal-specs');
  const breakdownContainer = document.getElementById('modal-breakdown');
  const embedContainer = document.getElementById('modal-embed-container');
  if (!modal || !videoPlayer) return;

  // Toggle 9:16 vertical ratio styling for reels
  if (modalWindow) {
    if (data.isVertical) {
      modalWindow.classList.add('vertical-reel-player');
    } else {
      modalWindow.classList.remove('vertical-reel-player');
    }
  }

  const rawSource = (data.videoUrl || '').trim();
  const isWistia = rawSource.includes('wistia') || rawSource.includes('wistia-player') || rawSource.includes('fast.wistia');
  const isEmbedSnippet = rawSource.includes('<') && rawSource.includes('>');
  const isYouTube = rawSource.includes('youtube.com') || rawSource.includes('youtu.be');
  const isVimeo = rawSource.includes('vimeo.com');

  if (isWistia || isEmbedSnippet || isYouTube || isVimeo) {
    // Hide native HTML5 video player
    videoPlayer.pause();
    videoPlayer.style.display = 'none';

    if (embedContainer) {
      embedContainer.style.display = 'block';

      if (isWistia) {
        // Ensure Wistia core script is loaded
        if (!document.getElementById('wistia-core-script')) {
          const wScript = document.createElement('script');
          wScript.id = 'wistia-core-script';
          wScript.src = 'https://fast.wistia.com/player.js';
          wScript.async = true;
          document.head.appendChild(wScript);
        }

        if (isEmbedSnippet) {
          // Full user-pasted snippet like <script ...></script><wistia-player ...>
          embedContainer.innerHTML = rawSource;
          embedContainer.querySelectorAll('script').forEach(oldScript => {
            const newScript = document.createElement('script');
            Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
            newScript.appendChild(document.createTextNode(oldScript.innerHTML));
            oldScript.parentNode.replaceChild(newScript, oldScript);
          });
        } else {
          // Extract Wistia ID from URL or ID string
          let mediaId = rawSource;
          const match = rawSource.match(/medias\/([a-zA-Z0-9]+)/) || rawSource.match(/iframe\/([a-zA-Z0-9]+)/) || rawSource.match(/([a-zA-Z0-9]{8,12})/);
          if (match) mediaId = match[1];

          embedContainer.innerHTML = `
            <style>
              wistia-player[media-id='${mediaId}']:not(:defined) {
                background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/${mediaId}/swatch');
                display: block;
                filter: blur(5px);
                padding-top: ${data.isVertical ? '177.78%' : '56.25%'};
              }
            </style>
            <wistia-player media-id="${mediaId}" aspect="${data.isVertical ? '0.5625' : '1.7777777777777777'}"></wistia-player>
          `;
          const embedScript = document.createElement('script');
          embedScript.src = `https://fast.wistia.com/embed/${mediaId}.js`;
          embedScript.async = true;
          embedScript.type = 'module';
          document.head.appendChild(embedScript);
        }
      } else if (isYouTube) {
        let ytId = '';
        if (rawSource.includes('youtu.be/')) ytId = rawSource.split('youtu.be/')[1].split('?')[0];
        else if (rawSource.includes('watch?v=')) ytId = rawSource.split('watch?v=')[1].split('&')[0];
        else if (rawSource.includes('embed/')) ytId = rawSource.split('embed/')[1].split('?')[0];
        embedContainer.innerHTML = `<iframe src="https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="width:100%; height:100%; min-height:420px; border-radius:12px;"></iframe>`;
      } else if (isVimeo) {
        const vimeoId = rawSource.split('vimeo.com/')[1]?.split('?')[0] || '';
        embedContainer.innerHTML = `<iframe src="https://player.vimeo.com/video/${vimeoId}?autoplay=1" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen style="width:100%; height:100%; min-height:420px; border-radius:12px;"></iframe>`;
      } else {
        embedContainer.innerHTML = rawSource;
      }
    }
  } else {
    // Direct video file (MP4, WebM, Supabase storage public URL)
    if (embedContainer) {
      embedContainer.style.display = 'none';
      embedContainer.innerHTML = '';
    }
    videoPlayer.style.display = 'block';
    videoSrc.src = rawSource;
    videoPlayer.poster = data.poster || '';
    videoPlayer.load();

    // Graceful fallback if video hasn't been uploaded yet
    videoPlayer.dataset.fallbackTried = '';
    videoPlayer.onerror = function () {
      if (!videoPlayer.dataset.fallbackTried) {
        videoPlayer.dataset.fallbackTried = 'true';
        videoSrc.src = 'assets/video1.mp4';
        videoPlayer.load();
        videoPlayer.play().catch(() => {});
      }
    };
    videoPlayer.play().catch(() => {});
  }

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
    const embedContainer = document.getElementById('modal-embed-container');
    if (embedContainer) {
      embedContainer.innerHTML = '';
      embedContainer.style.display = 'none';
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
    USD: { symbol: '$', code: 'USD', p1: '< $250', p2: '$250 – $1,000', p3: '$1,000+' },
    EUR: { symbol: '€', code: 'EUR', p1: '< €240', p2: '€240 – €950', p3: '€950+' },
    GBP: { symbol: '£', code: 'GBP', p1: '< £200', p2: '£200 – £800', p3: '£800+' },
    INR: { symbol: '₹', code: 'INR', p1: '< ₹20,000', p2: '₹20,000 – ₹80,000', p3: '₹80,000+' }
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

    // Synchronize inquiry with Private Admin Dashboard storage
    try {
      const enqList = JSON.parse(localStorage.getItem('nandhu_admin_enquiries') || '[]');
      const newAdminEnq = {
        id: 'enq-' + Date.now(),
        name: name,
        email: email,
        phone: customAmount ? `${currency} ${customAmount}` : '',
        reason: reason,
        budget: budgetDisplay,
        message: message,
        date: new Date().toISOString().replace('T', ' ').substring(0, 16),
        status: 'New'
      };
      enqList.unshift(newAdminEnq);
      localStorage.setItem('nandhu_admin_enquiries', JSON.stringify(enqList));

      // Also log activity in admin
      const logs = JSON.parse(localStorage.getItem('nandhu_admin_activity_logs') || '[]');
      logs.unshift({
        id: 'log-' + Date.now(),
        text: `New website brief from ${name} (${reason}, ${budgetDisplay})`,
        time: 'Just now',
        icon: 'inbox'
      });
      if (logs.length > 25) logs.pop();
      localStorage.setItem('nandhu_admin_activity_logs', JSON.stringify(logs));

      // Direct cloud sync to Supabase enquiries database
      if (window.supabase && window.supabase.createClient) {
        try {
          const sbClient = window.supabase.createClient('https://npswzpmqdsxvqkndtvav.supabase.co', 'sb_publishable_LbI_vgi8e9baElyLznZjXA_1nCBK0XL');
          sbClient.from('enquiries').insert([{
            id: newAdminEnq.id,
            name: newAdminEnq.name,
            email: newAdminEnq.email,
            phone: newAdminEnq.phone,
            reason: newAdminEnq.reason,
            budget: newAdminEnq.budget,
            message: newAdminEnq.message,
            status: 'New'
          }]).then(({ error }) => {
            if (error) console.warn('Supabase enquiry sync warning:', error);
          }).catch(e => console.warn('Supabase enquiry error:', e));

          // Also push activity log
          sbClient.from('activity_logs').insert([{
            id: 'log-' + Date.now(),
            text: `New website brief from ${name} (${reason})`,
            icon: 'inbox'
          }]).catch(() => {});
        } catch (sbErr) {
          console.warn('Supabase init error:', sbErr);
        }
      }
    } catch (e) {
      console.warn('Could not sync enquiry to admin store:', e);
    }

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
    'a Content Creator.',
    'an iPhone Videographer.'
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
  const gridVideos = document.querySelectorAll('.grid-reel-video, .grid-horizontal-video');
  if (!gridVideos.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const video = entry.target;
      const card = video.closest('.work-card-reel, .work-card-horizontal');
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
    v.addEventListener('error', () => {
      if (!v.dataset.fallbackApplied) {
        v.dataset.fallbackApplied = 'true';
        v.src = 'assets/video1.mp4';
        v.load();
      }
    });
    observer.observe(v);
    const card = v.closest('.work-card-reel, .work-card-horizontal');
    if (card) {
      card.addEventListener('mouseenter', () => {
        v.play().then(() => {
          card.classList.add('playing');
        }).catch(() => { });
      });
      card.addEventListener('mouseleave', () => {
        // if not currently intersecting or if leaving hover
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
  if (!deck || !mainVideo) return;

  // Dynamic Featured 3-Reel Deck Customizer Synchronization
  (function syncFeaturedDeck() {
    let portfolio = [];
    try {
      portfolio = JSON.parse(localStorage.getItem('nandhu_admin_portfolio') || '[]');
    } catch(e) {}
    if (!portfolio.length && window.PORTFOLIO_DATA && Array.isArray(window.PORTFOLIO_DATA.projects)) {
      portfolio = window.PORTFOLIO_DATA.projects;
    }

    let deckConfig = {};
    try {
      deckConfig = JSON.parse(localStorage.getItem('nandhu_featured_deck') || '{}');
    } catch(e) {}

    const slot1 = portfolio.find(p => p.id === deckConfig.left || p.featuredSlot === '1');
    const slot2 = portfolio.find(p => p.id === deckConfig.center || p.featuredSlot === '2');
    const slot3 = portfolio.find(p => p.id === deckConfig.right || p.featuredSlot === '3');

    function applySlot(slotCardSelector, videoEl, slotProject, fallbackTitle) {
      if (!slotProject) return;
      const card = document.querySelector(slotCardSelector);
      if (card) {
        card.onclick = () => window.openVideoPlayer(slotProject.id);
        card.setAttribute('aria-label', `Play ${slotProject.title}`);
        const titleEl = card.querySelector('.reel-card-title-overlay');
        if (titleEl) titleEl.textContent = slotProject.title || fallbackTitle;
        const badgeEl = card.querySelector('.reel-badge-pill');
        if (badgeEl) {
          const categoryTag = Array.isArray(slotProject.categories) && slotProject.categories.length > 0 ? slotProject.categories[0].toUpperCase().replace(/-/g, ' ') : '9:16';
          badgeEl.textContent = `${categoryTag} · 9:16`;
        }
      }
      if (videoEl && slotProject.videoUrl) {
        const rawUrl = (slotProject.videoUrl || '').trim();
        if (rawUrl && !rawUrl.includes('<') && (rawUrl.endsWith('.mp4') || rawUrl.includes('.mp4') || rawUrl.includes('supabase.co'))) {
          videoEl.src = rawUrl;
          if (slotProject.poster && !slotProject.poster.includes('reel_travel')) {
            videoEl.poster = slotProject.poster;
          }
          videoEl.load();
        }
      }
    }

    applySlot('.reel-deck-left', leftVideo, slot1, 'Traveling Europe');
    applySlot('.reel-deck-center', mainVideo, slot2, 'The Louvre Paris');
    applySlot('.reel-deck-right', rightVideo, slot3, 'Retro Synth Tech');

    // Filter Home Page Selected Works according to showOnHome
    if (Array.isArray(portfolio)) {
      portfolio.forEach(p => {
        if (p.showOnHome === false) {
          const c = document.querySelector(`[data-project-id="${p.id}"]`);
          if (c) c.style.display = 'none';
        }
      });
    }

    // Direct background sync from Supabase PostgREST
    fetch('https://npswzpmqdsxvqkndtvav.supabase.co/rest/v1/portfolio_projects?select=*&status=eq.published&order=sort_order.asc', {
      headers: {
        'apikey': 'sb_publishable_LbI_vgi8e9baElyLznZjXA_1nCBK0XL',
        'Authorization': 'Bearer sb_publishable_LbI_vgi8e9baElyLznZjXA_1nCBK0XL'
      }
    })
    .then(res => res.ok ? res.json() : [])
    .then(data => {
      if (Array.isArray(data) && data.length > 0) {
        const mapped = data.map(r => {
          const rawCats = Array.isArray(r.categories) ? r.categories : [];
          return {
            id: r.id,
            title: r.title,
            description: r.description,
            poster: r.poster,
            thumbnail: r.poster,
            videoUrl: r.video_url,
            isVertical: r.is_vertical,
            aspectRatio: r.aspect_ratio || (r.is_vertical ? '9:16' : '16:9'),
            categories: rawCats.filter(c => !['hide-home', 'hide-works', 'featured-slot-1', 'featured-slot-2', 'featured-slot-3'].includes(c)),
            showOnHome: !rawCats.includes('hide-home'),
            showOnWorks: !rawCats.includes('hide-works'),
            featuredSlot: rawCats.includes('featured-slot-1') ? '1' : (rawCats.includes('featured-slot-2') ? '2' : (rawCats.includes('featured-slot-3') ? '3' : 'none')),
            featured: r.featured || rawCats.some(c => c.startsWith('featured-slot-'))
          };
        });

        const s1 = mapped.find(p => p.id === deckConfig.left || p.featuredSlot === '1');
        const s2 = mapped.find(p => p.id === deckConfig.center || p.featuredSlot === '2');
        const s3 = mapped.find(p => p.id === deckConfig.right || p.featuredSlot === '3');
        if (s1) applySlot('.reel-deck-left', leftVideo, s1, 'Traveling Europe');
        if (s2) applySlot('.reel-deck-center', mainVideo, s2, 'The Louvre Paris');
        if (s3) applySlot('.reel-deck-right', rightVideo, s3, 'Retro Synth Tech');

        mapped.forEach(p => {
          if (p.showOnHome === false) {
            const c = document.querySelector(`[data-project-id="${p.id}"]`);
            if (c) c.style.display = 'none';
          }
        });
      }
    })
    .catch(() => {});
  })();

  [mainVideo, leftVideo, rightVideo].forEach(v => {
    if (v) {
      v.addEventListener('error', () => {
        if (!v.dataset.fallbackApplied) {
          v.dataset.fallbackApplied = 'true';
          v.src = 'assets/video1.mp4';
          v.load();
        }
      });
    }
  });

  let isInView = false;
  let isTransitioning = false;

  // Pop Out and play all 3 videos
  function popOutAndPlay() {
    deck.classList.add('popped-out', 'video-playing');

    if (leftVideo) leftVideo.play().catch(() => { });
    if (rightVideo) rightVideo.play().catch(() => { });
    mainVideo.play().catch(() => { });
  }

  // Pop In (collapse) back to 1 card and pause auxiliary videos
  function popInAndPause() {
    deck.classList.remove('popped-out', 'video-playing');
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

      // Check custom placement visibility from Admin
      let isVisibleOnWorks = true;
      try {
        const cached = JSON.parse(localStorage.getItem('nandhu_admin_portfolio') || '[]');
        const projectId = card.getAttribute('data-project-id');
        const match = cached.find(p => (projectId && p.id === projectId) || (p.title && title.includes(p.title.toLowerCase())));
        if (match && match.showOnWorks === false) {
          isVisibleOnWorks = false;
        }
      } catch(e) {}

      if (matchesCat && matchesText && isVisibleOnWorks) {
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

// ---------------------------------------------------------------------------
// ADMIN CONTENT LIVE SYNCHRONIZATION
// ---------------------------------------------------------------------------
function syncAdminWebsiteContent() {
  try {
    const content = JSON.parse(localStorage.getItem('nandhu_admin_website_content') || 'null');
    if (!content) return;

    // 1. Hero Subtitle / Description
    if (content.heroDescription) {
      const heroDesc = document.querySelector('.hero-subtitle');
      if (heroDesc) heroDesc.textContent = content.heroDescription;
    }

    // 2. Contact email links
    if (content.contactEmail) {
      document.querySelectorAll('a[href^="mailto:"]').forEach(a => {
        a.href = `mailto:${content.contactEmail}`;
      });
    }

    // 3. WhatsApp links
    if (content.whatsappNumber) {
      const cleanWa = content.whatsappNumber.replace(/[^0-9]/g, '');
      document.querySelectorAll('a[href*="wa.me"]').forEach(a => {
        const url = new URL(a.href);
        a.href = `https://wa.me/${cleanWa}${url.search}`;
      });
    }

    // 4. Instagram link
    if (content.instagramUrl) {
      document.querySelectorAll('a[aria-label="Instagram"]').forEach(a => {
        a.href = content.instagramUrl;
      });
    }
  } catch (e) {
    console.debug('Admin website content sync note:', e);
  }
}

// Global keyboard shortcut to open Admin Studio: Ctrl + Shift + A
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
    e.preventDefault();
    window.location.href = 'admin/';
  }
});

// Run admin sync on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', syncAdminWebsiteContent);
} else {
  syncAdminWebsiteContent();
}





