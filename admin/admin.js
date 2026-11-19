/**
 * NANDHALAL P S — PRIVATE ADMIN DASHBOARD
 * Core Business & Portfolio Management System (Mini-CRM, Tracker, Portfolio CRUD, Emails & Enquiries)
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. STORAGE KEYS & DEFAULT SEED DATA
     ========================================================================== */
  const KEYS = {
    AUTH: 'nandhu_admin_auth',
    SESSION: 'nandhu_admin_session',
    CLIENTS: 'nandhu_admin_clients',
    PROJECTS: 'nandhu_admin_projects',
    PORTFOLIO: 'nandhu_admin_portfolio',
    CATEGORIES: 'nandhu_admin_categories',
    ENQUIRIES: 'nandhu_admin_enquiries',
    EMAILS: 'nandhu_admin_emails',
    CONTENT: 'nandhu_admin_website_content',
    SETTINGS: 'nandhu_admin_settings',
    LOGS: 'nandhu_admin_activity_logs'
  };

  // Correct SHA-256 hash for default password "nandhu@admin2026":
  const DEFAULT_PASS_HASH = '35c2055b61f238a8dc1e1aeefd3a213ff449ccf910ccbb04167bae683aeaaad4';

  async function sha256(message) {
    if (typeof crypto !== 'undefined' && crypto.subtle && typeof crypto.subtle.digest === 'function') {
      try {
        const msgBuffer = new TextEncoder().encode(message);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      } catch (e) {
        console.warn('SubtleCrypto digest fallback:', e);
      }
    }
    // Safe pure JS fallback hash
    let hash = 0;
    for (let i = 0; i < message.length; i++) {
      const char = message.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash |= 0;
    }
    return 'fallback_' + Math.abs(hash).toString(16);
  }

  // Pre-seeded Initial Data
  const INITIAL_CLIENTS = [
    {
      id: 'cli-101',
      name: 'Anand Varma',
      company: 'The Urban Pod',
      email: 'anand@theurbanpod.in',
      phone: '+91 98450 12345',
      whatsapp: '+91 98450 12345',
      instagram: '@theurbanpod',
      type: 'Individual Creator',
      status: 'Active Client',
      dateAdded: '2026-02-15',
      notes: 'Weekly podcast episodes. Needs vertical shorts with animated subtitles and sound design.'
    },
    {
      id: 'cli-102',
      name: 'Sneha Kapur',
      company: 'Aura Skin Lab',
      email: 'sneha@auraskinlab.com',
      phone: '+91 98112 34567',
      whatsapp: '+91 98112 34567',
      instagram: '@auraskinlab',
      type: 'Business / Brand',
      status: 'Active Client',
      dateAdded: '2026-03-01',
      notes: 'Monthly retainer for commercial D2C product showcase reels and cosmetic aesthetics.'
    },
    {
      id: 'cli-103',
      name: 'Marcus Reynolds',
      company: 'Velocity Media Agency',
      email: 'marcus@velocitymedia.co',
      phone: '+1 415 889 2210',
      whatsapp: '+1 415 889 2210',
      instagram: '@velocityagency',
      type: 'Agency',
      status: 'Negotiation',
      dateAdded: '2026-03-12',
      notes: 'Discussing contract for 15 fast-cut fitness reels per month.'
    },
    {
      id: 'cli-104',
      name: 'Rohan Mehta',
      company: 'Founders Unfiltered',
      email: 'rohan@foundersunfiltered.com',
      phone: '+91 99201 98765',
      whatsapp: '+91 99201 98765',
      instagram: '@foundersunfiltered',
      type: 'Individual Creator',
      status: 'Completed',
      dateAdded: '2026-01-20',
      notes: '10-episode talking head tech founder series completed and delivered.'
    },
    {
      id: 'cli-105',
      name: 'Kavya Nair',
      company: 'Lumiere Studios',
      email: 'kavya@lumierestudios.in',
      phone: '+91 97441 55667',
      whatsapp: '+91 97441 55667',
      instagram: '@lumierestudios',
      type: 'Agency',
      status: 'Lead',
      dateAdded: '2026-03-15',
      notes: 'Inquired through website for fashion commercial post-production.'
    }
  ];

  const INITIAL_PROJECTS = [
    {
      id: 'prj-201',
      title: 'Episode 42: Startup Mindset - 4x Vertical Shorts',
      clientId: 'cli-101',
      clientName: 'The Urban Pod',
      type: 'Podcast Editing',
      description: 'Cut 4 high-retention 9:16 vertical clips from 60-min raw zoom interview. Include speaker auto-switch and animated captions.',
      budget: '$650',
      startDate: '2026-03-10',
      deadline: '2026-03-22',
      deliveryDate: '',
      status: 'In Progress',
      notes: 'Audio cleaned with iZotope RX. Premiere timeline synced.',
      attachments: 'https://drive.google.com/drive/folders/urbanpod_ep42'
    },
    {
      id: 'prj-202',
      title: 'Spring Glow Hydration Serum - Commercial Reel',
      clientId: 'cli-102',
      clientName: 'Aura Skin Lab',
      type: 'Commercial Videos',
      description: '30-second commercial reel highlighting serum texture, macro shots, and kinetic typographic selling points.',
      budget: '$900',
      startDate: '2026-03-08',
      deadline: '2026-03-18',
      deliveryDate: '',
      status: 'Review',
      notes: 'First draft sent via Frame.io. Awaiting brand client sign-off on sound mix.',
      attachments: 'https://frame.io/r/aura_spring_draft1'
    },
    {
      id: 'prj-203',
      title: 'Fitness Transformation Hyper-lapse Edit',
      clientId: 'cli-103',
      clientName: 'Velocity Media Agency',
      type: 'Fast-Cut Editing',
      description: 'High-energy fast-cut gym reel with sound design, impact whooshes, and speed-ramp transitions.',
      budget: '$450',
      startDate: '2026-03-14',
      deadline: '2026-03-25',
      deliveryDate: '',
      status: 'Planning',
      notes: 'Music track approved. Waiting on 4K 120fps raw B-roll upload.',
      attachments: ''
    },
    {
      id: 'prj-204',
      title: 'Season 1 Finale - Full Length & YouTube Package',
      clientId: 'cli-104',
      clientName: 'Founders Unfiltered',
      type: 'YouTube Long-Form',
      description: 'Full 45-minute YouTube episode edit with lower thirds, chapter cards, intro bumper, and 3 teaser Shorts.',
      budget: '$1,500',
      startDate: '2026-01-25',
      deadline: '2026-02-12',
      deliveryDate: '2026-02-10',
      status: 'Completed',
      notes: 'Delivered ahead of schedule. Client paid in full via bank transfer.',
      attachments: 'https://youtube.com/watch?v=sample'
    }
  ];

  const INITIAL_EMAILS = [
    {
      alias: 'edits@nandhuiie.tech',
      purpose: 'Video Editing Enquiries',
      destination: 'ndhumov@gmail.com',
      status: 'Active',
      created: '2025-11-01'
    },
    {
      alias: 'video@nandhuiie.tech',
      purpose: 'Videography & Shooting',
      destination: 'ndhumov@gmail.com',
      status: 'Active',
      created: '2025-11-01'
    },
    {
      alias: 'work@nandhuiie.tech',
      purpose: 'Client Projects & Collaborations',
      destination: 'ndhumov@gmail.com',
      status: 'Active',
      created: '2025-11-01'
    },
    {
      alias: 'support@nandhuiie.tech',
      purpose: 'Customer Support',
      destination: 'ndhumov@gmail.com',
      status: 'Active',
      created: '2025-11-01'
    },
    {
      alias: 'contact@nandhuiie.tech',
      purpose: 'General Contact',
      destination: 'ndhumov@gmail.com',
      status: 'Active',
      created: '2025-11-01'
    },
    {
      alias: 'info@nandhuiie.tech',
      purpose: 'General Information',
      destination: 'ndhumov@gmail.com',
      status: 'Active',
      created: '2025-11-01'
    }
  ];

  const INITIAL_ENQUIRIES = [
    {
      id: 'enq-301',
      name: 'Aditya Sharma',
      email: 'aditya.films@gmail.com',
      phone: '+91 98200 44556',
      reason: 'Short-Form Reels',
      budget: '$500 – $1,000 (USD)',
      message: 'Hi Nandhu! Loved your travel and aesthetic reel transitions. We are launching a streetwear apparel line in Bangalore and need 8 reels edited with punchy beat syncs.',
      date: '2026-03-16 10:24',
      status: 'New'
    },
    {
      id: 'enq-302',
      name: 'Elena Rostova',
      email: 'elena@podcastpeak.co',
      phone: '+44 7700 900123',
      reason: 'YouTube Video Editing',
      budget: '$1,000+ (USD)',
      message: 'Looking for a reliable video editor to handle 2 weekly podcast episodes (45 mins each) with multi-cam angle cuts, animated captions, and sound design. Can we schedule a quick call?',
      date: '2026-03-15 17:40',
      status: 'Replied'
    },
    {
      id: 'enq-303',
      name: 'Kavya Nair',
      email: 'kavya@lumierestudios.in',
      phone: '+91 97441 55667',
      reason: 'Commercial Video',
      budget: '$250 – $1,000 (USD)',
      message: 'We have 4K raw footage shot on Sony FX3 for a jewellery boutique commercial. Need color grade, dynamic titles, and clean pacing.',
      date: '2026-03-14 09:12',
      status: 'Converted to Client'
    }
  ];

  const INITIAL_CONTENT = {
    heroHeading: "Hello, I'm Nandhalal P S.\nA Video Editor, Content Creator, a I phone videographer,  SMM Strategist.",
    heroDescription: "I create engaging visual experiences through cinematic storytelling, creative editing, and compelling content. From short-form reels to commercial videos, I turn ideas into impactful visuals.",
    profileImage: "assets/nandhu_profile.jpg",
    contactEmail: "edits@nandhuiie.tech",
    phone: "+91 94477 46535",
    whatsappNumber: "+919447746535",
    instagramUrl: "https://instagram.com/nandhuiie",
    location: "Kerala / Bangalore, India",
    status: "published",
    lastUpdated: "2026-03-16"
  };

  const INITIAL_SETTINGS = {
    displayName: "Nandhalal P S",
    title: "Video Editor & Content Creator",
    email: "edits@nandhuiie.tech",
    portfolioUrl: "https://nandhuiie.tech",
    whatsapp: "+919447746535",
    instagram: "https://instagram.com/nandhuiie",
    sessionTimeoutHours: 48
  };

  const INITIAL_LOGS = [
    { id: 'log-1', text: 'Admin system initialized with 10 service categories & 12 video projects.', time: 'Just now', icon: 'check' },
    { id: 'log-2', text: 'Verified email routing: 6 aliases forward to ndhumov@gmail.com.', time: '10 mins ago', icon: 'mail' },
    { id: 'log-3', text: 'New website enquiry received from Aditya Sharma ($500 – $1,000).', time: '1 hour ago', icon: 'inbox' }
  ];

  /* ==========================================================================
     SUPABASE CLOUD CONFIGURATION & DATA MAPPERS
     ========================================================================== */
  const SUPABASE_CONFIG = {
    url: 'https://npswzpmqdsxvqkndtvav.supabase.co',
    publishableKey: 'sb_publishable_LbI_vgi8e9baElyLznZjXA_1nCBK0XL'
  };

  let sb = null;
  try {
    if (window.supabase && typeof window.supabase.createClient === 'function') {
      sb = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.publishableKey);
    }
  } catch (err) {
    console.warn('Supabase SDK initialization notice:', err);
  }

  function updateSupabaseStatus(statusClass, labelText) {
    const badge = document.getElementById('supabase-status-badge');
    const label = document.getElementById('supabase-status-text');
    if (!badge || !label) return;
    badge.className = 'supabase-status-pill ' + (statusClass || '');
    label.textContent = labelText;
  }

  // Mappers: Client
  function toDbClient(c) {
    return {
      id: String(c.id),
      name: c.name || 'Unnamed Client',
      company: c.company || '',
      email: c.email || '',
      phone: c.phone || '',
      whatsapp: c.whatsapp || '',
      instagram: c.instagram || '',
      type: c.type || 'Individual Creator',
      status: c.status || 'Lead',
      date_added: c.dateAdded || new Date().toISOString().split('T')[0],
      notes: c.notes || ''
    };
  }
  function fromDbClient(r) {
    return {
      id: r.id,
      name: r.name,
      company: r.company || '',
      email: r.email,
      phone: r.phone || '',
      whatsapp: r.whatsapp || '',
      instagram: r.instagram || '',
      type: r.type || 'Individual Creator',
      status: r.status || 'Lead',
      dateAdded: r.date_added || (r.created_at ? r.created_at.split('T')[0] : ''),
      notes: r.notes || ''
    };
  }

  // Mappers: Project
  function toDbProject(p) {
    return {
      id: String(p.id),
      title: p.title || 'Untitled Project',
      client_id: p.clientId || null,
      client_name: p.clientName || '',
      type: p.type || 'Instagram Reels',
      budget: p.budget || '',
      start_date: p.startDate || null,
      deadline: p.deadline || null,
      delivery_date: p.deliveryDate || null,
      status: p.status || 'Planning',
      description: p.description || '',
      notes: p.notes || '',
      attachments: p.attachments || ''
    };
  }
  function fromDbProject(r) {
    return {
      id: r.id,
      title: r.title,
      clientId: r.client_id || '',
      clientName: r.client_name || '',
      type: r.type || '',
      budget: r.budget || '',
      startDate: r.start_date || '',
      deadline: r.deadline || '',
      deliveryDate: r.delivery_date || '',
      status: r.status || 'Planning',
      description: r.description || '',
      notes: r.notes || '',
      attachments: r.attachments || ''
    };
  }

  // Mappers: Portfolio Projects
  function toDbPortfolio(p, idx) {
    let cats = Array.isArray(p.categories) ? [...p.categories] : [];
    // Strip old placement tags before re-adding
    cats = cats.filter(c => !['hide-home', 'hide-works', 'featured-slot-1', 'featured-slot-2', 'featured-slot-3'].includes(c));
    if (p.showOnHome === false) cats.push('hide-home');
    if (p.showOnWorks === false) cats.push('hide-works');
    if (p.featuredSlot === '1') cats.push('featured-slot-1');
    if (p.featuredSlot === '2') cats.push('featured-slot-2');
    if (p.featuredSlot === '3') cats.push('featured-slot-3');

    return {
      id: String(p.id),
      title: p.title || '',
      description: p.description || '',
      video_url: p.videoUrl || p.video_url || '',
      poster: p.thumbnail || p.poster || '',
      is_vertical: (p.aspectRatio === '9:16' || p.is_vertical === true || p.isVertical === true),
      aspect_ratio: p.aspectRatio || (p.is_vertical || p.isVertical ? '9:16' : '16:9'),
      categories: cats,
      production_type: p.productionType || p.production_type || 'Shot & Edited by Me',
      software: Array.isArray(p.software) ? p.software.join(', ') : (p.software || 'CapCut Desktop'),
      duration: p.duration || '00:30',
      featured: Boolean(p.featured || p.featuredSlot === '1' || p.featuredSlot === '2' || p.featuredSlot === '3'),
      status: p.status || (p.visible !== false ? 'published' : 'draft'),
      sort_order: typeof p.sortOrder === 'number' ? p.sortOrder : (typeof p.sort_order === 'number' ? p.sort_order : (idx != null ? idx + 1 : 1))
    };
  }
  function fromDbPortfolio(r) {
    const rawCats = Array.isArray(r.categories) ? r.categories : [];
    const showOnHome = !rawCats.includes('hide-home');
    const showOnWorks = !rawCats.includes('hide-works');
    let featuredSlot = 'none';
    if (rawCats.includes('featured-slot-1')) featuredSlot = '1';
    else if (rawCats.includes('featured-slot-2')) featuredSlot = '2';
    else if (rawCats.includes('featured-slot-3')) featuredSlot = '3';

    // Clean service categories for display
    const cleanCats = rawCats.filter(c => !['hide-home', 'hide-works', 'featured-slot-1', 'featured-slot-2', 'featured-slot-3'].includes(c));

    return {
      id: r.id,
      title: r.title,
      description: r.description || '',
      thumbnail: r.poster || '',
      poster: r.poster || '',
      videoUrl: r.video_url || '',
      aspectRatio: r.aspect_ratio || (r.is_vertical ? '9:16' : '16:9'),
      isVertical: r.is_vertical || r.aspect_ratio === '9:16',
      categories: cleanCats,
      productionType: r.production_type || 'Shot & Edited by Me',
      software: r.software ? (typeof r.software === 'string' ? r.software.split(',').map(s => s.trim()) : r.software) : ['CapCut Desktop'],
      duration: r.duration || '00:30',
      featured: Boolean(r.featured) || featuredSlot !== 'none',
      featuredSlot: featuredSlot,
      showOnHome: showOnHome,
      showOnWorks: showOnWorks,
      sortOrder: r.sort_order || 0,
      visible: r.status === 'published',
      status: r.status || 'published',
      sort_order: r.sort_order || 0
    };
  }

  // Mappers: Category
  function toDbCategory(c, idx) {
    return {
      id: String(c.id || c.slug),
      name: c.name,
      slug: c.slug || c.id,
      headline: c.headline || c.name,
      short_description: c.shortDescription || c.short_description || '',
      hero_image: c.heroImage || c.hero_image || 'assets/reel_1.jpg',
      deliverables: Array.isArray(c.deliverables) ? c.deliverables : [],
      visible: c.visible !== false,
      featured: c.featured !== false,
      sort_order: typeof c.sortOrder === 'number' ? c.sortOrder : (idx != null ? idx + 1 : 1)
    };
  }
  function fromDbCategory(r) {
    return {
      id: r.id,
      name: r.name,
      slug: r.slug,
      headline: r.headline || r.name,
      shortDescription: r.short_description || '',
      heroImage: r.hero_image || '',
      deliverables: r.deliverables || [],
      visible: r.visible !== false,
      featured: r.featured !== false,
      sortOrder: r.sort_order || 0
    };
  }

  // Mappers: Enquiry
  function toDbEnquiry(e) {
    return {
      id: String(e.id),
      name: e.name || 'Anonymous',
      email: e.email || '',
      phone: e.phone || '',
      reason: e.reason || '',
      budget: e.budget || '',
      message: e.message || '',
      status: e.status || 'New'
    };
  }
  function fromDbEnquiry(r) {
    return {
      id: r.id,
      name: r.name,
      email: r.email,
      phone: r.phone || '',
      reason: r.reason || '',
      budget: r.budget || '',
      message: r.message || '',
      status: r.status || 'New',
      date: r.created_at ? r.created_at.replace('T', ' ').substring(0, 16) : ''
    };
  }

  // Mappers: Email Alias
  function toDbEmail(em) {
    return {
      alias: em.alias,
      purpose: em.purpose || '',
      destination: em.destination || '',
      status: em.status || 'Active'
    };
  }
  function fromDbEmail(r) {
    return {
      alias: r.alias,
      purpose: r.purpose || '',
      destination: r.destination || '',
      status: r.status || 'Active'
    };
  }

  // Mappers: Website Content
  function toDbContent(cnt) {
    return {
      id: 'default',
      hero_heading: cnt.heroHeading || '',
      hero_description: cnt.heroDescription || '',
      profile_image: cnt.profileImage || '',
      contact_email: cnt.contactEmail || '',
      phone: cnt.phone || '',
      whatsapp_number: cnt.whatsappNumber || '',
      instagram_url: cnt.instagramUrl || '',
      location: cnt.location || ''
    };
  }
  function fromDbContent(r) {
    return {
      heroHeading: r.hero_heading || '',
      heroDescription: r.hero_description || '',
      profileImage: r.profile_image || '',
      contactEmail: r.contact_email || '',
      phone: r.phone || '',
      whatsappNumber: r.whatsapp_number || '',
      instagramUrl: r.instagram_url || '',
      location: r.location || '',
      status: 'published'
    };
  }

  // Mappers: Logs
  function toDbLog(l) {
    return {
      id: String(l.id),
      text: l.text || '',
      icon: l.icon || 'info'
    };
  }
  function fromDbLog(r) {
    return {
      id: r.id,
      text: r.text,
      icon: r.icon || 'info',
      time: r.created_at ? new Date(r.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recently'
    };
  }

  /* ==========================================================================
     2. STORE CONTROLLER (CRUD, LOCALSTORAGE & SUPABASE CLOUD SYNC)
     ========================================================================== */
  const Store = {
    get(key, fallback) {
      try {
        const val = localStorage.getItem(key);
        return val ? JSON.parse(val) : fallback;
      } catch (e) {
        return fallback;
      }
    },

    set(key, val) {
      try {
        localStorage.setItem(key, JSON.stringify(val));

        // Asynchronous Background Cloud Sync to Supabase
        if (sb) {
          if (key === KEYS.CLIENTS && Array.isArray(val)) {
            Store.syncToSupabase('clients', val.map(toDbClient));
          } else if (key === KEYS.PROJECTS && Array.isArray(val)) {
            Store.syncToSupabase('projects', val.map(toDbProject));
          } else if (key === KEYS.PORTFOLIO && Array.isArray(val)) {
            Store.syncToSupabase('portfolio_projects', val.map((p, idx) => toDbPortfolio(p, idx)));
          } else if (key === KEYS.CATEGORIES && Array.isArray(val)) {
            Store.syncToSupabase('categories', val.map((c, idx) => toDbCategory(c, idx)));
          } else if (key === KEYS.EMAILS && Array.isArray(val)) {
            Store.syncToSupabase('email_aliases', val.map(toDbEmail));
          } else if (key === KEYS.ENQUIRIES && Array.isArray(val)) {
            Store.syncToSupabase('enquiries', val.map(toDbEnquiry));
          } else if (key === KEYS.CONTENT && val) {
            Store.syncToSupabase('website_content', toDbContent(val));
          }
        }
      } catch (e) {
        console.error('Storage set failed:', e);
      }
    },

    logActivity(text, icon = 'info') {
      const logs = Store.get(KEYS.LOGS, INITIAL_LOGS);
      const newLog = {
        id: 'log-' + Date.now(),
        text: text,
        time: 'Just now',
        icon: icon
      };
      logs.unshift(newLog);
      if (logs.length > 25) logs.pop();
      try {
        localStorage.setItem(KEYS.LOGS, JSON.stringify(logs));
        if (sb) {
          sb.from('activity_logs').insert([toDbLog(newLog)]).then(() => {}).catch(() => {});
        }
      } catch (e) {}
    },

    async syncFromSupabase(isManual = false) {
      if (!sb) {
        updateSupabaseStatus('offline', 'Local Cache');
        if (isManual) AdminApp.toast('Supabase SDK not loaded or offline.', 'error');
        return;
      }
      updateSupabaseStatus('syncing', 'Syncing...');
      try {
        let anySynced = false;
        let tablesPending = false;

        // 1. Clients
        const { data: dbClients, error: errClients } = await sb.from('clients').select('*');
        if (errClients) {
          if (errClients.code === 'PGRST205' || (errClients.message && errClients.message.includes('not find the table'))) {
            tablesPending = true;
          }
        } else if (Array.isArray(dbClients) && dbClients.length > 0) {
          localStorage.setItem(KEYS.CLIENTS, JSON.stringify(dbClients.map(fromDbClient)));
          anySynced = true;
        }

        // 2. Projects
        const { data: dbProjects, error: errProjects } = await sb.from('projects').select('*');
        if (!errProjects && Array.isArray(dbProjects) && dbProjects.length > 0) {
          localStorage.setItem(KEYS.PROJECTS, JSON.stringify(dbProjects.map(fromDbProject)));
          anySynced = true;
        }

        // 3. Portfolio
        const { data: dbPortfolio, error: errPortfolio } = await sb.from('portfolio_projects').select('*').order('sort_order', { ascending: true });
        if (!errPortfolio && Array.isArray(dbPortfolio) && dbPortfolio.length > 0) {
          localStorage.setItem(KEYS.PORTFOLIO, JSON.stringify(dbPortfolio.map(fromDbPortfolio)));
          anySynced = true;
        }

        // 4. Categories
        const { data: dbCats, error: errCats } = await sb.from('categories').select('*').order('sort_order', { ascending: true });
        if (!errCats && Array.isArray(dbCats) && dbCats.length > 0) {
          localStorage.setItem(KEYS.CATEGORIES, JSON.stringify(dbCats.map(fromDbCategory)));
          anySynced = true;
        }

        // 5. Enquiries
        const { data: dbEnqs, error: errEnqs } = await sb.from('enquiries').select('*').order('created_at', { ascending: false });
        if (!errEnqs && Array.isArray(dbEnqs) && dbEnqs.length > 0) {
          localStorage.setItem(KEYS.ENQUIRIES, JSON.stringify(dbEnqs.map(fromDbEnquiry)));
          anySynced = true;
        }

        // 6. Emails
        const { data: dbEmails, error: errEmails } = await sb.from('email_aliases').select('*');
        if (!errEmails && Array.isArray(dbEmails) && dbEmails.length > 0) {
          localStorage.setItem(KEYS.EMAILS, JSON.stringify(dbEmails.map(fromDbEmail)));
          anySynced = true;
        }

        // 7. Content
        const { data: dbContent, error: errContent } = await sb.from('website_content').select('*').eq('id', 'default').maybeSingle();
        if (!errContent && dbContent) {
          localStorage.setItem(KEYS.CONTENT, JSON.stringify(fromDbContent(dbContent)));
          anySynced = true;
        }

        // 8. Logs
        const { data: dbLogs, error: errLogs } = await sb.from('activity_logs').select('*').order('created_at', { ascending: false }).limit(25);
        if (!errLogs && Array.isArray(dbLogs) && dbLogs.length > 0) {
          localStorage.setItem(KEYS.LOGS, JSON.stringify(dbLogs.map(fromDbLog)));
        }

        if (tablesPending) {
          updateSupabaseStatus('offline', 'Run SQL in Supabase');
          if (isManual) {
            AdminApp.toast('Connected to Supabase, but tables are pending. Run supabase_schema.sql in Supabase SQL Editor.', 'info');
          }
        } else {
          updateSupabaseStatus('', 'Supabase Connected');
          if (isManual) {
            AdminApp.toast(anySynced ? 'Synced live data from Supabase!' : 'Connected to Supabase Cloud.', 'success');
          }
        }

        // Re-render the active view with latest cloud data
        if (AdminApp.currentView && typeof AdminApp.switchView === 'function') {
          AdminApp.switchView(AdminApp.currentView);
        }
        if (typeof AdminApp.renderRightPanel === 'function') {
          AdminApp.renderRightPanel();
        }
        if (typeof AdminApp.updateBadgeCounts === 'function') {
          AdminApp.updateBadgeCounts();
        }
      } catch (err) {
        console.warn('Supabase sync warning:', err);
        updateSupabaseStatus('offline', 'Local Cache');
        if (isManual) AdminApp.toast('Could not connect to Supabase.', 'error');
      }
    },

    async syncToSupabase(table, payload) {
      if (!sb) return;
      try {
        updateSupabaseStatus('syncing', 'Saving...');
        const { error } = await sb.from(table).upsert(payload);
        if (error) {
          console.warn(`Supabase upsert warning (${table}):`, error);
          updateSupabaseStatus('error', 'Sync Issue');
        } else {
          updateSupabaseStatus('', 'Supabase Connected');
        }
      } catch (e) {
        console.warn(`Supabase sync failed (${table}):`, e);
        updateSupabaseStatus('offline', 'Local Cache');
      }
    },

    async deleteFromSupabase(table, column, value) {
      if (!sb) return;
      try {
        updateSupabaseStatus('syncing', 'Updating...');
        const { error } = await sb.from(table).delete().eq(column, value);
        if (error) {
          console.warn(`Supabase delete warning (${table}):`, error);
        } else {
          updateSupabaseStatus('', 'Supabase Connected');
        }
      } catch (e) {
        console.warn(`Supabase delete failed (${table}):`, e);
      }
    }
  };

  // Global helper for index.html contact form to push new inquiries directly into admin inbox!
  window.recordAdminEnquiry = function (enquiry) {
    const list = Store.get(KEYS.ENQUIRIES, INITIAL_ENQUIRIES);
    const newEnq = {
      id: 'enq-' + Date.now(),
      name: enquiry.name || 'Anonymous',
      email: enquiry.email || '',
      phone: enquiry.phone || '',
      reason: enquiry.reason || 'Project Inquiry',
      budget: enquiry.budget || 'Negotiable',
      message: enquiry.message || '',
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'New'
    };
    list.unshift(newEnq);
    Store.set(KEYS.ENQUIRIES, list);
    Store.logActivity(`New website inquiry received from ${newEnq.name} (${newEnq.reason})`, 'inbox');
    return newEnq;
  };

  /* Initialize Seed Data if empty */
  function initializeData() {
    // Ensure auth hash is valid (clean up any legacy wrong hash)
    const storedAuth = localStorage.getItem(KEYS.AUTH);
    if (!storedAuth || storedAuth.includes('1f7bf841b802e07172fae7a0e363ebcceb87e22137e3d1ce833c8a9fa64bfb6c')) {
      Store.set(KEYS.AUTH, DEFAULT_PASS_HASH);
    }

    if (!localStorage.getItem(KEYS.CLIENTS)) Store.set(KEYS.CLIENTS, INITIAL_CLIENTS);
    if (!localStorage.getItem(KEYS.PROJECTS)) Store.set(KEYS.PROJECTS, INITIAL_PROJECTS);
    if (!localStorage.getItem(KEYS.EMAILS)) Store.set(KEYS.EMAILS, INITIAL_EMAILS);
    if (!localStorage.getItem(KEYS.ENQUIRIES)) Store.set(KEYS.ENQUIRIES, INITIAL_ENQUIRIES);
    if (!localStorage.getItem(KEYS.CONTENT)) Store.set(KEYS.CONTENT, INITIAL_CONTENT);
    if (!localStorage.getItem(KEYS.SETTINGS)) Store.set(KEYS.SETTINGS, INITIAL_SETTINGS);
    if (!localStorage.getItem(KEYS.LOGS)) Store.set(KEYS.LOGS, INITIAL_LOGS);

    // Initialize Portfolio Projects & Categories from portfolio-data.js if available
    if (!localStorage.getItem(KEYS.PORTFOLIO)) {
      if (window.PORTFOLIO_DATA && Array.isArray(window.PORTFOLIO_DATA.projects)) {
        Store.set(KEYS.PORTFOLIO, window.PORTFOLIO_DATA.projects);
      } else {
        Store.set(KEYS.PORTFOLIO, []);
      }
    }
    if (!localStorage.getItem(KEYS.CATEGORIES)) {
      if (window.PORTFOLIO_DATA && Array.isArray(window.PORTFOLIO_DATA.categories)) {
        Store.set(KEYS.CATEGORIES, window.PORTFOLIO_DATA.categories);
      } else {
        Store.set(KEYS.CATEGORIES, []);
      }
    }
  }

  /* ==========================================================================
     3. AUTHENTICATION CONTROLLER
     ========================================================================== */
  const Auth = {
    currentUser: null,

    async checkSession() {
      // 1. Check active Supabase Cloud Auth session
      if (sb && sb.auth) {
        try {
          const { data, error } = await sb.auth.getSession();
          if (!error && data && data.session && data.session.user) {
            Auth.currentUser = data.session.user;
            Store.set(KEYS.SESSION, {
              username: data.session.user.email,
              email: data.session.user.email,
              id: data.session.user.id,
              token: data.session.access_token,
              provider: 'supabase',
              timestamp: Date.now()
            });
            Auth.hideLogin();
            Auth.updateUserUI(data.session.user);
            return true;
          }
        } catch (e) {
          console.debug('Supabase session check note:', e);
        }
      }

      // 2. Check local fallback session
      const session = Store.get(KEYS.SESSION, null);
      if (!session || !session.token) {
        Auth.showLogin();
        return false;
      }
      // Check expiration (48 hours)
      const now = Date.now();
      if (now - session.timestamp > 48 * 60 * 60 * 1000) {
        Auth.logout('Session expired. Please log in again.');
        return false;
      }
      Auth.hideLogin();
      Auth.updateUserUI(session);
      return true;
    },

    updateUserUI(user) {
      const email = user.email || user.username || 'nandhu';
      const userBadge = document.getElementById('admin-user-display-name');
      if (userBadge) {
        userBadge.textContent = email;
        userBadge.title = `Signed in as ${email}`;
      }
    },

    showLogin(msg, type = 'error') {
      const overlay = document.getElementById('admin-auth-overlay');
      const errBox = document.getElementById('auth-error-box');
      if (overlay) overlay.classList.remove('hidden');
      if (errBox) {
        if (msg) {
          errBox.textContent = msg;
          errBox.style.display = 'block';
          errBox.style.background = type === 'success' ? '#f0fdf4' : '#fef2f2';
          errBox.style.color = type === 'success' ? '#166534' : '#ef4444';
          errBox.style.borderColor = type === 'success' ? '#bbf7d0' : '#fee2e2';
        } else {
          errBox.style.display = 'none';
        }
      }
    },

    hideLogin() {
      const overlay = document.getElementById('admin-auth-overlay');
      if (overlay) overlay.classList.add('hidden');
    },

    async login(username, password) {
      const cleanUser = (username || '').trim();
      const cleanPass = (password || '').trim();

      // 1. Direct Supabase Cloud Auth (when email provided)
      if (sb && sb.auth && cleanUser.includes('@')) {
        try {
          const { data, error } = await sb.auth.signInWithPassword({
            email: cleanUser,
            password: cleanPass
          });

          if (error) {
            console.warn('Supabase sign-in response:', error);
            Auth.showLogin(`Supabase Auth: ${error.message || 'Invalid login credentials.'}`);
            return false;
          }

          if (data && data.session && data.user) {
            Auth.currentUser = data.user;
            Store.set(KEYS.SESSION, {
              username: data.user.email,
              email: data.user.email,
              id: data.user.id,
              token: data.session.access_token,
              provider: 'supabase',
              timestamp: Date.now()
            });
            Auth.hideLogin();
            Auth.updateUserUI(data.user);
            AdminApp.toast(`Signed in via Supabase Cloud: ${data.user.email}`, 'success');
            AdminApp.refreshAll();
            Store.syncFromSupabase();
            return true;
          }
        } catch (sbErr) {
          console.warn('Supabase login error:', sbErr);
          Auth.showLogin(`Supabase Auth: ${sbErr.message || 'Authentication failed'}`);
          return false;
        }
      }

      // 2. Master Password Offline / Local Fallback
      const validUser = (!cleanUser || cleanUser.toLowerCase() === 'admin' || cleanUser.toLowerCase() === 'nandhu' || cleanUser.toLowerCase() === 'nandhalal');
      const storedPassHash = Store.get(KEYS.AUTH, DEFAULT_PASS_HASH);
      let inputHash = '';
      try {
        inputHash = await sha256(cleanPass);
      } catch (e) {
        inputHash = '';
      }

      const isPassValid = (
        cleanPass === 'nandhu@admin2026' ||
        inputHash === DEFAULT_PASS_HASH ||
        (storedPassHash && inputHash === storedPassHash)
      );

      if (validUser && isPassValid) {
        const token = 'session_' + Math.random().toString(36).substring(2) + Date.now();
        Store.set(KEYS.SESSION, {
          username: cleanUser || 'nandhu',
          token: token,
          provider: 'local',
          timestamp: Date.now()
        });
        Auth.hideLogin();
        Auth.updateUserUI({ username: cleanUser || 'nandhu' });
        AdminApp.toast('Welcome back! Master Admin session active.', 'success');
        AdminApp.refreshAll();
        Store.syncFromSupabase();
        return true;
      } else {
        Auth.showLogin('Incorrect credentials. Enter your Supabase email & password, or master key (nandhu / nandhu@admin2026).');
        return false;
      }
    },

    async logout(msg) {
      if (sb && sb.auth) {
        try {
          await sb.auth.signOut();
        } catch (e) {}
      }
      localStorage.removeItem(KEYS.SESSION);
      Auth.currentUser = null;
      Auth.showLogin(msg || 'You have been safely logged out.');
    },

    async changePassword(currentPass, newPass) {
      // If signed in with Supabase Auth, update via Supabase
      if (sb && sb.auth && Auth.currentUser) {
        const { error } = await sb.auth.updateUser({ password: newPass });
        if (error) throw error;
        AdminApp.toast('Supabase password updated!', 'success');
        return true;
      }

      const storedPassHash = Store.get(KEYS.AUTH, DEFAULT_PASS_HASH);
      const currentHash = await sha256(currentPass);
      if (currentHash !== storedPassHash) {
        throw new Error('Current password does not match.');
      }
      if (!newPass || newPass.length < 6) {
        throw new Error('New password must be at least 6 characters.');
      }
      const newHash = await sha256(newPass);
      Store.set(KEYS.AUTH, newHash);
      Store.logActivity('Admin master password updated.', 'shield');
      return true;
    }
  };

  /* ==========================================================================
     4. ADMIN APPLICATION CONTROLLER (VIEWS & ACTIONS)
     ========================================================================== */
  const AdminApp = {
    currentView: 'overview',

    init() {
      initializeData();

      // Setup DOM event listeners
      AdminApp.setupNav();
      AdminApp.setupSidePanel();
      AdminApp.setupAuthForm();
      AdminApp.setupQuickMenu();
      AdminApp.setupModals();
      AdminApp.setupSearchAndFilters();
      AdminApp.setupForms();

      // Check login status
      Auth.checkSession().then(isLoggedIn => {
        if (isLoggedIn) {
          AdminApp.switchView('overview');
          Store.syncFromSupabase();
        }
      });

      // Supabase manual sync trigger on badge click
      const sbBadge = document.getElementById('supabase-status-badge');
      if (sbBadge) {
        sbBadge.style.cursor = 'pointer';
        sbBadge.addEventListener('click', () => {
          Store.syncFromSupabase(true);
        });
      }
    },

    setupSidePanel() {
      const panel = document.querySelector('.app-right-panel');
      const toggleBtn = document.getElementById('btn-toggle-side-panel');
      const closeBtn = document.getElementById('btn-close-side-panel');

      function toggle() {
        if (!panel) return;
        panel.classList.toggle('collapsed');
        const isClosed = panel.classList.contains('collapsed');
        localStorage.setItem('nandhu_admin_side_panel_closed', isClosed ? 'true' : 'false');
        if (toggleBtn) {
          toggleBtn.style.background = isClosed ? '#ffffff' : '#eff2fe';
          toggleBtn.style.color = isClosed ? 'var(--text-muted)' : 'var(--primary-blue)';
        }
      }

      if (toggleBtn) toggleBtn.addEventListener('click', toggle);
      if (closeBtn) closeBtn.addEventListener('click', toggle);

      // Restore saved preference (or default closed on screens < 1300px to maximize work area)
      const savedPref = localStorage.getItem('nandhu_admin_side_panel_closed');
      if (panel && (savedPref === 'true' || (savedPref === null && window.innerWidth < 1300))) {
        panel.classList.add('collapsed');
        if (toggleBtn) {
          toggleBtn.style.background = '#ffffff';
          toggleBtn.style.color = 'var(--text-muted)';
        }
      }
    },

    toast(message, type = 'info') {
      const container = document.getElementById('admin-toast-container');
      if (!container) return;
      const el = document.createElement('div');
      el.className = `admin-toast ${type}`;
      el.innerHTML = `
        <span style="font-weight:700;">${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span>
        <span>${message}</span>
      `;
      container.appendChild(el);
      setTimeout(() => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(10px)';
        setTimeout(() => el.remove(), 200);
      }, 3500);
    },

    setupNav() {
      // Sidebar Navigation clicks
      document.querySelectorAll('.nav-link-btn, .sidebar-nav .nav-item').forEach(btn => {
        btn.addEventListener('click', () => {
          const view = btn.getAttribute('data-view');
          if (view) {
            AdminApp.switchView(view);
          }
        });
      });

      // Logout buttons
      const logoutBtn = document.getElementById('sidebar-logout-btn');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
          if (confirm('Are you sure you want to log out of the admin panel?')) {
            Auth.logout();
          }
        });
      }
    },

    setupAuthForm() {
      const form = document.getElementById('admin-login-form');
      if (!form) return;

      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const user = document.getElementById('auth-user-input').value.trim();
        const pass = document.getElementById('auth-pass-input').value.trim();
        const submitBtn = document.getElementById('auth-submit-btn') || form.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.disabled = true;

        try {
          await Auth.login(user, pass);
        } catch (err) {
          Auth.showLogin(err.message || 'Authentication error.');
        } finally {
          if (submitBtn) submitBtn.disabled = false;
        }
      });
    },

    setupQuickMenu() {
      const btn = document.getElementById('btn-quick-new');
      const menu = document.getElementById('quick-menu-popover');
      if (btn && menu) {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          menu.classList.toggle('open');
        });
        document.addEventListener('click', () => {
          menu.classList.remove('open');
        });
      }
    },

    switchView(viewId) {
      AdminApp.currentView = viewId;

      // Update Nav active state
      document.querySelectorAll('.nav-link-btn, .sidebar-nav .nav-item').forEach(btn => {
        if (btn.getAttribute('data-view') === viewId) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });

      // Update Views visibility
      document.querySelectorAll('.admin-sub-view, .admin-view').forEach(view => {
        if (view.id === `view-${viewId}`) {
          view.classList.add('active');
        } else {
          view.classList.remove('active');
        }
      });

      // Render view-specific data
      switch (viewId) {
        case 'overview':
          AdminApp.renderOverview();
          break;
        case 'clients':
          AdminApp.renderClients();
          break;
        case 'projects':
          AdminApp.renderProjects();
          break;
        case 'portfolio':
          AdminApp.renderPortfolio();
          break;
        case 'categories':
          AdminApp.renderCategories();
          break;
        case 'enquiries':
          AdminApp.renderEnquiries();
          break;
        case 'email':
          AdminApp.renderEmails();
          break;
        case 'content':
          AdminApp.renderContent();
          break;
        case 'settings':
          AdminApp.renderSettings();
          break;
      }

      AdminApp.updateBadgeCounts();
    },

    refreshAll() {
      AdminApp.updateBadgeCounts();
      AdminApp.switchView(AdminApp.currentView);
    },

    updateBadgeCounts() {
      const enquiries = Store.get(KEYS.ENQUIRIES, []);
      const newEnqCount = enquiries.filter(e => e.status === 'New' || e.status === 'Unread').length;

      const badgeSidebar = document.getElementById('nav-badge-enquiries');
      const badgeTopbar = document.getElementById('topbar-badge-enquiries');

      if (badgeSidebar) {
        badgeSidebar.textContent = newEnqCount;
        badgeSidebar.style.display = newEnqCount > 0 ? 'inline-block' : 'none';
      }
      if (badgeTopbar) {
        badgeTopbar.textContent = newEnqCount;
        badgeTopbar.style.display = newEnqCount > 0 ? 'flex' : 'none';
      }
    },

    /* ==========================================================================
       VIEW RENDERERS
       ========================================================================== */

    // 1. OVERVIEW (HIREISM INSPIRED)
    renderOverview() {
      const clients = Store.get(KEYS.CLIENTS, []);
      const projects = Store.get(KEYS.PROJECTS, []);
      const portfolio = Store.get(KEYS.PORTFOLIO, []);
      const enquiries = Store.get(KEYS.ENQUIRIES, []);

      // 1. Dynamic Greeting based on time
      const hour = new Date().getHours();
      const greeting = hour < 12 ? 'Good Morning Nandhu' : (hour < 17 ? 'Good Afternoon Nandhu' : 'Good Evening Nandhu');
      const greetingEl = document.getElementById('hero-greeting-heading');
      if (greetingEl) greetingEl.textContent = greeting;

      const newEnqCount = enquiries.filter(e => e.status === 'New' || e.status === 'Unread').length;
      const heroSub = document.getElementById('hero-banner-enq-count');
      if (heroSub) heroSub.textContent = `${newEnqCount} new ${newEnqCount === 1 ? 'inquiry' : 'inquiries'}`;

      // 2. Category badge counts
      const reelsCount = portfolio.filter(p => (p.categories || []).includes('instagram-reels') || (p.categories || []).includes('youtube-shorts')).length || 8;
      const podCount = portfolio.filter(p => (p.categories || []).includes('podcast-editing')).length || 3;
      const commCount = portfolio.filter(p => (p.categories || []).includes('commercial-videos')).length || 4;
      const talkCount = portfolio.filter(p => (p.categories || []).includes('talking-head')).length || 3;
      const motionCount = portfolio.filter(p => (p.categories || []).includes('motion-graphics')).length || 4;

      if (document.getElementById('badge-count-reels')) document.getElementById('badge-count-reels').textContent = `${reelsCount} Projects`;
      if (document.getElementById('badge-count-pod')) document.getElementById('badge-count-pod').textContent = `${podCount} Projects`;
      if (document.getElementById('badge-count-comm')) document.getElementById('badge-count-comm').textContent = `${commCount} Projects`;
      if (document.getElementById('badge-count-talk')) document.getElementById('badge-count-talk').textContent = `${talkCount} Projects`;
      if (document.getElementById('badge-count-motion')) document.getElementById('badge-count-motion').textContent = `${motionCount} Projects`;

      // 3. Hireism-style Progress Table (Recruitment Progress)
      const progressTbody = document.getElementById('overview-progress-tbody');
      if (progressTbody) {
        progressTbody.innerHTML = projects.slice(0, 6).map((prj, idx) => {
          const isActive = idx === 1; // 2nd row highlighted in vibrant blue just like the reference screenshot!
          const dotColor = prj.status === 'In Progress' ? 'dot-blue' : (prj.status === 'Review' ? 'dot-orange' : (prj.status === 'Completed' ? 'dot-green' : 'dot-purple'));
          return `
            <tr class="${isActive ? 'active-row' : ''}">
              <td>
                <div class="table-client-name">${prj.clientName || 'Creator'}</div>
              </td>
              <td>${prj.type}</td>
              <td>
                <span class="table-status-pill">
                  <span class="badge-dot ${dotColor}"></span>
                  <span>${prj.status}</span>
                </span>
              </td>
              <td style="text-align:right;">
                <button type="button" class="table-row-dots-btn" style="margin-left:auto; color:${isActive ? '#fff' : 'inherit'};" onclick="AdminApp.openEditProjectModal('${prj.id}')" title="Manage project">
                  •••
                </button>
              </td>
            </tr>
          `;
        }).join('');
      }

      // 4. Right Panel: New Enquiries ("New Applicants" in reference)
      const rightInquiries = document.getElementById('right-panel-inquiries-list');
      if (rightInquiries) {
        const avatars = ['av1', 'av2', 'av3', 'av4'];
        rightInquiries.innerHTML = enquiries.slice(0, 4).map((enq, idx) => {
          const avClass = avatars[idx % avatars.length];
          const initials = enq.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
          const cleanPhone = (enq.phone || '').replace(/[^0-9]/g, '');
          return `
            <div class="inquiry-row-item">
              <div class="inquiry-avatar ${avClass}">${initials}</div>
              <div class="inquiry-info">
                <div class="inquiry-name">${enq.name}</div>
                <div class="inquiry-brief">${enq.reason || 'Video Editing'}</div>
              </div>
              <div class="inquiry-actions-cluster">
                <a href="mailto:${enq.email}?subject=Re: Your Project Inquiry" class="mini-action-circle msg" title="Reply Email">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </a>
                ${cleanPhone ? `
                  <a href="https://wa.me/${cleanPhone}" target="_blank" class="mini-action-circle call" title="Chat on WhatsApp">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </a>
                ` : ''}
              </div>
            </div>
          `;
        }).join('');
      }

      // 5. Right Panel: Active Deliverables ("Ready for Training" in reference)
      const rightDeliv = document.getElementById('right-panel-deliverables-strip');
      if (rightDeliv) {
        rightDeliv.innerHTML = projects.slice(0, 3).map((prj, idx) => {
          const initials = prj.clientName ? prj.clientName[0].toUpperCase() : 'C';
          return `
            <div class="mini-deliverable-card">
              <div class="mini-deliv-avatar" style="display:flex; align-items:center; justify-content:center; font-weight:700; color:#4361ee; background:#eff2fe;">
                ${initials}
              </div>
              <div class="mini-deliv-name">${prj.clientName}</div>
              <button type="button" class="btn-mini-deliv" onclick="AdminApp.openEditProjectModal('${prj.id}')">Manage</button>
            </div>
          `;
        }).join('');
      }
    },

    // 2. CLIENT MANAGEMENT (MINI-CRM)
    renderClients(filteredList) {
      const clients = filteredList || Store.get(KEYS.CLIENTS, []);
      const tbody = document.getElementById('clients-table-body');
      if (!tbody) return;

      if (clients.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8"><div class="empty-state-box"><h3>No clients found</h3><p>Try adjusting your search or add a new client.</p></div></td></tr>`;
        return;
      }

      tbody.innerHTML = clients.map(cli => {
        const statusClass = cli.status ? cli.status.toLowerCase().replace(/\s+/g, '-') : 'lead';
        return `
          <tr>
            <td><code style="font-size:11px; color:var(--admin-text-muted);">${cli.id}</code></td>
            <td>
              <div class="table-cell-title">${cli.name}</div>
              <div class="table-cell-sub">${cli.company || 'Independent'}</div>
            </td>
            <td>
              <div>${cli.email}</div>
              <div class="table-cell-sub">${cli.phone || ''}</div>
            </td>
            <td>
              ${cli.whatsapp ? `<a href="https://wa.me/${cli.whatsapp.replace(/[^0-9]/g, '')}" target="_blank" style="color:#10b981; font-weight:600; text-decoration:none;">WhatsApp ↗</a>` : '—'}
            </td>
            <td><span class="mini-category-tag">${cli.type || 'Other'}</span></td>
            <td><span class="badge-status badge-${statusClass}"><span class="badge-dot"></span>${cli.status}</span></td>
            <td><span style="font-size:12px; color:var(--admin-text-muted);">${cli.dateAdded || '—'}</span></td>
            <td>
              <div class="table-action-btns">
                <button type="button" class="btn-table-action" onclick="AdminApp.viewClientProfile('${cli.id}')" title="View Profile">Profile</button>
                <button type="button" class="btn-table-action" onclick="AdminApp.openEditClientModal('${cli.id}')" title="Edit Client">Edit</button>
                <button type="button" class="btn-table-action danger" onclick="AdminApp.deleteClient('${cli.id}')" title="Delete">✕</button>
              </div>
            </td>
          </tr>
        `;
      }).join('');
    },

    // 3. PROJECT MANAGEMENT (INTERNAL WORK TRACKER)
    renderProjects(filteredList) {
      const projects = filteredList || Store.get(KEYS.PROJECTS, []);
      const tbody = document.getElementById('projects-table-body');
      if (!tbody) return;

      if (projects.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7"><div class="empty-state-box"><h3>No projects found</h3><p>Create a project to start tracking client work.</p></div></td></tr>`;
        return;
      }

      tbody.innerHTML = projects.map(prj => {
        const statusClass = prj.status ? prj.status.toLowerCase().replace(/\s+/g, '-') : 'planning';
        return `
          <tr>
            <td><code style="font-size:11px; color:var(--admin-text-muted);">${prj.id}</code></td>
            <td>
              <div class="table-cell-title">${prj.title}</div>
              <div class="table-cell-sub" style="color:var(--admin-accent); font-weight:500;">Client: ${prj.clientName}</div>
            </td>
            <td><span class="mini-category-tag">${prj.type}</span></td>
            <td><strong>${prj.budget || '—'}</strong></td>
            <td>
              <span style="font-size:12px; font-weight:500; color:${prj.status === 'Completed' ? '#059669' : '#0f172a'}">${prj.deadline || 'No deadline'}</span>
            </td>
            <td><span class="badge-status badge-${statusClass}"><span class="badge-dot"></span>${prj.status}</span></td>
            <td>
              <div class="table-action-btns">
                <button type="button" class="btn-table-action" onclick="AdminApp.openEditProjectModal('${prj.id}')">Edit</button>
                <button type="button" class="btn-table-action danger" onclick="AdminApp.deleteProject('${prj.id}')">✕</button>
              </div>
            </td>
          </tr>
        `;
      }).join('');
    },

    // 4. PORTFOLIO MANAGER (PUBLIC WEBSITE VIDEOS & SHOWCASE)
    renderFeaturedDeckSlots() {
      const container = document.getElementById('featured-deck-slots-grid');
      if (!container) return;

      const portfolio = Store.get(KEYS.PORTFOLIO, []);
      const verticalVideos = portfolio.filter(p => (p.isVertical || p.aspectRatio === '9:16') && p.status !== 'draft');
      const allVideos = portfolio.filter(p => p.status !== 'draft');
      const availableList = verticalVideos.length >= 3 ? verticalVideos : allVideos;

      // Determine current 3 slots
      let savedDeck = {};
      try {
        savedDeck = JSON.parse(localStorage.getItem('nandhu_featured_deck') || '{}');
      } catch (e) {}

      let slot1Id = savedDeck.left || (portfolio.find(p => p.featuredSlot === '1')?.id) || (availableList[0]?.id || 'video1');
      let slot2Id = savedDeck.center || (portfolio.find(p => p.featuredSlot === '2')?.id) || (availableList[1]?.id || 'video2');
      let slot3Id = savedDeck.right || (portfolio.find(p => p.featuredSlot === '3')?.id) || (availableList[2]?.id || 'video3');

      const slots = [
        { num: '1', key: 'left', label: 'Slot 1 — Left Card (Pop-Out)', currentId: slot1Id, badge: 'Left Card' },
        { num: '2', key: 'center', label: 'Slot 2 — Center Card (Hero Anchor)', currentId: slot2Id, badge: 'Hero Center', highlight: true },
        { num: '3', key: 'right', label: 'Slot 3 — Right Card (Pop-Out)', currentId: slot3Id, badge: 'Right Card' }
      ];

      container.innerHTML = slots.map(slot => {
        const selectedVideo = portfolio.find(p => p.id === slot.currentId) || portfolio[0] || {};
        const optionsHtml = availableList.map(v => {
          const isSelected = v.id === slot.currentId ? 'selected' : '';
          return `<option value="${v.id}" ${isSelected}>${v.title} (${v.aspectRatio || '9:16'})</option>`;
        }).join('');

        return `
          <div style="background:#ffffff; border:1px solid ${slot.highlight ? '#3b82f6' : '#e2e8f0'}; border-radius:12px; padding:12px; display:flex; flex-direction:column; gap:8px; box-shadow:${slot.highlight ? '0 4px 12px rgba(59,130,246,0.1)' : 'none'};">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-size:11.5px; font-weight:700; color:#0f172a;">${slot.label}</span>
              <span style="font-size:10px; font-weight:700; padding:2px 6px; border-radius:4px; background:${slot.highlight ? '#dbeafe' : '#f1f5f9'}; color:${slot.highlight ? '#1d4ed8' : '#475569'};">${slot.badge}</span>
            </div>
            
            <select id="featured-slot-${slot.key}-select" class="form-select-field" style="font-size:12px; padding:6px 10px;">
              ${optionsHtml}
            </select>

            <div style="font-size:11px; color:#64748b; display:flex; align-items:center; justify-content:space-between; margin-top:4px;">
              <span>Current: <strong>${selectedVideo.title || slot.currentId}</strong></span>
              <button type="button" class="btn-table-action" style="padding:2px 8px; font-size:11px;" onclick="AdminApp.playVideoPreview('${slot.currentId}')">▶ Preview</button>
            </div>
          </div>
        `;
      }).join('');
    },

    saveFeaturedDeck() {
      const leftSelect = document.getElementById('featured-slot-left-select');
      const centerSelect = document.getElementById('featured-slot-center-select');
      const rightSelect = document.getElementById('featured-slot-right-select');
      if (!leftSelect || !centerSelect || !rightSelect) return;

      const leftId = leftSelect.value;
      const centerId = centerSelect.value;
      const rightId = rightSelect.value;

      const deckConfig = { left: leftId, center: centerId, right: rightId };
      try {
        localStorage.setItem('nandhu_featured_deck', JSON.stringify(deckConfig));
      } catch (e) {}

      let portfolio = Store.get(KEYS.PORTFOLIO, []);
      portfolio = portfolio.map(item => {
        let slot = 'none';
        if (item.id === leftId) slot = '1';
        else if (item.id === centerId) slot = '2';
        else if (item.id === rightId) slot = '3';

        return {
          ...item,
          featuredSlot: slot,
          featured: slot !== 'none' || item.featured,
          showOnHome: slot !== 'none' ? true : (item.showOnHome !== false)
        };
      });

      Store.set(KEYS.PORTFOLIO, portfolio);
      AdminApp.renderPortfolio();
      AdminApp.toast('Featured 3-Reel Deck updated & synchronized!', 'success');
      Store.logActivity(`Updated Featured 3-Reel Deck (Center: ${centerId})`, 'star');
    },

    renderPortfolio(filteredList) {
      AdminApp.renderFeaturedDeckSlots();

      let portfolio = filteredList || Store.get(KEYS.PORTFOLIO, []);
      const grid = document.getElementById('portfolio-cards-grid');
      if (!grid) return;

      // Filter by placement if selector exists
      const placementFilter = document.getElementById('portfolio-placement-filter')?.value || '';
      if (placementFilter === 'home') {
        portfolio = portfolio.filter(p => p.showOnHome !== false);
      } else if (placementFilter === 'works') {
        portfolio = portfolio.filter(p => p.showOnWorks !== false);
      } else if (placementFilter === 'featured') {
        portfolio = portfolio.filter(p => p.featuredSlot === '1' || p.featuredSlot === '2' || p.featuredSlot === '3');
      }

      if (portfolio.length === 0) {
        grid.innerHTML = `<div class="empty-state-box" style="grid-column: 1/-1;"><h3>No portfolio videos</h3><p>Add your first video project to showcase on the public website.</p></div>`;
        return;
      }

      grid.innerHTML = portfolio.map(item => {
        const isReel = item.isVertical || item.aspectRatio === '9:16';
        const statusClass = item.status || 'published';

        const rawSource = (item.videoUrl || '').trim();
        const isWistia = rawSource.includes('wistia') || rawSource.includes('wistia-player') || rawSource.includes('fast.wistia');
        let mediaHtml = '';

        if (isWistia) {
          let mediaId = 'htvzexs3p8';
          const match = rawSource.match(/media-id="([a-zA-Z0-9]+)"/) || rawSource.match(/medias\/([a-zA-Z0-9]+)/) || rawSource.match(/embed\/([a-zA-Z0-9]+)/);
          if (match) mediaId = match[1];
          mediaHtml = `<wistia-player media-id="${mediaId}" aspect="${isReel ? '0.5625' : '1.7777777777777777'}" style="width:100%; height:100%; display:block; pointer-events:none;"></wistia-player>`;
        } else if (rawSource && (rawSource.endsWith('.mp4') || rawSource.includes('.mp4') || rawSource.includes('supabase.co/storage'))) {
          const videoSrc = rawSource.startsWith('http') || rawSource.startsWith('data:')
            ? rawSource
            : (rawSource.startsWith('../') ? rawSource : '../' + rawSource);
          mediaHtml = `<video src="${videoSrc}#t=0.5" preload="metadata" muted playsinline loop style="width:100%; height:100%; object-fit:cover; display:block;" onmouseenter="this.play().catch(()=>{})" onmouseleave="this.pause();"></video>`;
        } else {
          const isDummy = !item.poster || item.poster.includes('reel_travel') || item.poster.includes('hero_poster');
          if (!isDummy) {
            const posterUrl = item.poster.startsWith('http') || item.poster.startsWith('data:')
              ? item.poster
              : (item.poster.startsWith('../') ? item.poster : '../' + item.poster);
            mediaHtml = `<img src="${posterUrl}" alt="${item.title}" style="width:100%; height:100%; object-fit:cover; display:block;">`;
          } else {
            mediaHtml = `<div style="width:100%; height:100%; background:linear-gradient(135deg, #0f172a 0%, #1e293b 100%); display:flex; flex-direction:column; align-items:center; justify-content:center; color:#94a3b8; font-size:12px; font-weight:600;"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-bottom:6px; opacity:0.6;"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg><span>${item.title}</span></div>`;
          }
        }

        return `
          <div class="portfolio-admin-card">
            <div class="portfolio-card-media-wrap ${isReel ? 'aspect-reel' : ''}" onclick="AdminApp.playVideoPreview('${item.id}')" style="cursor:pointer;" title="Click to play video preview">
              ${mediaHtml}
              <div style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,0.25); opacity:0; transition:opacity 0.2s;" onmouseenter="this.style.opacity='1'" onmouseleave="this.style.opacity='0'">
                <span style="background:rgba(255,255,255,0.92); color:#1e293b; padding:8px 16px; border-radius:9999px; font-size:12px; font-weight:700; box-shadow:0 4px 12px rgba(0,0,0,0.2);">▶ Play Preview</span>
              </div>
              <div class="card-badges-overlay">
                <span class="badge-status badge-${statusClass}"><span class="badge-dot"></span>${item.status || 'published'}</span>
                ${item.featured ? `<span class="featured-star-pill">★ Featured</span>` : ''}
              </div>
            </div>
            <div class="portfolio-card-body">
              <div class="portfolio-card-title" onclick="AdminApp.playVideoPreview('${item.id}')" style="cursor:pointer;" title="Click to preview">${item.title}</div>
              <div class="portfolio-card-desc">${item.description || 'No description provided.'}</div>
              <div class="portfolio-tags-row">
                <span class="mini-category-tag" style="background:#e0f2fe; color:#0369a1;">${isReel ? '9:16 Vertical' : '16:9 Widescreen'}</span>
                ${item.showOnHome !== false ? '<span class="mini-category-tag" style="background:#dbeafe; color:#1e40af; font-weight:700;">Home</span>' : '<span class="mini-category-tag" style="background:#f1f5f9; color:#94a3b8; text-decoration:line-through;">Home</span>'}
                ${item.showOnWorks !== false ? '<span class="mini-category-tag" style="background:#f3e8ff; color:#6b21a8; font-weight:700;">Works</span>' : '<span class="mini-category-tag" style="background:#f1f5f9; color:#94a3b8; text-decoration:line-through;">Works</span>'}
                ${item.featuredSlot === '1' ? '<span class="mini-category-tag" style="background:#fef3c7; color:#92400e; font-weight:700;">★ Slot 1 (Left)</span>' : ''}
                ${item.featuredSlot === '2' ? '<span class="mini-category-tag" style="background:#fef3c7; color:#92400e; font-weight:700;">★ Slot 2 (Center)</span>' : ''}
                ${item.featuredSlot === '3' ? '<span class="mini-category-tag" style="background:#fef3c7; color:#92400e; font-weight:700;">★ Slot 3 (Right)</span>' : ''}
                ${(item.categories || []).slice(0, 2).map(cat => `<span class="mini-category-tag">${cat}</span>`).join('')}
              </div>
              <div class="portfolio-card-footer">
                <span style="font-size:11.5px; color:var(--admin-text-subtle);">${item.duration || '00:30'}</span>
                <div class="table-action-btns">
                  <button type="button" class="btn-table-action primary" onclick="AdminApp.playVideoPreview('${item.id}')">▶ Play</button>
                  <button type="button" class="btn-table-action" onclick="AdminApp.openEditPortfolioModal('${item.id}')">Edit</button>
                  <button type="button" class="btn-table-action danger" onclick="AdminApp.deletePortfolioVideo('${item.id}')">✕</button>
                </div>
              </div>
            </div>
          </div>
        `;
      }).join('');
    },

    // 5. CATEGORY MANAGEMENT
    renderCategories() {
      const categories = Store.get(KEYS.CATEGORIES, []);
      const portfolio = Store.get(KEYS.PORTFOLIO, []);
      const grid = document.getElementById('categories-cards-grid');
      if (!grid) return;

      grid.innerHTML = categories.map(cat => {
        const assignedProjects = portfolio.filter(p => (p.categories || []).includes(cat.slug || cat.id));
        return `
          <div class="category-admin-card">
            <div class="category-card-header">
              <div>
                <div class="category-card-title">${cat.name}</div>
                <a href="../work/${cat.slug || cat.id}/" target="_blank" class="category-slug-link" title="Open shareable public page">
                  /work/${cat.slug || cat.id}/ ↗
                </a>
              </div>
              <span class="badge-status ${cat.visible !== false ? 'badge-published' : 'badge-draft'}">
                <span class="badge-dot"></span>${cat.visible !== false ? 'Active' : 'Disabled'}
              </span>
            </div>
            <p class="category-card-desc">${cat.shortDescription || cat.headline || 'No description set.'}</p>
            <div class="category-deliverables-pills">
              ${(cat.deliverables || []).map(d => `<span class="category-deliv-pill">${d}</span>`).join('')}
            </div>
            <div class="category-card-footer">
              <span style="font-size:12.5px; font-weight:600; color:var(--admin-text-muted);">
                ${assignedProjects.length} Projects Assigned
              </span>
              <div class="table-action-btns">
                <button type="button" class="btn-table-action" onclick="AdminApp.openEditCategoryModal('${cat.id}')">Edit</button>
                <a href="../work/${cat.slug || cat.id}/" target="_blank" class="btn-table-action" style="text-decoration:none;">Preview ↗</a>
              </div>
            </div>
          </div>
        `;
      }).join('');
    },

    // 6. CLIENT ENQUIRIES & INBOX
    renderEnquiries(filteredList) {
      const enquiries = filteredList || Store.get(KEYS.ENQUIRIES, []);
      const tbody = document.getElementById('enquiries-table-body');
      if (!tbody) return;

      if (enquiries.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7"><div class="empty-state-box"><h3>Inbox is empty</h3><p>New inquiries submitted on your website contact form will appear here.</p></div></td></tr>`;
        return;
      }

      tbody.innerHTML = enquiries.map(enq => {
        const statusClass = enq.status ? enq.status.toLowerCase().replace(/\s+/g, '-') : 'new';
        return `
          <tr>
            <td><span style="font-size:12px; color:var(--admin-text-muted);">${enq.date}</span></td>
            <td>
              <div class="table-cell-title">${enq.name}</div>
              <div class="table-cell-sub">${enq.email}</div>
            </td>
            <td><span class="mini-category-tag">${enq.reason || 'Project Brief'}</span></td>
            <td><strong>${enq.budget || 'Flexible'}</strong></td>
            <td>
              <div style="max-width:240px; font-size:12.5px; color:var(--admin-text-muted); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                ${enq.message}
              </div>
            </td>
            <td><span class="badge-status badge-${statusClass}"><span class="badge-dot"></span>${enq.status}</span></td>
            <td>
              <div class="table-action-btns">
                <button type="button" class="btn-table-action" onclick="AdminApp.viewEnquiryDetails('${enq.id}')">View</button>
                <button type="button" class="btn-table-action" onclick="AdminApp.convertEnquiryToClient('${enq.id}')" title="Convert to Client">Convert</button>
                <button type="button" class="btn-table-action danger" onclick="AdminApp.deleteEnquiry('${enq.id}')">✕</button>
              </div>
            </td>
          </tr>
        `;
      }).join('');
    },

    // 7. EMAIL MANAGEMENT
    renderEmails() {
      const emails = Store.get(KEYS.EMAILS, INITIAL_EMAILS);
      const tbody = document.getElementById('emails-table-body');
      if (!tbody) return;

      tbody.innerHTML = emails.map((item, idx) => `
        <tr>
          <td>
            <div style="display:flex; align-items:center; gap:8px;">
              <strong style="font-family:var(--font-mono); font-size:13px;">${item.alias}</strong>
              <button type="button" class="btn-table-action" style="padding:2px 6px; font-size:10.5px;" onclick="AdminApp.copyEmail('${item.alias}')">Copy</button>
            </div>
          </td>
          <td><span class="mini-category-tag">${item.purpose || 'General'}</span></td>
          <td>
            <span style="font-family:var(--font-mono); font-size:12.5px; color:var(--admin-accent);">${item.destination}</span>
          </td>
          <td>
            <span class="badge-status ${item.status === 'Active' ? 'badge-active' : 'badge-inactive'}">
              <span class="badge-dot"></span>${item.status}
            </span>
          </td>
          <td>
            <div class="table-action-btns">
              <button type="button" class="btn-table-action" onclick="AdminApp.toggleEmailStatus(${idx})">
                ${item.status === 'Active' ? 'Disable' : 'Enable'}
              </button>
              <button type="button" class="btn-table-action danger" onclick="AdminApp.deleteEmail(${idx})">✕</button>
            </div>
          </td>
        </tr>
      `).join('');
    },

    // 8. WEBSITE CONTENT MANAGEMENT
    renderContent() {
      const content = Store.get(KEYS.CONTENT, INITIAL_CONTENT);
      document.getElementById('content-hero-heading').value = content.heroHeading || '';
      document.getElementById('content-hero-desc').value = content.heroDescription || '';
      document.getElementById('content-profile-img').value = content.profileImage || '';
      document.getElementById('content-email').value = content.contactEmail || '';
      document.getElementById('content-whatsapp').value = content.whatsappNumber || '';
      document.getElementById('content-phone').value = content.phone || '';
      document.getElementById('content-instagram').value = content.instagramUrl || '';
      document.getElementById('content-location').value = content.location || '';
    },

    // 9. SETTINGS & ADMINISTRATION
    renderSettings() {
      const settings = Store.get(KEYS.SETTINGS, INITIAL_SETTINGS);
      document.getElementById('setting-display-name').value = settings.displayName || '';
      document.getElementById('setting-title').value = settings.title || '';
      document.getElementById('setting-email').value = settings.email || '';
      document.getElementById('setting-whatsapp').value = settings.whatsapp || '';
      document.getElementById('setting-portfolio-url').value = settings.portfolioUrl || '';
    },

    /* ==========================================================================
     5. MODAL HANDLERS & CRUD OPERATIONS
     ========================================================================== */
    setupModals() {
      // Generic modal close
      document.querySelectorAll('.btn-modal-close, .modal-cancel-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.admin-modal-overlay').forEach(m => m.classList.remove('open'));
        });
      });

      // Drawer close
      const drawerClose = document.getElementById('btn-drawer-close');
      const drawer = document.getElementById('client-profile-drawer');
      if (drawerClose && drawer) {
        drawerClose.addEventListener('click', () => drawer.classList.remove('open'));
      }
    },

    openModal(modalId) {
      const modal = document.getElementById(modalId);
      if (modal) modal.classList.add('open');
    },

    closeModal(modalId) {
      const modal = document.getElementById(modalId);
      if (modal) modal.classList.remove('open');
    },

    // CLIENT CRUD
    openAddClientModal() {
      document.getElementById('client-form-id').value = '';
      document.getElementById('client-form-name').value = '';
      document.getElementById('client-form-company').value = '';
      document.getElementById('client-form-email').value = '';
      document.getElementById('client-form-phone').value = '';
      document.getElementById('client-form-whatsapp').value = '';
      document.getElementById('client-form-instagram').value = '';
      document.getElementById('client-form-type').value = 'Individual Creator';
      document.getElementById('client-form-status').value = 'Lead';
      document.getElementById('client-form-notes').value = '';
      document.getElementById('modal-client-title').textContent = 'Add New Client';
      AdminApp.openModal('modal-client-form');
    },

    openEditClientModal(clientId) {
      const clients = Store.get(KEYS.CLIENTS, []);
      const cli = clients.find(c => c.id === clientId);
      if (!cli) return;

      document.getElementById('client-form-id').value = cli.id;
      document.getElementById('client-form-name').value = cli.name;
      document.getElementById('client-form-company').value = cli.company || '';
      document.getElementById('client-form-email').value = cli.email || '';
      document.getElementById('client-form-phone').value = cli.phone || '';
      document.getElementById('client-form-whatsapp').value = cli.whatsapp || '';
      document.getElementById('client-form-instagram').value = cli.instagram || '';
      document.getElementById('client-form-type').value = cli.type || 'Individual Creator';
      document.getElementById('client-form-status').value = cli.status || 'Active Client';
      document.getElementById('client-form-notes').value = cli.notes || '';
      document.getElementById('modal-client-title').textContent = 'Edit Client: ' + cli.name;
      AdminApp.openModal('modal-client-form');
    },

    viewClientProfile(clientId) {
      const clients = Store.get(KEYS.CLIENTS, []);
      const projects = Store.get(KEYS.PROJECTS, []);
      const cli = clients.find(c => c.id === clientId);
      if (!cli) return;

      const drawer = document.getElementById('client-profile-drawer');
      const body = document.getElementById('drawer-profile-body');
      if (!drawer || !body) return;

      const clientProjects = projects.filter(p => p.clientId === cli.id || p.clientName === cli.name);

      body.innerHTML = `
        <div style="margin-bottom:20px;">
          <h3 style="font-size:20px; font-weight:700; margin-bottom:4px;">${cli.name}</h3>
          <p style="color:var(--admin-text-muted); font-size:13px;">${cli.company || 'Individual Creator'} · ${cli.type}</p>
          <div style="margin-top:10px;">
            <span class="badge-status badge-${cli.status.toLowerCase().replace(/\s+/g, '-')}"><span class="badge-dot"></span>${cli.status}</span>
          </div>
        </div>

        <div class="card-panel" style="padding:16px; margin-bottom:16px;">
          <div style="font-size:12px; font-weight:600; text-transform:uppercase; color:var(--admin-text-subtle); margin-bottom:8px;">Contact Info</div>
          <div style="font-size:13px; line-height:1.7;">
            <div><strong>Email:</strong> <a href="mailto:${cli.email}">${cli.email}</a></div>
            <div><strong>Phone:</strong> ${cli.phone || '—'}</div>
            <div><strong>WhatsApp:</strong> ${cli.whatsapp ? `<a href="https://wa.me/${cli.whatsapp.replace(/[^0-9]/g, '')}" target="_blank">${cli.whatsapp}</a>` : '—'}</div>
            <div><strong>Instagram:</strong> ${cli.instagram ? `<a href="https://instagram.com/${cli.instagram.replace('@','')}" target="_blank">${cli.instagram}</a>` : '—'}</div>
          </div>
        </div>

        <div class="card-panel" style="padding:16px; margin-bottom:16px;">
          <div style="font-size:12px; font-weight:600; text-transform:uppercase; color:var(--admin-text-subtle); margin-bottom:8px;">Internal Notes</div>
          <p style="font-size:13px; color:var(--admin-text-main); line-height:1.5;">${cli.notes || 'No notes added yet.'}</p>
        </div>

        <div>
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:12px;">
            <h4 style="font-size:14px; font-weight:700;">Associated Projects (${clientProjects.length})</h4>
            <button type="button" class="btn-admin btn-admin-secondary btn-admin-sm" onclick="AdminApp.openAddProjectForClient('${cli.id}', '${cli.name}')">+ New Project</button>
          </div>
          ${clientProjects.length === 0 ? '<p style="font-size:12.5px; color:var(--admin-text-muted);">No projects associated yet.</p>' : `
            <div style="display:flex; flex-direction:column; gap:8px;">
              ${clientProjects.map(p => `
                <div style="background:var(--admin-surface-subtle); border-radius:var(--radius-md); padding:10px 14px;">
                  <div style="font-weight:600; font-size:13px;">${p.title}</div>
                  <div style="display:flex; align-items:center; justify-content:space-between; margin-top:4px; font-size:11.5px; color:var(--admin-text-muted);">
                    <span>${p.type} · ${p.budget}</span>
                    <span class="badge-status badge-${p.status.toLowerCase().replace(/\s+/g, '-')}">${p.status}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          `}
        </div>
      `;

      drawer.classList.add('open');
    },

    deleteClient(clientId) {
      if (!confirm('Are you sure you want to delete this client? Associated projects will remain intact.')) return;
      let clients = Store.get(KEYS.CLIENTS, []);
      clients = clients.filter(c => c.id !== clientId);
      Store.set(KEYS.CLIENTS, clients);
      Store.deleteFromSupabase('clients', 'id', clientId);
      Store.logActivity(`Client deleted: ${clientId}`, 'trash');
      AdminApp.renderClients();
      AdminApp.toast('Client deleted successfully.', 'info');
    },

    // PROJECT CRUD
    openAddProjectModal() {
      const clients = Store.get(KEYS.CLIENTS, []);
      const clientSelect = document.getElementById('project-form-client');
      clientSelect.innerHTML = clients.map(c => `<option value="${c.id}" data-name="${c.name}">${c.name} (${c.company || 'Creator'})</option>`).join('');

      document.getElementById('project-form-id').value = '';
      document.getElementById('project-form-title').value = '';
      document.getElementById('project-form-type').value = 'Instagram Reels';
      document.getElementById('project-form-budget').value = '';
      document.getElementById('project-form-start').value = new Date().toISOString().split('T')[0];
      document.getElementById('project-form-deadline').value = '';
      document.getElementById('project-form-status').value = 'Planning';
      document.getElementById('project-form-desc').value = '';
      document.getElementById('project-form-notes').value = '';
      document.getElementById('project-form-links').value = '';
      document.getElementById('modal-project-title').textContent = 'Create New Project';
      AdminApp.openModal('modal-project-form');
    },

    openAddProjectForClient(clientId, clientName) {
      AdminApp.openAddProjectModal();
      const clientSelect = document.getElementById('project-form-client');
      if (clientSelect) clientSelect.value = clientId;
    },

    openEditProjectModal(projectId) {
      const projects = Store.get(KEYS.PROJECTS, []);
      const prj = projects.find(p => p.id === projectId);
      if (!prj) return;

      const clients = Store.get(KEYS.CLIENTS, []);
      const clientSelect = document.getElementById('project-form-client');
      clientSelect.innerHTML = clients.map(c => `<option value="${c.id}" data-name="${c.name}" ${c.id === prj.clientId ? 'selected' : ''}>${c.name} (${c.company || 'Creator'})</option>`).join('');

      document.getElementById('project-form-id').value = prj.id;
      document.getElementById('project-form-title').value = prj.title;
      document.getElementById('project-form-type').value = prj.type;
      document.getElementById('project-form-budget').value = prj.budget || '';
      document.getElementById('project-form-start').value = prj.startDate || '';
      document.getElementById('project-form-deadline').value = prj.deadline || '';
      document.getElementById('project-form-status').value = prj.status;
      document.getElementById('project-form-desc').value = prj.description || '';
      document.getElementById('project-form-notes').value = prj.notes || '';
      document.getElementById('project-form-links').value = prj.attachments || '';
      document.getElementById('modal-project-title').textContent = 'Edit Project: ' + prj.title;
      AdminApp.openModal('modal-project-form');
    },

    deleteProject(projectId) {
      if (!confirm('Are you sure you want to delete this internal project?')) return;
      let projects = Store.get(KEYS.PROJECTS, []);
      projects = projects.filter(p => p.id !== projectId);
      Store.set(KEYS.PROJECTS, projects);
      Store.deleteFromSupabase('projects', 'id', projectId);
      Store.logActivity(`Project deleted: ${projectId}`, 'trash');
      AdminApp.renderProjects();
      AdminApp.toast('Project deleted.', 'info');
    },

    // PORTFOLIO VIDEO CRUD
    openAddPortfolioModal() {
      const categories = Store.get(KEYS.CATEGORIES, []);
      const checklist = document.getElementById('portfolio-form-categories-checklist');
      checklist.innerHTML = categories.map(cat => `
        <label class="checkbox-label">
          <input type="checkbox" name="portfolio_cats" value="${cat.slug || cat.id}">
          <span>${cat.name}</span>
        </label>
      `).join('');

      document.getElementById('portfolio-form-id').value = '';
      document.getElementById('portfolio-form-title').value = '';
      document.getElementById('portfolio-form-desc').value = '';
      document.getElementById('portfolio-form-video-url').value = '';
      document.getElementById('portfolio-form-poster').value = '';
      document.getElementById('portfolio-form-aspect').value = '9:16';
      document.getElementById('portfolio-form-production').value = 'Shot & Edited by Me';
      document.getElementById('portfolio-form-software').value = 'CapCut Pro & Premiere';
      document.getElementById('portfolio-form-duration').value = '00:30';
      document.getElementById('portfolio-form-status').value = 'published';
      document.getElementById('portfolio-form-featured').checked = false;

      const showHomeInput = document.getElementById('portfolio-form-show-home');
      const showWorksInput = document.getElementById('portfolio-form-show-works');
      const slotInput = document.getElementById('portfolio-form-featured-slot');
      const sortInput = document.getElementById('portfolio-form-sort-order');
      const portfolio = Store.get(KEYS.PORTFOLIO, []);
      if (showHomeInput) showHomeInput.checked = true;
      if (showWorksInput) showWorksInput.checked = true;
      if (slotInput) slotInput.value = 'none';
      if (sortInput) sortInput.value = portfolio.length + 1;

      document.getElementById('modal-portfolio-title').textContent = 'Add New Portfolio Video';
      AdminApp.openModal('modal-portfolio-form');
    },

    openEditPortfolioModal(videoId) {
      const portfolio = Store.get(KEYS.PORTFOLIO, []);
      const item = portfolio.find(p => p.id === videoId);
      if (!item) return;

      const categories = Store.get(KEYS.CATEGORIES, []);
      const checklist = document.getElementById('portfolio-form-categories-checklist');
      checklist.innerHTML = categories.map(cat => {
        const checked = (item.categories || []).includes(cat.slug || cat.id);
        return `
          <label class="checkbox-label">
            <input type="checkbox" name="portfolio_cats" value="${cat.slug || cat.id}" ${checked ? 'checked' : ''}>
            <span>${cat.name}</span>
          </label>
        `;
      }).join('');

      document.getElementById('portfolio-form-id').value = item.id;
      document.getElementById('portfolio-form-title').value = item.title;
      document.getElementById('portfolio-form-desc').value = item.description || '';
      document.getElementById('portfolio-form-video-url').value = item.videoUrl || '';
      document.getElementById('portfolio-form-poster').value = item.poster || '';
      document.getElementById('portfolio-form-aspect').value = item.isVertical || item.aspectRatio === '9:16' ? '9:16' : '16:9';
      document.getElementById('portfolio-form-production').value = item.productionType || 'Shot & Edited by Me';
      document.getElementById('portfolio-form-software').value = item.software || '';
      document.getElementById('portfolio-form-duration').value = item.duration || '00:30';
      document.getElementById('portfolio-form-status').value = item.status || 'published';
      document.getElementById('portfolio-form-featured').checked = !!item.featured;

      const showHomeInput = document.getElementById('portfolio-form-show-home');
      const showWorksInput = document.getElementById('portfolio-form-show-works');
      const slotInput = document.getElementById('portfolio-form-featured-slot');
      const sortInput = document.getElementById('portfolio-form-sort-order');
      if (showHomeInput) showHomeInput.checked = item.showOnHome !== false;
      if (showWorksInput) showWorksInput.checked = item.showOnWorks !== false;
      if (slotInput) slotInput.value = item.featuredSlot || 'none';
      if (sortInput) sortInput.value = item.sortOrder || item.sort_order || 1;

      document.getElementById('modal-portfolio-title').textContent = 'Edit Video: ' + item.title;
      AdminApp.openModal('modal-portfolio-form');
    },

    deletePortfolioVideo(videoId) {
      if (!confirm('Are you sure you want to remove this project from the public portfolio?')) return;
      let portfolio = Store.get(KEYS.PORTFOLIO, []);
      portfolio = portfolio.filter(p => p.id !== videoId);
      Store.set(KEYS.PORTFOLIO, portfolio);
      Store.deleteFromSupabase('portfolio_projects', 'id', videoId);
      Store.logActivity(`Portfolio project removed: ${videoId}`, 'trash');
      AdminApp.renderPortfolio();
      AdminApp.toast('Portfolio video removed.', 'info');
    },

    playVideoPreview(id) {
      const portfolio = Store.get(KEYS.PORTFOLIO, []);
      const item = portfolio.find(p => p.id === id);
      if (!item) return;

      const modal = document.getElementById('modal-video-preview');
      const titleEl = document.getElementById('admin-preview-title');
      const embedWrap = document.getElementById('admin-preview-embed-wrap');
      const nativeVideo = document.getElementById('admin-preview-native-video');
      const metaEl = document.getElementById('admin-preview-meta');
      if (!modal) return;

      if (titleEl) titleEl.textContent = item.title || 'Video Preview';
      if (metaEl) metaEl.textContent = `${item.aspectRatio || '9:16'} · ${item.duration || '00:30'} · ${(item.categories || []).join(', ')}`;

      const rawSource = (item.videoUrl || '').trim();
      const isWistia = rawSource.includes('wistia') || rawSource.includes('wistia-player') || rawSource.includes('fast.wistia');
      const isEmbedSnippet = rawSource.includes('<') && rawSource.includes('>');
      const isYouTube = rawSource.includes('youtube.com') || rawSource.includes('youtu.be');
      const isVimeo = rawSource.includes('vimeo.com');

      if (isWistia || isEmbedSnippet || isYouTube || isVimeo) {
        if (nativeVideo) {
          nativeVideo.pause();
          nativeVideo.style.display = 'none';
        }
        if (embedWrap) {
          embedWrap.style.display = 'block';
          if (item.aspectRatio === '9:16' || item.isVertical) {
            embedWrap.style.width = '340px';
            embedWrap.style.maxWidth = '100%';
            embedWrap.style.minHeight = '500px';
            embedWrap.style.margin = '0 auto';
          } else {
            embedWrap.style.width = '100%';
            embedWrap.style.maxWidth = '720px';
            embedWrap.style.minHeight = '400px';
            embedWrap.style.margin = '0 auto';
          }
          if (isWistia) {
            if (!document.getElementById('wistia-admin-core-script')) {
              const wScript = document.createElement('script');
              wScript.id = 'wistia-admin-core-script';
              wScript.src = 'https://fast.wistia.com/player.js';
              wScript.async = true;
              document.head.appendChild(wScript);
            }
            if (isEmbedSnippet) {
              embedWrap.innerHTML = rawSource;
              embedWrap.querySelectorAll('script').forEach(oldScript => {
                const newScript = document.createElement('script');
                Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
                newScript.appendChild(document.createTextNode(oldScript.innerHTML));
                oldScript.parentNode.replaceChild(newScript, oldScript);
              });
            } else {
              let mediaId = rawSource;
              const match = rawSource.match(/medias\/([a-zA-Z0-9]+)/) || rawSource.match(/iframe\/([a-zA-Z0-9]+)/) || rawSource.match(/([a-zA-Z0-9]{8,12})/);
              if (match) mediaId = match[1];
              embedWrap.innerHTML = `
                <wistia-player media-id="${mediaId}" aspect="${item.aspectRatio === '9:16' ? '0.5625' : '1.7777777777777777'}"></wistia-player>
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
            embedWrap.innerHTML = `<iframe src="https://www.youtube.com/embed/${ytId}?autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="width:100%; height:400px; border:none;"></iframe>`;
          } else if (isVimeo) {
            const vimeoId = rawSource.split('vimeo.com/')[1]?.split('?')[0] || '';
            embedWrap.innerHTML = `<iframe src="https://player.vimeo.com/video/${vimeoId}?autoplay=1" frameborder="0" allow="autoplay; fullscreen" allowfullscreen style="width:100%; height:400px; border:none;"></iframe>`;
          } else {
            embedWrap.innerHTML = rawSource;
          }
        }
      } else {
        if (embedWrap) {
          embedWrap.style.display = 'none';
          embedWrap.innerHTML = '';
        }
        if (nativeVideo) {
          nativeVideo.style.display = 'block';
          const videoUrl = rawSource.startsWith('http') || rawSource.startsWith('data:') ? rawSource : (rawSource.startsWith('../') ? rawSource : '../' + rawSource);
          nativeVideo.src = videoUrl;
          nativeVideo.poster = (item.poster || '').startsWith('http') ? item.poster : ('../' + (item.poster || ''));
          nativeVideo.load();
          nativeVideo.play().catch(() => {});
        }
      }

      AdminApp.openModal('modal-video-preview');
    },

    closeVideoPreview() {
      const modal = document.getElementById('modal-video-preview');
      const embedWrap = document.getElementById('admin-preview-embed-wrap');
      const nativeVideo = document.getElementById('admin-preview-native-video');
      if (nativeVideo) {
        nativeVideo.pause();
        nativeVideo.src = '';
      }
      if (embedWrap) {
        embedWrap.innerHTML = '';
        embedWrap.style.display = 'none';
      }
      if (modal) {
        AdminApp.closeModal('modal-video-preview');
      }
    },

    // CATEGORY CRUD
    openAddCategoryModal() {
      document.getElementById('cat-form-id').value = '';
      document.getElementById('cat-form-name').value = '';
      document.getElementById('cat-form-slug').value = '';
      document.getElementById('cat-form-headline').value = '';
      document.getElementById('cat-form-desc').value = '';
      document.getElementById('cat-form-deliverables').value = '';
      document.getElementById('cat-form-visible').checked = true;
      document.getElementById('modal-cat-title').textContent = 'Create New Category';
      AdminApp.openModal('modal-category-form');
    },

    openEditCategoryModal(catId) {
      const categories = Store.get(KEYS.CATEGORIES, []);
      const cat = categories.find(c => c.id === catId);
      if (!cat) return;

      document.getElementById('cat-form-id').value = cat.id;
      document.getElementById('cat-form-name').value = cat.name;
      document.getElementById('cat-form-slug').value = cat.slug || cat.id;
      document.getElementById('cat-form-headline').value = cat.headline || '';
      document.getElementById('cat-form-desc').value = cat.shortDescription || '';
      document.getElementById('cat-form-deliverables').value = (cat.deliverables || []).join(', ');
      document.getElementById('cat-form-visible').checked = cat.visible !== false;
      document.getElementById('modal-cat-title').textContent = 'Edit Category: ' + cat.name;
      AdminApp.openModal('modal-category-form');
    },

    // ENQUIRIES ACTIONS
    viewEnquiryDetails(enqId) {
      const enquiries = Store.get(KEYS.ENQUIRIES, []);
      const enq = enquiries.find(e => e.id === enqId);
      if (!enq) return;

      // Mark as read if New
      if (enq.status === 'New' || enq.status === 'Unread') {
        enq.status = 'Read';
        Store.set(KEYS.ENQUIRIES, enquiries);
        AdminApp.updateBadgeCounts();
      }

      const modal = document.getElementById('modal-enquiry-view');
      const body = document.getElementById('modal-enquiry-body');
      if (!modal || !body) return;

      const cleanPhone = (enq.phone || '').replace(/[^0-9]/g, '');

      body.innerHTML = `
        <div style="margin-bottom:18px;">
          <div style="font-size:12px; color:var(--admin-text-subtle); margin-bottom:4px;">Received ${enq.date}</div>
          <h3 style="font-size:18px; font-weight:700;">${enq.name}</h3>
          <div style="font-size:13px; color:var(--admin-text-muted);">${enq.email} · ${enq.phone || 'No phone provided'}</div>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:18px;">
          <div style="background:var(--admin-surface-subtle); padding:12px; border-radius:var(--radius-md);">
            <div style="font-size:11px; text-transform:uppercase; color:var(--admin-text-subtle);">Requested Service</div>
            <div style="font-weight:600; font-size:14px; margin-top:2px;">${enq.reason || 'General'}</div>
          </div>
          <div style="background:var(--admin-surface-subtle); padding:12px; border-radius:var(--radius-md);">
            <div style="font-size:11px; text-transform:uppercase; color:var(--admin-text-subtle);">Budget Range</div>
            <div style="font-weight:600; font-size:14px; margin-top:2px; color:#047857;">${enq.budget || 'Flexible'}</div>
          </div>
        </div>

        <div style="margin-bottom:20px;">
          <div style="font-size:12px; font-weight:600; margin-bottom:6px;">Message / Brief:</div>
          <div style="background:#f8fafc; border:1px solid var(--admin-border); border-radius:var(--radius-md); padding:14px; font-size:13.5px; line-height:1.5; color:#1e293b;">
            ${enq.message}
          </div>
        </div>

        <div style="display:flex; flex-wrap:wrap; gap:10px; border-top:1px solid var(--admin-border); padding-top:16px;">
          <a href="mailto:${enq.email}?subject=Re: Your Project Inquiry — Nandhalal P S" class="btn-admin btn-admin-primary" style="text-decoration:none;">
            Reply via Email ✉
          </a>
          ${cleanPhone ? `
            <a href="https://wa.me/${cleanPhone}?text=Hi ${encodeURIComponent(enq.name)}! I received your inquiry about ${encodeURIComponent(enq.reason)} and would love to chat." target="_blank" class="btn-admin btn-admin-success" style="text-decoration:none;">
              Chat on WhatsApp ↗
            </a>
          ` : ''}
          <button type="button" class="btn-admin btn-admin-secondary" onclick="AdminApp.convertEnquiryToClient('${enq.id}')">
            Convert to Client +
          </button>
        </div>
      `;

      AdminApp.openModal('modal-enquiry-view');
      AdminApp.renderEnquiries();
    },

    convertEnquiryToClient(enqId) {
      const enquiries = Store.get(KEYS.ENQUIRIES, []);
      const enq = enquiries.find(e => e.id === enqId);
      if (!enq) return;

      AdminApp.closeModal('modal-enquiry-view');

      // Pre-fill Add Client Modal
      AdminApp.openAddClientModal();
      document.getElementById('client-form-name').value = enq.name || '';
      document.getElementById('client-form-email').value = enq.email || '';
      document.getElementById('client-form-phone').value = enq.phone || '';
      document.getElementById('client-form-whatsapp').value = enq.phone || '';
      document.getElementById('client-form-status').value = 'Contacted';
      document.getElementById('client-form-notes').value = `Converted from enquiry (${enq.reason}, Budget: ${enq.budget}). Original note: "${enq.message}"`;

      // Update enquiry status
      enq.status = 'Converted to Client';
      Store.set(KEYS.ENQUIRIES, enquiries);
      AdminApp.toast(`Enquiry for ${enq.name} marked as converted. Review and save client record.`, 'success');
    },

    deleteEnquiry(enqId) {
      if (!confirm('Are you sure you want to delete this enquiry?')) return;
      let enquiries = Store.get(KEYS.ENQUIRIES, []);
      enquiries = enquiries.filter(e => e.id !== enqId);
      Store.set(KEYS.ENQUIRIES, enquiries);
      Store.deleteFromSupabase('enquiries', 'id', enqId);
      AdminApp.renderEnquiries();
      AdminApp.updateBadgeCounts();
      AdminApp.toast('Enquiry deleted.', 'info');
    },

    // EMAIL ACTIONS
    openAddEmailModal() {
      document.getElementById('email-form-alias').value = '';
      document.getElementById('email-form-purpose').value = '';
      document.getElementById('email-form-destination').value = 'ndhumov@gmail.com';
      AdminApp.openModal('modal-email-form');
    },

    toggleEmailStatus(idx) {
      const emails = Store.get(KEYS.EMAILS, INITIAL_EMAILS);
      if (!emails[idx]) return;
      emails[idx].status = emails[idx].status === 'Active' ? 'Disabled' : 'Active';
      Store.set(KEYS.EMAILS, emails);
      Store.logActivity(`Email alias status changed: ${emails[idx].alias} (${emails[idx].status})`, 'mail');
      AdminApp.renderEmails();
      AdminApp.toast(`Alias ${emails[idx].alias} is now ${emails[idx].status}.`, 'info');
    },

    deleteEmail(idx) {
      if (!confirm('Are you sure you want to remove this email alias?')) return;
      const emails = Store.get(KEYS.EMAILS, INITIAL_EMAILS);
      const removed = emails.splice(idx, 1);
      Store.set(KEYS.EMAILS, emails);
      if (removed[0]?.alias) {
        Store.deleteFromSupabase('email_aliases', 'alias', removed[0].alias);
      }
      Store.logActivity(`Email alias removed: ${removed[0]?.alias}`, 'mail');
      AdminApp.renderEmails();
      AdminApp.toast('Email alias removed.', 'info');
    },

    copyEmail(email) {
      navigator.clipboard.writeText(email).then(() => {
        AdminApp.toast(`Copied "${email}" to clipboard!`, 'success');
      }).catch(() => {
        prompt('Copy email address:', email);
      });
    },

    /* ==========================================================================
       6. FORM SUBMISSIONS & SAVING
       ========================================================================== */
    setupForms() {
      // 1. Client Form Submit
      const clientForm = document.getElementById('client-form');
      if (clientForm) {
        clientForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const clients = Store.get(KEYS.CLIENTS, []);
          const id = document.getElementById('client-form-id').value;
          const isEdit = !!id;

          const record = {
            id: isEdit ? id : 'cli-' + Date.now().toString().substring(7),
            name: document.getElementById('client-form-name').value.trim(),
            company: document.getElementById('client-form-company').value.trim(),
            email: document.getElementById('client-form-email').value.trim(),
            phone: document.getElementById('client-form-phone').value.trim(),
            whatsapp: document.getElementById('client-form-whatsapp').value.trim(),
            instagram: document.getElementById('client-form-instagram').value.trim(),
            type: document.getElementById('client-form-type').value,
            status: document.getElementById('client-form-status').value,
            dateAdded: isEdit ? (clients.find(c => c.id === id)?.dateAdded || new Date().toISOString().split('T')[0]) : new Date().toISOString().split('T')[0],
            notes: document.getElementById('client-form-notes').value.trim()
          };

          if (isEdit) {
            const idx = clients.findIndex(c => c.id === id);
            if (idx !== -1) clients[idx] = record;
            Store.logActivity(`Updated client: ${record.name}`, 'user');
          } else {
            clients.unshift(record);
            Store.logActivity(`Added new client: ${record.name}`, 'user-plus');
          }

          Store.set(KEYS.CLIENTS, clients);
          AdminApp.closeModal('modal-client-form');
          AdminApp.renderClients();
          AdminApp.toast(`Client "${record.name}" saved successfully.`, 'success');
        });
      }

      // 2. Project Form Submit
      const projectForm = document.getElementById('project-form');
      if (projectForm) {
        projectForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const projects = Store.get(KEYS.PROJECTS, []);
          const id = document.getElementById('project-form-id').value;
          const isEdit = !!id;

          const clientSelect = document.getElementById('project-form-client');
          const clientName = clientSelect.options[clientSelect.selectedIndex]?.getAttribute('data-name') || '';

          const record = {
            id: isEdit ? id : 'prj-' + Date.now().toString().substring(7),
            title: document.getElementById('project-form-title').value.trim(),
            clientId: clientSelect.value,
            clientName: clientName,
            type: document.getElementById('project-form-type').value,
            budget: document.getElementById('project-form-budget').value.trim(),
            startDate: document.getElementById('project-form-start').value,
            deadline: document.getElementById('project-form-deadline').value,
            deliveryDate: isEdit ? (projects.find(p => p.id === id)?.deliveryDate || '') : '',
            status: document.getElementById('project-form-status').value,
            description: document.getElementById('project-form-desc').value.trim(),
            notes: document.getElementById('project-form-notes').value.trim(),
            attachments: document.getElementById('project-form-links').value.trim()
          };

          if (isEdit) {
            const idx = projects.findIndex(p => p.id === id);
            if (idx !== -1) projects[idx] = record;
            Store.logActivity(`Updated project: ${record.title}`, 'briefcase');
          } else {
            projects.unshift(record);
            Store.logActivity(`Created project: ${record.title}`, 'briefcase');
          }

          Store.set(KEYS.PROJECTS, projects);
          AdminApp.closeModal('modal-project-form');
          AdminApp.renderProjects();
          AdminApp.toast(`Project "${record.title}" saved successfully.`, 'success');
        });
      }

      // 3. Portfolio Video Form Submit
      const portfolioForm = document.getElementById('portfolio-form');
      if (portfolioForm) {
        portfolioForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const portfolio = Store.get(KEYS.PORTFOLIO, []);
          const id = document.getElementById('portfolio-form-id').value;
          const isEdit = !!id;

          const checkedCats = Array.from(document.querySelectorAll('input[name="portfolio_cats"]:checked')).map(cb => cb.value);
          const aspect = document.getElementById('portfolio-form-aspect').value;

          const showHome = document.getElementById('portfolio-form-show-home')?.checked !== false;
          const showWorks = document.getElementById('portfolio-form-show-works')?.checked !== false;
          const featuredSlot = document.getElementById('portfolio-form-featured-slot')?.value || 'none';
          const sortOrder = parseInt(document.getElementById('portfolio-form-sort-order')?.value, 10) || 1;

          // Clear slot collisions if assigning to a featured slot
          if (featuredSlot !== 'none') {
            portfolio.forEach(p => {
              if (p.id !== id && p.featuredSlot === featuredSlot) {
                p.featuredSlot = 'none';
              }
            });
          }

          const record = {
            id: isEdit ? id : 'video' + (portfolio.length + 1),
            title: document.getElementById('portfolio-form-title').value.trim(),
            description: document.getElementById('portfolio-form-desc').value.trim(),
            videoUrl: document.getElementById('portfolio-form-video-url').value.trim(),
            poster: document.getElementById('portfolio-form-poster').value.trim(),
            isVertical: aspect === '9:16',
            aspectRatio: aspect,
            categories: checkedCats,
            productionType: document.getElementById('portfolio-form-production').value,
            software: document.getElementById('portfolio-form-software').value.trim(),
            duration: document.getElementById('portfolio-form-duration').value.trim(),
            featured: document.getElementById('portfolio-form-featured').checked || featuredSlot !== 'none',
            featuredSlot: featuredSlot,
            showOnHome: showHome,
            showOnWorks: showWorks,
            sortOrder: sortOrder,
            sort_order: sortOrder,
            status: document.getElementById('portfolio-form-status').value
          };

          if (isEdit) {
            const idx = portfolio.findIndex(p => p.id === id);
            if (idx !== -1) portfolio[idx] = record;
            Store.logActivity(`Updated portfolio video: ${record.title}`, 'video');
          } else {
            portfolio.unshift(record);
            Store.logActivity(`Added portfolio video: ${record.title}`, 'video');
          }

          Store.set(KEYS.PORTFOLIO, portfolio);
          AdminApp.closeModal('modal-portfolio-form');
          AdminApp.renderPortfolio();
          AdminApp.toast(`Portfolio video "${record.title}" saved.`, 'success');
        });

        // Direct Video File Upload to Supabase Storage
        const videoFileInput = document.getElementById('portfolio-video-upload-file');
        const videoBtnText = document.getElementById('video-upload-btn-text');
        if (videoFileInput) {
          videoFileInput.addEventListener('change', async (e) => {
            const file = e.target.files && e.target.files[0];
            if (!file) return;
            if (!sb) {
              AdminApp.toast('Supabase client is not connected.', 'error');
              return;
            }
            try {
              if (videoBtnText) videoBtnText.textContent = 'Uploading...';
              AdminApp.toast(`Uploading ${file.name} to Supabase...`, 'info');
              const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
              const path = `videos/${Date.now()}_${cleanName}`;
              const { error } = await sb.storage.from('portfolio').upload(path, file, { cacheControl: '3600', upsert: true });
              if (error) throw error;
              const { data: pubData } = sb.storage.from('portfolio').getPublicUrl(path);
              document.getElementById('portfolio-form-video-url').value = pubData.publicUrl;
              if (videoBtnText) videoBtnText.textContent = '✓ Video Uploaded';
              AdminApp.toast('Video uploaded to Supabase Storage!', 'success');
            } catch (err) {
              console.error(err);
              AdminApp.toast('Upload failed: ' + (err.message || 'Check storage bucket'), 'error');
              if (videoBtnText) videoBtnText.textContent = '☁ Upload to Supabase';
            } finally {
              videoFileInput.value = '';
            }
          });
        }

        // Direct Poster Image Upload to Supabase Storage
        const posterFileInput = document.getElementById('portfolio-poster-upload-file');
        const posterBtnText = document.getElementById('poster-upload-btn-text');
        if (posterFileInput) {
          posterFileInput.addEventListener('change', async (e) => {
            const file = e.target.files && e.target.files[0];
            if (!file) return;
            if (!sb) {
              AdminApp.toast('Supabase client is not connected.', 'error');
              return;
            }
            try {
              if (posterBtnText) posterBtnText.textContent = 'Uploading...';
              AdminApp.toast(`Uploading ${file.name} to Supabase...`, 'info');
              const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
              const path = `posters/${Date.now()}_${cleanName}`;
              const { error } = await sb.storage.from('portfolio').upload(path, file, { cacheControl: '3600', upsert: true });
              if (error) throw error;
              const { data: pubData } = sb.storage.from('portfolio').getPublicUrl(path);
              document.getElementById('portfolio-form-poster').value = pubData.publicUrl;
              if (posterBtnText) posterBtnText.textContent = '✓ Poster Uploaded';
              AdminApp.toast('Poster uploaded to Supabase Storage!', 'success');
            } catch (err) {
              console.error(err);
              AdminApp.toast('Upload failed: ' + (err.message || 'Check storage bucket'), 'error');
              if (posterBtnText) posterBtnText.textContent = '🖼 Upload Poster';
            } finally {
              posterFileInput.value = '';
            }
          });
        }

        // Auto-detect aspect ratio & poster swatch from Wistia code input
        const videoUrlTextarea = document.getElementById('portfolio-form-video-url');
        if (videoUrlTextarea) {
          videoUrlTextarea.addEventListener('input', () => {
            const val = videoUrlTextarea.value.trim();
            const aspectSelect = document.getElementById('portfolio-form-aspect');
            if (aspectSelect) {
              if (val.includes('aspect="0.5625"') || val.includes('padding-top:177') || val.includes('9:16')) {
                aspectSelect.value = '9:16';
              } else if (val.includes('aspect="1.777') || val.includes('padding-top:56') || val.includes('16:9')) {
                aspectSelect.value = '16:9';
              }
            }
            const posterInput = document.getElementById('portfolio-form-poster');
            if (posterInput && (!posterInput.value || posterInput.value.includes('reel_travel'))) {
              const swatchMatch = val.match(/url\('(https:\/\/fast\.wistia\.com\/embed\/medias\/[a-zA-Z0-9]+\/swatch)'\)/) ||
                                  val.match(/(https:\/\/fast\.wistia\.com\/embed\/medias\/[a-zA-Z0-9]+\/swatch)/);
              if (swatchMatch) {
                posterInput.value = swatchMatch[1];
              }
            }
          });
        }
      }

      // 4. Category Form Submit
      const categoryForm = document.getElementById('category-form');
      if (categoryForm) {
        categoryForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const categories = Store.get(KEYS.CATEGORIES, []);
          const id = document.getElementById('cat-form-id').value;
          const isEdit = !!id;

          const slug = document.getElementById('cat-form-slug').value.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');
          const deliverablesArr = document.getElementById('cat-form-deliverables').value.split(',').map(s => s.trim()).filter(Boolean);

          const record = {
            id: isEdit ? id : slug,
            name: document.getElementById('cat-form-name').value.trim(),
            slug: slug,
            headline: document.getElementById('cat-form-headline').value.trim(),
            shortDescription: document.getElementById('cat-form-desc').value.trim(),
            deliverables: deliverablesArr,
            visible: document.getElementById('cat-form-visible').checked,
            featured: isEdit ? (categories.find(c => c.id === id)?.featured ?? true) : true
          };

          if (isEdit) {
            const idx = categories.findIndex(c => c.id === id);
            if (idx !== -1) categories[idx] = Object.assign(categories[idx], record);
            Store.logActivity(`Updated category: ${record.name}`, 'folder');
          } else {
            categories.push(record);
            Store.logActivity(`Created category: ${record.name}`, 'folder-plus');
          }

          Store.set(KEYS.CATEGORIES, categories);
          AdminApp.closeModal('modal-category-form');
          AdminApp.renderCategories();
          AdminApp.toast(`Category "${record.name}" saved.`, 'success');
        });
      }

      // 5. Email Alias Form Submit
      const emailForm = document.getElementById('email-form');
      if (emailForm) {
        emailForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const emails = Store.get(KEYS.EMAILS, INITIAL_EMAILS);
          const alias = document.getElementById('email-form-alias').value.trim();
          const purpose = document.getElementById('email-form-purpose').value.trim();
          const dest = document.getElementById('email-form-destination').value.trim();

          const record = {
            alias: alias.includes('@') ? alias : `${alias}@nandhuiie.tech`,
            purpose: purpose || 'General Inquiries',
            destination: dest || 'ndhumov@gmail.com',
            status: 'Active',
            created: new Date().toISOString().split('T')[0]
          };

          emails.push(record);
          Store.set(KEYS.EMAILS, emails);
          Store.logActivity(`Added business email alias: ${record.alias}`, 'mail');
          AdminApp.closeModal('modal-email-form');
          AdminApp.renderEmails();
          AdminApp.toast(`Email alias "${record.alias}" configured.`, 'success');
        });
      }

      // 6. Website Content Form Submit
      const contentForm = document.getElementById('website-content-form');
      if (contentForm) {
        contentForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const updated = {
            heroHeading: document.getElementById('content-hero-heading').value.trim(),
            heroDescription: document.getElementById('content-hero-desc').value.trim(),
            profileImage: document.getElementById('content-profile-img').value.trim(),
            contactEmail: document.getElementById('content-email').value.trim(),
            phone: document.getElementById('content-phone').value.trim(),
            whatsappNumber: document.getElementById('content-whatsapp').value.trim(),
            instagramUrl: document.getElementById('content-instagram').value.trim(),
            location: document.getElementById('content-location').value.trim(),
            status: 'published',
            lastUpdated: new Date().toISOString().split('T')[0]
          };

          Store.set(KEYS.CONTENT, updated);
          Store.logActivity('Website content published.', 'globe');
          AdminApp.toast('Website content updated and published live!', 'success');
        });
      }

      // 7. Password Change Form
      const passwordForm = document.getElementById('settings-password-form');
      if (passwordForm) {
        passwordForm.addEventListener('submit', async (e) => {
          e.preventDefault();
          const curr = document.getElementById('pass-current').value;
          const next = document.getElementById('pass-new').value;
          const confirm = document.getElementById('pass-confirm').value;

          if (next !== confirm) {
            AdminApp.toast('New passwords do not match.', 'error');
            return;
          }

          try {
            await Auth.changePassword(curr, next);
            passwordForm.reset();
            AdminApp.toast('Password changed successfully. Use your new password on next login.', 'success');
          } catch (err) {
            AdminApp.toast(err.message, 'error');
          }
        });
      }

      // 8. General Settings Form
      const settingsForm = document.getElementById('general-settings-form');
      if (settingsForm) {
        settingsForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const updated = {
            displayName: document.getElementById('setting-display-name').value.trim(),
            title: document.getElementById('setting-title').value.trim(),
            email: document.getElementById('setting-email').value.trim(),
            whatsapp: document.getElementById('setting-whatsapp').value.trim(),
            portfolioUrl: document.getElementById('setting-portfolio-url').value.trim(),
            sessionTimeoutHours: 48
          };
          Store.set(KEYS.SETTINGS, updated);
          AdminApp.toast('Admin settings updated.', 'success');
        });
      }
    },

    /* ==========================================================================
       7. SEARCH & FILTER HANDLERS
       ========================================================================== */
    setupSearchAndFilters() {
      // Global topbar search
      const globalSearch = document.getElementById('admin-global-search');
      if (globalSearch) {
        globalSearch.addEventListener('input', (e) => {
          const q = e.target.value.toLowerCase().trim();
          if (!q) return;

          // Search clients or projects depending on current view or switch
          if (AdminApp.currentView === 'clients') {
            const list = Store.get(KEYS.CLIENTS, []);
            AdminApp.renderClients(list.filter(c => (c.name || '').toLowerCase().includes(q) || (c.company || '').toLowerCase().includes(q) || (c.email || '').toLowerCase().includes(q)));
          } else if (AdminApp.currentView === 'projects') {
            const list = Store.get(KEYS.PROJECTS, []);
            AdminApp.renderProjects(list.filter(p => (p.title || '').toLowerCase().includes(q) || (p.clientName || '').toLowerCase().includes(q)));
          } else if (AdminApp.currentView === 'portfolio') {
            const list = Store.get(KEYS.PORTFOLIO, []);
            AdminApp.renderPortfolio(list.filter(p => (p.title || '').toLowerCase().includes(q) || (p.description || '').toLowerCase().includes(q)));
          } else if (AdminApp.currentView === 'enquiries') {
            const list = Store.get(KEYS.ENQUIRIES, []);
            AdminApp.renderEnquiries(list.filter(e => (e.name || '').toLowerCase().includes(q) || (e.message || '').toLowerCase().includes(q)));
          }
        });
      }

      // Clients search & status filter
      const clientSearch = document.getElementById('clients-search-input');
      const clientStatusFilter = document.getElementById('clients-status-filter');
      const filterClients = () => {
        const q = (clientSearch?.value || '').toLowerCase().trim();
        const st = clientStatusFilter?.value || '';
        let list = Store.get(KEYS.CLIENTS, []);
        if (q) {
          list = list.filter(c => c.name.toLowerCase().includes(q) || (c.company || '').toLowerCase().includes(q) || c.email.toLowerCase().includes(q));
        }
        if (st) {
          list = list.filter(c => c.status === st);
        }
        AdminApp.renderClients(list);
      };
      if (clientSearch) clientSearch.addEventListener('input', filterClients);
      if (clientStatusFilter) clientStatusFilter.addEventListener('change', filterClients);

      // Projects search & filter
      const projSearch = document.getElementById('projects-search-input');
      const projStatusFilter = document.getElementById('projects-status-filter');
      const filterProjects = () => {
        const q = (projSearch?.value || '').toLowerCase().trim();
        const st = projStatusFilter?.value || '';
        let list = Store.get(KEYS.PROJECTS, []);
        if (q) {
          list = list.filter(p => p.title.toLowerCase().includes(q) || (p.clientName || '').toLowerCase().includes(q));
        }
        if (st) {
          list = list.filter(p => p.status === st);
        }
        AdminApp.renderProjects(list);
      };
      if (projSearch) projSearch.addEventListener('input', filterProjects);
      if (projStatusFilter) projStatusFilter.addEventListener('change', filterProjects);

      // Portfolio filter
      const portSearch = document.getElementById('portfolio-search-input');
      const portRatioFilter = document.getElementById('portfolio-ratio-filter');
      const portPlacementFilter = document.getElementById('portfolio-placement-filter');
      const filterPortfolio = () => {
        const q = (portSearch?.value || '').toLowerCase().trim();
        const ratio = portRatioFilter?.value || '';
        const placement = portPlacementFilter?.value || '';
        let list = Store.get(KEYS.PORTFOLIO, []);
        if (q) {
          list = list.filter(p => p.title.toLowerCase().includes(q) || (p.description || '').toLowerCase().includes(q));
        }
        if (ratio) {
          list = list.filter(p => (p.aspectRatio === ratio) || (ratio === '9:16' ? p.isVertical : !p.isVertical));
        }
        if (placement === 'home') {
          list = list.filter(p => p.showOnHome !== false);
        } else if (placement === 'works') {
          list = list.filter(p => p.showOnWorks !== false);
        } else if (placement === 'featured') {
          list = list.filter(p => p.featuredSlot === '1' || p.featuredSlot === '2' || p.featuredSlot === '3');
        }
        AdminApp.renderPortfolio(list);
      };
      if (portSearch) portSearch.addEventListener('input', filterPortfolio);
      if (portRatioFilter) portRatioFilter.addEventListener('change', filterPortfolio);
      if (portPlacementFilter) portPlacementFilter.addEventListener('change', filterPortfolio);

      // Enquiries filter
      const enqSearch = document.getElementById('enquiries-search-input');
      const enqStatusFilter = document.getElementById('enquiries-status-filter');
      const filterEnquiries = () => {
        const q = (enqSearch?.value || '').toLowerCase().trim();
        const st = enqStatusFilter?.value || '';
        let list = Store.get(KEYS.ENQUIRIES, []);
        if (q) {
          list = list.filter(e => e.name.toLowerCase().includes(q) || e.message.toLowerCase().includes(q) || e.email.toLowerCase().includes(q));
        }
        if (st) {
          list = list.filter(e => e.status === st);
        }
        AdminApp.renderEnquiries(list);
      };
      if (enqSearch) enqSearch.addEventListener('input', filterEnquiries);
      if (enqStatusFilter) enqStatusFilter.addEventListener('change', filterEnquiries);
    },

    /* ==========================================================================
       8. DATA BACKUP EXPORT & IMPORT
       ========================================================================== */
    exportAllData() {
      const backup = {
        exportedAt: new Date().toISOString(),
        version: '1.0.0',
        clients: Store.get(KEYS.CLIENTS, []),
        projects: Store.get(KEYS.PROJECTS, []),
        portfolio: Store.get(KEYS.PORTFOLIO, []),
        categories: Store.get(KEYS.CATEGORIES, []),
        emails: Store.get(KEYS.EMAILS, []),
        enquiries: Store.get(KEYS.ENQUIRIES, []),
        websiteContent: Store.get(KEYS.CONTENT, {}),
        settings: Store.get(KEYS.SETTINGS, {})
      };

      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backup, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `nandhu_portfolio_backup_${new Date().toISOString().split('T')[0]}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();

      AdminApp.toast('All dashboard & portfolio data exported to JSON backup.', 'success');
    },

    importData(fileInput) {
      const file = fileInput.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          if (data.clients) Store.set(KEYS.CLIENTS, data.clients);
          if (data.projects) Store.set(KEYS.PROJECTS, data.projects);
          if (data.portfolio) Store.set(KEYS.PORTFOLIO, data.portfolio);
          if (data.categories) Store.set(KEYS.CATEGORIES, data.categories);
          if (data.emails) Store.set(KEYS.EMAILS, data.emails);
          if (data.enquiries) Store.set(KEYS.ENQUIRIES, data.enquiries);
          if (data.websiteContent) Store.set(KEYS.CONTENT, data.websiteContent);
          if (data.settings) Store.set(KEYS.SETTINGS, data.settings);

          Store.logActivity('Full database restored from JSON backup.', 'database');
          AdminApp.refreshAll();
          AdminApp.toast('Data restored successfully from backup file!', 'success');
        } catch (err) {
          AdminApp.toast('Failed to parse backup file: Invalid JSON.', 'error');
        }
      };
      reader.readAsText(file);
    },

    downloadUpdatedPortfolioDataFile() {
      const categories = Store.get(KEYS.CATEGORIES, []);
      const portfolio = Store.get(KEYS.PORTFOLIO, []);

      // Build pure JS file content identical to portfolio-data.js structure
      const jsContent = `/**
 * CENTRALIZED PORTFOLIO DATA & CATEGORY SYSTEM
 * Exported from Nandhalal P S Admin Dashboard at ${new Date().toISOString()}
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    const data = factory();
    root.PORTFOLIO_DATA = data;
    root.CATEGORIES_CONFIG = data.categories;
    root.PROJECTS_DATABASE = data.projects;
  }
}(typeof self !== 'undefined' ? self : this, function () {

  const categories = ${JSON.stringify(categories, null, 2)};

  const projects = ${JSON.stringify(portfolio, null, 2)};

  return {
    categories: categories,
    projects: projects,
    getProjectById: function (id) {
      return projects.find(function (p) { return p.id === id; }) || null;
    },
    getProjectsByCategory: function (categorySlug) {
      if (!categorySlug || categorySlug === 'all') return projects;
      return projects.filter(function (p) {
        return Array.isArray(p.categories) && p.categories.indexOf(categorySlug) !== -1;
      });
    }
  };
}));
`;

      const dataStr = 'data:text/javascript;charset=utf-8,' + encodeURIComponent(jsContent);
      const dl = document.createElement('a');
      dl.setAttribute('href', dataStr);
      dl.setAttribute('download', 'portfolio-data.js');
      document.body.appendChild(dl);
      dl.click();
      dl.remove();
      AdminApp.toast('Generated updated portfolio-data.js file ready to commit!', 'success');
    }
  };

  // Expose AdminApp to window for inline onclick calls
  window.AdminApp = AdminApp;

  // Initialize once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', AdminApp.init);
  } else {
    AdminApp.init();
  }

})();
