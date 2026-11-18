/**
 * Build Script: Static Category Pages Generator
 * Generates shareable, SEO-optimized category pages and directory hub from portfolio-data.js.
 */

const fs = require('fs');
const path = require('path');
const portfolioData = require('./portfolio-data.js');

const categories = portfolioData.categories.filter(c => c.slug !== 'all' && c.visible !== false);
const allProjects = portfolioData.projects;

const BASE_URL = 'https://nandhuiie.github.io/portfolio'; // Domain URL for canonical & OG

function renderCategoryPage(cat) {
  const catProjects = portfolioData.getProjectsByCategory(cat.slug);

  // Deliverables chips HTML
  const deliverablesHtml = (cat.deliverables || []).map(d => `
    <span class="category-deliverable-chip">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      <span>${d}</span>
    </span>
  `).join('');

  // Category Switcher Pills HTML
  const switcherHtml = portfolioData.categories.map(c => {
    const isCurrent = c.slug === cat.slug;
    const targetUrl = c.slug === 'all' ? '../../index.html#works' : `../${c.slug}/`;
    const count = c.slug === 'all' ? allProjects.length : portfolioData.getProjectsByCategory(c.slug).length;
    return `
      <a href="${targetUrl}" class="category-pill-btn ${isCurrent ? 'active' : ''}">
        <span>${c.name}</span>
        <span class="category-pill-count">${count}</span>
      </a>
    `;
  }).join('');

  // Gallery Cards HTML
  let galleryHtml = '';
  if (catProjects.length === 0) {
    galleryHtml = `
      <div class="category-empty-state">
        <h3 class="category-empty-state-title">No Projects in this Category Yet</h3>
        <p class="category-empty-state-desc">New ${cat.name} edits are currently in post-production. Contact me to request a private preview or custom sample edit.</p>
        <a href="../../index.html#contact" class="btn btn-black btn-sm"><span>Inquire Custom Edit</span></a>
      </div>
    `;
  } else {
    galleryHtml = catProjects.map(p => {
      const isVertical = p.aspectRatio === '9:16';
      const cardClass = isVertical ? 'vertical-card' : 'horizontal-card';
      const badgeClass = (p.productionType || '').includes('Shot') ? 'shot-edited' : 'editing-only';
      const softwareTag = Array.isArray(p.software) ? p.software[0] : (p.software || 'CapCut Desktop');

      const rawSrc = (p.videoUrl || '').trim();
      const isWistia = rawSrc.includes('wistia') || rawSrc.includes('wistia-player') || rawSrc.includes('fast.wistia');
      let mediaMarkup = '';

      if (isWistia) {
        let mediaId = 'htvzexs3p8';
        const match = rawSrc.match(/media-id="([a-zA-Z0-9]+)"/) || rawSrc.match(/medias\/([a-zA-Z0-9]+)/) || rawSrc.match(/embed\/([a-zA-Z0-9]+)/);
        if (match) mediaId = match[1];
        mediaMarkup = `
          <wistia-player media-id="${mediaId}" aspect="${isVertical ? '0.5625' : '1.7777777777777777'}" style="width:100%; height:100%; display:block; pointer-events:none;"></wistia-player>
          <div class="card-play-hover" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          </div>
        `;
      } else {
        const videoSrc = rawSrc.startsWith('http') || rawSrc.startsWith('data:') ? rawSrc : `../../${rawSrc}`;
        const posterAttr = p.thumbnail && !p.thumbnail.includes('reel_travel')
          ? `poster="${p.thumbnail.startsWith('http') ? p.thumbnail : `../../${p.thumbnail}`}"`
          : '';
        mediaMarkup = `
          <video class="category-card-video" src="${videoSrc}#t=0.5" ${posterAttr} muted playsinline loop preload="metadata"></video>
          <div class="card-play-hover" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </div>
        `;
      }

      return `
        <article class="category-project-card ${cardClass}" data-project-id="${p.id}" tabindex="0" role="button" aria-label="Play ${p.title}" onclick="openVideoPlayer('${p.id}')">
          <div class="category-card-media">
            ${mediaMarkup}
          </div>
          <div class="category-card-info">
            <div class="category-card-header">
              <span class="category-card-tag">${cat.name}</span>
              <span class="prod-type-badge ${badgeClass}">${p.productionType}</span>
            </div>
            <h3 class="category-card-title">${p.title}</h3>
            <p class="category-card-desc">${p.description}</p>
            <div class="category-card-meta">
              <span class="work-card-software-tag">${softwareTag}</span>
              <span class="work-card-duration-tag">${p.duration || '00:30'}</span>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  // Pre-formatted messages for sharing
  const escapedShareText = cat.clientShareText.replace(/'/g, "\\'");
  const waContactMessage = encodeURIComponent(cat.whatsappMessage || `Hi Nandhu! I was reviewing your ${cat.name} portfolio and would like to discuss a project with you.`);
  const waCtaMessage = encodeURIComponent(`Hi Nandhu! I was reviewing your ${cat.name} portfolio and would like to discuss a project.`);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${cat.seoTitle}</title>
  <meta name="description" content="${cat.seoDescription}">
  <link rel="canonical" href="${BASE_URL}/work/${cat.slug}/">

  <!-- Open Graph / WhatsApp / Facebook Preview -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="${BASE_URL}/work/${cat.slug}/">
  <meta property="og:title" content="${cat.seoTitle}">
  <meta property="og:description" content="${cat.seoDescription}">
  <meta property="og:image" content="${BASE_URL}/${cat.heroImage}">
  <meta property="og:site_name" content="Nandhalal P S Portfolio">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${cat.seoTitle}">
  <meta name="twitter:description" content="${cat.seoDescription}">
  <meta name="twitter:image" content="${BASE_URL}/${cat.heroImage}">

  <!-- Favicon -->
  <link rel="icon" type="image/png" href="../../assets/nandhu_headphone.png">

  <!-- Google Fonts: Syne & Inter -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Syne:wght@600;700;800&display=swap" rel="stylesheet">

  <!-- Main Stylesheet -->
  <link rel="stylesheet" href="../../style.css">

  <!-- Wistia Player Core -->
  <script src="https://fast.wistia.com/player.js" async></script>
</head>
<body class="category-page-body">

  <!-- Header -->
  <header class="category-page-header" role="banner">
    <div class="container">
      <div class="category-header-inner">
        <a href="../../index.html" class="category-logo-link" aria-label="Nandhalal P S Home">
          <span>Nandhalal P S</span>
        </a>
        <div class="category-header-actions">
          <a href="../" class="filter-btn" style="text-decoration:none;">All Categories</a>
          <a href="../../index.html#contact" class="btn-get-in-touch" style="text-decoration:none;">
            <span>Get in touch</span>
          </a>
        </div>
      </div>
    </div>
  </header>

  <main id="main-content">

    <!-- Category Hero -->
    <section class="category-hero-section">
      <div class="container">
        <!-- Breadcrumbs -->
        <nav class="category-breadcrumbs" aria-label="Breadcrumb">
          <a href="../../index.html">Home</a>
          <span class="sep">/</span>
          <a href="../../index.html#works">Selected Works</a>
          <span class="sep">/</span>
          <a href="../">Work</a>
          <span class="sep">/</span>
          <span class="current">${cat.name}</span>
        </nav>

        <span class="category-badge-pill">${cat.badge}</span>
        <h1 class="category-hero-title">${cat.headline}</h1>
        <p class="category-hero-desc">${cat.shortDescription}</p>

        <!-- Deliverables Chips -->
        <div class="category-deliverables-row">
          ${deliverablesHtml}
        </div>

        <!-- Action Row & Smart Sharing -->
        <div class="category-hero-actions-bar">
          <a href="https://api.whatsapp.com/send?phone=919995551234&text=${waContactMessage}" target="_blank" rel="noopener noreferrer" class="btn-whatsapp-share-direct">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
            <span>Inquire on WhatsApp</span>
          </a>

          <a href="../../index.html#contact" class="btn btn-black">
            <span>Book an Edit</span>
          </a>

          <!-- Smart Share Buttons -->
          <button type="button" class="btn-share-trigger" onclick="copyCurrentPageUrl('${escapedShareText}')" title="Copy shareable link to clipboard">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            <span>Copy Link</span>
          </button>

          <button type="button" class="btn-share-trigger" onclick="shareOnWhatsApp('${escapedShareText}')" title="Share directly on WhatsApp">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
            <span>Share</span>
          </button>
        </div>
      </div>
    </section>

    <!-- Category Switcher Pill Navigation -->
    <section class="category-switcher-container">
      <div class="container">
        <div class="category-switcher-title">Switch Service Category</div>
        <div class="category-filter-scroll">
          ${switcherHtml}
        </div>
      </div>
    </section>

    <!-- Category Projects Gallery -->
    <section class="category-gallery-section" aria-label="${cat.name} Projects Gallery">
      <div class="container">
        <div class="category-projects-grid">
          ${galleryHtml}
        </div>
      </div>
    </section>

    <!-- Dedicated Category Contact CTA -->
    <section class="category-contact-section">
      <div class="container">
        <div class="category-contact-card">
          <div class="category-contact-left">
            <span class="category-contact-badge">Client Collaboration</span>
            <h2 class="category-contact-title">Looking for a ${cat.name} Video Editor?</h2>
            <p class="category-contact-desc">Let's discuss your project, target audience, and turnaround times to create high-retention visuals that fit your vision.</p>
          </div>
          <div class="category-contact-buttons">
            <a href="https://api.whatsapp.com/send?phone=919995551234&text=${waContactMessage}" target="_blank" rel="noopener noreferrer" class="btn btn-white">
              <span>Chat on WhatsApp</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </a>
            <a href="mailto:nandhuthingsofficial@gmail.com?subject=Project Inquiry - ${encodeURIComponent(cat.name)}" class="btn btn-reel-play">
              <span>Send Email</span>
            </a>
            <a href="../../works.html" class="btn btn-reel-play">
              <span>All 22+ Works</span>
            </a>
          </div>
        </div>
      </div>
    </section>

  </main>

  <!-- Video Modal Player -->
  <div id="video-modal" class="modal-backdrop" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="video-modal-title">
    <div class="modal-window">
      <button id="modal-close-btn" class="modal-close-btn" type="button" aria-label="Close video player">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <div class="modal-video-wrapper">
        <video id="modal-video-player" controls preload="metadata" playsinline poster="">
          <source id="modal-video-src" src="" type="video/mp4">
          Your browser does not support HTML5 video playback.
        </video>
        <div id="modal-embed-container" style="display:none; width:100%; height:100%; min-height:350px;"></div>
      </div>

      <div id="modal-specs" class="modal-specs-row"></div>
      <h2 id="video-modal-title" class="modal-title"></h2>
      <p id="video-modal-desc" class="modal-desc"></p>
      <div id="modal-breakdown" class="modal-breakdown-grid"></div>

      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-top:20px; padding-top:18px; border-top:1px solid rgba(255,255,255,0.1);">
        <span style="font-size:12px; color:var(--color-text-muted);">Nandhalal P S · Video Editor &amp; Content Creator</span>
        <a href="../../index.html#contact" class="btn btn-white btn-sm" onclick="document.getElementById('modal-close-btn').click();">
          <span>Inquire About Similar Edit</span>
        </a>
      </div>
    </div>
  </div>

  <!-- Share Toast Feedback -->
  <div id="category-share-toast" class="share-toast" aria-live="polite"></div>

  <!-- Scripts -->
  <script src="../../portfolio-data.js?v=20261118_v4"></script>
  <script src="../category-page.js?v=20261118_v4"></script>
</body>
</html>`;
}

function renderHubPage() {
  const hubCardsHtml = categories.map(cat => {
    const count = portfolioData.getProjectsByCategory(cat.slug).length;
    return `
      <a href="${cat.slug}/" class="category-hub-card">
        <div class="category-hub-card-header">
          <span class="category-badge-pill" style="margin-bottom:0;">${cat.badge}</span>
          <span class="category-pill-count">${count} Projects</span>
        </div>
        <h2 class="category-hub-card-title">${cat.name}</h2>
        <p class="category-hub-card-desc">${cat.shortDescription}</p>
        <div class="category-hub-card-link">
          <span>Explore ${cat.name} Portfolio</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </div>
      </a>
    `;
  }).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Client Portfolio Categories &amp; Service Hub — Nandhalal P S</title>
  <meta name="description" content="Explore specialized video editing portfolios by service: YouTube Shorts, Instagram Reels, Podcast Editing, Commercial Videos, Motion Graphics, and more.">
  <link rel="canonical" href="${BASE_URL}/work/">

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="${BASE_URL}/work/">
  <meta property="og:title" content="Client Portfolio Categories &amp; Service Hub — Nandhalal P S">
  <meta property="og:description" content="Explore specialized video editing portfolios by service: YouTube Shorts, Instagram Reels, Podcast Editing, Commercial Videos, and more.">
  <meta property="og:image" content="${BASE_URL}/assets/hero_poster.png">

  <!-- Favicon -->
  <link rel="icon" type="image/png" href="../assets/nandhu_headphone.png">

  <!-- Google Fonts: Syne & Inter -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Syne:wght@600;700;800&display=swap" rel="stylesheet">

  <!-- Main Stylesheet -->
  <link rel="stylesheet" href="../style.css">
</head>
<body class="category-page-body">

  <header class="category-page-header" role="banner">
    <div class="container">
      <div class="category-header-inner">
        <a href="../index.html" class="category-logo-link" aria-label="Nandhalal P S Home">
          <span>Nandhalal P S</span>
        </a>
        <div class="category-header-actions">
          <a href="../works.html" class="filter-btn" style="text-decoration:none;">Complete Archive (22+)</a>
          <a href="../index.html#contact" class="btn-get-in-touch" style="text-decoration:none;">
            <span>Get in touch</span>
          </a>
        </div>
      </div>
    </div>
  </header>

  <main id="main-content">
    <section class="category-hub-hero">
      <div class="container">
        <nav class="category-breadcrumbs" style="justify-content:center;" aria-label="Breadcrumb">
          <a href="../index.html">Home</a>
          <span class="sep">/</span>
          <span class="current">Specialized Portfolios</span>
        </nav>
        <span class="category-badge-pill">Targeted Service Portfolios</span>
        <h1 class="category-hero-title" style="margin: 0 auto 16px; max-width: 720px;">Client-Specific Video Editing Portfolios</h1>
        <p class="category-hero-desc" style="margin: 0 auto; text-align: center;">Select your desired video editing format to view focused projects, relevant turnaround capabilities, and shareable client showcases.</p>
      </div>
    </section>

    <section>
      <div class="container">
        <div class="category-hub-grid">
          ${hubCardsHtml}
        </div>
      </div>
    </section>

    <!-- General CTA -->
    <section class="category-contact-section">
      <div class="container">
        <div class="category-contact-card">
          <div class="category-contact-left">
            <span class="category-contact-badge">Custom Production</span>
            <h2 class="category-contact-title">Need a Custom Video Editing Package?</h2>
            <p class="category-contact-desc">I edit short-form reels, commercial videos, and long-form YouTube content tailored to your target audience and retention goals.</p>
          </div>
          <div class="category-contact-buttons">
            <a href="https://api.whatsapp.com/send?phone=919995551234&text=Hi%20Nandhu!%20I%20would%20like%20to%20discuss%20a%20custom%20video%20editing%20project." target="_blank" rel="noopener noreferrer" class="btn btn-white">
              <span>Chat on WhatsApp</span>
            </a>
            <a href="../index.html#contact" class="btn btn-reel-play">
              <span>Fill Inquiry Form</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  </main>

  <script src="../portfolio-data.js"></script>
  <script>
    // URL Slug or Query Param routing fallback: /work/?cat=podcast-editing -> redirects smoothly
    (function() {
      const urlParams = new URLSearchParams(window.location.search);
      const catParam = urlParams.get('cat') || urlParams.get('category');
      if (catParam) {
        window.location.replace(catParam + '/');
      }
    })();
  </script>
</body>
</html>`;
}

// Generate files
function build() {
  const workDir = path.join(__dirname, 'work');
  if (!fs.existsSync(workDir)) {
    fs.mkdirSync(workDir, { recursive: true });
  }

  // 1. Build Category Hub (work/index.html)
  const hubHtml = renderHubPage();
  fs.writeFileSync(path.join(workDir, 'index.html'), hubHtml, 'utf8');
  console.log('✓ Generated work/index.html');

  // 2. Build each individual category page
  categories.forEach(cat => {
    const catDir = path.join(workDir, cat.slug);
    if (!fs.existsSync(catDir)) {
      fs.mkdirSync(catDir, { recursive: true });
    }
    const catHtml = renderCategoryPage(cat);
    fs.writeFileSync(path.join(catDir, 'index.html'), catHtml, 'utf8');
    console.log(`✓ Generated work/${cat.slug}/index.html (${portfolioData.getProjectsByCategory(cat.slug).length} projects)`);
  });

  console.log(`\nSuccessfully generated ${categories.length} dedicated category pages!`);
}

build();
