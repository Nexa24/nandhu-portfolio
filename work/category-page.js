/**
 * Client-Specific Portfolio Category Pages Interactivity
 * Handles smart sharing, clipboard copy, WhatsApp direct sharing, and video modal playback.
 */

(function () {
  'use strict';

  // Smart Share Functions
  window.copyCurrentPageUrl = function (customMessage) {
    const url = window.location.href;
    const textToCopy = customMessage ? `${customMessage}\n${url}` : url;

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(textToCopy).then(showShareToast).catch(fallbackCopy);
    } else {
      fallbackCopy(textToCopy);
    }
  };

  function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = typeof text === 'string' ? text : window.location.href;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showShareToast();
    } catch (err) {
      console.error('Fallback copy failed', err);
      prompt('Copy this link:', window.location.href);
    }
    document.body.removeChild(textArea);
  }

  window.shareOnWhatsApp = function (defaultText) {
    const url = window.location.href;
    const msg = defaultText ? `${defaultText} ${url}` : `Check out this portfolio: ${url}`;
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  window.shareNative = function (title, text) {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: title || document.title,
        text: text || 'Selected Video Editing Portfolio by Nandhalal P S',
        url: url
      }).catch(err => {
        if (err.name !== 'AbortError') {
          copyCurrentPageUrl();
        }
      });
    } else {
      copyCurrentPageUrl();
    }
  };

  function showShareToast(message) {
    let toast = document.getElementById('category-share-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'category-share-toast';
      toast.className = 'share-toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      <span>${message || 'Link copied to clipboard!'}</span>
    `;
    toast.classList.add('visible');
    setTimeout(() => {
      toast.classList.remove('visible');
    }, 2800);
  }

  // In-memory registry of all projects (baked + fetched)
  window._ALL_LOADED_PROJECTS = window._ALL_LOADED_PROJECTS || {};

  // Integrated Video Modal Player for Category Pages
  window.openVideoPlayer = function (id) {
    let project = window._ALL_LOADED_PROJECTS[id] || null;

    if (!project) {
      try {
        const cached = JSON.parse(localStorage.getItem('nandhu_admin_portfolio') || 'null');
        if (Array.isArray(cached)) {
          project = cached.find(p => p.id === id);
        }
      } catch (e) {}
    }

    if (!project && window.PORTFOLIO_DATA && typeof window.PORTFOLIO_DATA.getProjectById === 'function') {
      project = window.PORTFOLIO_DATA.getProjectById(id);
    }

    if (!project) return;

    const modal = document.getElementById('video-modal');
    const modalWindow = modal ? modal.querySelector('.modal-window') : null;
    const videoPlayer = document.getElementById('modal-video-player');
    const videoSrc = document.getElementById('modal-video-src');
    const embedContainer = document.getElementById('modal-embed-container');
    const specsContainer = document.getElementById('modal-specs');
    const breakdownContainer = document.getElementById('modal-breakdown');
    if (!modal) return;

    // Toggle 9:16 vertical ratio styling
    if (modalWindow) {
      if (project.aspectRatio === '9:16' || project.isVertical) {
        modalWindow.classList.add('vertical-reel-player');
      } else {
        modalWindow.classList.remove('vertical-reel-player');
      }
    }

    const prefix = document.querySelector('base') ? '' : '../../';
    const rawSource = (project.videoUrl || '').trim();
    const isWistia = rawSource.includes('wistia') || rawSource.includes('wistia-player') || rawSource.includes('fast.wistia');
    const isEmbedSnippet = rawSource.includes('<') && rawSource.includes('>');
    const isYouTube = rawSource.includes('youtube.com') || rawSource.includes('youtu.be');
    const isVimeo = rawSource.includes('vimeo.com');

    if (isWistia || isEmbedSnippet || isYouTube || isVimeo) {
      if (videoPlayer) {
        videoPlayer.pause();
        videoPlayer.style.display = 'none';
      }
      if (embedContainer) {
        embedContainer.style.display = 'block';
        if (isWistia) {
          if (!document.getElementById('wistia-cat-core-script')) {
            const wScript = document.createElement('script');
            wScript.id = 'wistia-cat-core-script';
            wScript.src = 'https://fast.wistia.com/player.js';
            wScript.async = true;
            document.head.appendChild(wScript);
          }
          if (isEmbedSnippet) {
            embedContainer.innerHTML = rawSource;
            embedContainer.querySelectorAll('script').forEach(oldScript => {
              const newScript = document.createElement('script');
              Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
              newScript.appendChild(document.createTextNode(oldScript.innerHTML));
              oldScript.parentNode.replaceChild(newScript, oldScript);
            });
          } else {
            let mediaId = rawSource;
            const match = rawSource.match(/medias\/([a-zA-Z0-9]+)/) || rawSource.match(/iframe\/([a-zA-Z0-9]+)/) || rawSource.match(/([a-zA-Z0-9]{8,12})/);
            if (match) mediaId = match[1];
            embedContainer.innerHTML = `
              <wistia-player media-id="${mediaId}" aspect="${project.aspectRatio === '9:16' ? '0.5625' : '1.7777777777777777'}"></wistia-player>
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
          embedContainer.innerHTML = `<iframe src="https://www.youtube.com/embed/${ytId}?autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="width:100%; height:400px; border:none; border-radius:12px;"></iframe>`;
        } else if (isVimeo) {
          const vimeoId = rawSource.split('vimeo.com/')[1]?.split('?')[0] || '';
          embedContainer.innerHTML = `<iframe src="https://player.vimeo.com/video/${vimeoId}?autoplay=1" frameborder="0" allow="autoplay; fullscreen" allowfullscreen style="width:100%; height:400px; border:none; border-radius:12px;"></iframe>`;
        } else {
          embedContainer.innerHTML = rawSource;
        }
      }
    } else {
      if (embedContainer) {
        embedContainer.style.display = 'none';
        embedContainer.innerHTML = '';
      }
      if (videoPlayer) {
        videoPlayer.style.display = 'block';
        const videoUrl = rawSource.startsWith('http') || rawSource.startsWith('data:') ? rawSource : (prefix + rawSource);
        const posterUrl = (project.thumbnail || project.poster || '').startsWith('http') ? (project.thumbnail || project.poster) : (prefix + (project.thumbnail || project.poster));
        videoSrc.src = videoUrl;
        videoPlayer.poster = posterUrl;
        videoPlayer.load();
        videoPlayer.play().catch(() => {});
      }
    }

    // Specs
    if (specsContainer) {
      specsContainer.innerHTML = '';
      (project.specs || [project.aspectRatio, project.duration, project.productionType]).forEach((s, idx) => {
        const chip = document.createElement('span');
        chip.className = idx === 0 ? 'modal-spec-chip accent' : 'modal-spec-chip';
        chip.textContent = s;
        specsContainer.appendChild(chip);
      });
    }

    // Title & Description
    const titleEl = document.getElementById('video-modal-title');
    const descEl = document.getElementById('video-modal-desc');
    if (titleEl) titleEl.textContent = project.title;
    if (descEl) descEl.textContent = project.description;

    // Breakdown Pillars
    if (breakdownContainer) {
      breakdownContainer.innerHTML = '';
      (project.breakdown || [
        { key: 'Production Type', val: project.productionType },
        { key: 'Software', val: Array.isArray(project.software) ? project.software.join(', ') : project.software }
      ]).forEach(item => {
        const box = document.createElement('div');
        box.className = 'modal-breakdown-box';
        box.innerHTML = `
          <span class="breakdown-key">${item.key}</span>
          <span class="breakdown-val">${item.val}</span>
        `;
        breakdownContainer.appendChild(box);
      });
    }

    // Open Modal
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  // Close Modal handler & Dynamic Grid Sync
  document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('video-modal');
    const closeBtn = document.getElementById('modal-close-btn');
    const videoPlayer = document.getElementById('modal-video-player');
    const embedContainer = document.getElementById('modal-embed-container');

    function closeModal() {
      if (!modal) return;
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (videoPlayer) {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
      }
      if (embedContainer) {
        embedContainer.innerHTML = '';
        embedContainer.style.display = 'none';
      }
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
        closeModal();
      }
    });

    // Dynamic Category Grid Synchronization (Loads new projects from Supabase / localStorage)
    (function syncCategoryProjects() {
      const grid = document.querySelector('.category-projects-grid');
      if (!grid) return;

      // Extract category slug accurately regardless of index.html or trailing slash
      const cleanPath = window.location.pathname.replace(/\/index\.html$/i, '').replace(/\/+$/, '');
      const pathSegments = cleanPath.split('/').filter(Boolean);
      const catSlug = pathSegments.pop() || '';
      if (!catSlug) return;

      function renderNewCards(projects) {
        projects.forEach(p => {
          if (!p || p.status === 'draft') return;
          window._ALL_LOADED_PROJECTS[p.id] = p;

          const categories = p.categories || [];
          if (!categories.includes(catSlug)) return;

          // Check if already in DOM
          if (grid.querySelector(`[data-project-id="${p.id}"]`)) return;

          const prefix = document.querySelector('base') ? '' : '../../';
          const posterUrl = (p.thumbnail || p.poster || '').startsWith('http') ? (p.thumbnail || p.poster) : (prefix + (p.thumbnail || p.poster || 'assets/hero_poster.png'));
          const isVert = p.aspectRatio === '9:16' || p.isVertical;

          const card = document.createElement('article');
          card.className = `category-project-card ${isVert ? 'vertical-card' : 'horizontal-card'}`;
          card.setAttribute('data-project-id', p.id);
          card.setAttribute('tabindex', '0');
          card.setAttribute('role', 'button');
          card.setAttribute('aria-label', `Play ${p.title}`);
          card.onclick = () => window.openVideoPlayer(p.id);

          card.innerHTML = `
            <div class="category-card-media">
              <img src="${posterUrl}" alt="${p.title}" class="category-card-poster" loading="lazy" onerror="this.src='${prefix}assets/hero_poster.png'">
              <div class="category-card-play-overlay">
                <div class="category-play-btn" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                </div>
              </div>
              <div class="category-card-badges">
                <span class="category-aspect-badge">${p.aspectRatio || (isVert ? '9:16' : '16:9')}</span>
                ${p.featured ? '<span class="category-featured-badge">★ Featured</span>' : ''}
              </div>
            </div>
            <div class="category-card-info">
              <div class="category-card-header">
                <span class="category-card-tag">${catSlug.replace(/-/g, ' ')}</span>
                <span class="prod-type-badge ${p.productionType === 'Editing Only' ? 'editing-only' : 'shot-edited'}">${p.productionType || 'Shot & Edited by Me'}</span>
              </div>
              <h3 class="category-card-title">${p.title}</h3>
              <p class="category-card-desc">${p.description || ''}</p>
              <div class="category-card-meta">
                <span class="work-card-software-tag">${Array.isArray(p.software) ? p.software[0] : (p.software || 'CapCut Desktop')}</span>
                <span class="work-card-duration-tag">${p.duration || '00:30'}</span>
              </div>
            </div>
          `;
          grid.prepend(card);
        });
      }

      // 1. Instant check from localStorage
      try {
        const cached = JSON.parse(localStorage.getItem('nandhu_admin_portfolio') || 'null');
        if (Array.isArray(cached)) renderNewCards(cached);
      } catch (e) {}

      // 2. Fast direct fetch from Supabase PostgREST (zero dependencies, fast & reliable)
      fetch('https://npswzpmqdsxvqkndtvav.supabase.co/rest/v1/portfolio_projects?select=*&status=eq.published&order=sort_order.asc', {
        headers: {
          'apikey': 'sb_publishable_LbI_vgi8e9baElyLznZjXA_1nCBK0XL',
          'Authorization': 'Bearer sb_publishable_LbI_vgi8e9baElyLznZjXA_1nCBK0XL'
        }
      })
      .then(res => res.ok ? res.json() : [])
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map(r => ({
            id: r.id,
            title: r.title,
            description: r.description,
            thumbnail: r.poster,
            poster: r.poster,
            videoUrl: r.video_url,
            aspectRatio: r.aspect_ratio || (r.is_vertical ? '9:16' : '16:9'),
            isVertical: r.is_vertical || r.aspect_ratio === '9:16',
            categories: r.categories || [],
            productionType: r.production_type,
            software: r.software,
            duration: r.duration,
            featured: r.featured,
            status: r.status
          }));
          renderNewCards(mapped);
          try {
            localStorage.setItem('nandhu_admin_portfolio', JSON.stringify(mapped));
          } catch(e) {}
        }
      })
      .catch(err => {
        // Silently fallback to static cards
      });
    })();
  });
})();

