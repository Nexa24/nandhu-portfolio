/**
 * CENTRALIZED PORTFOLIO DATA & CATEGORY SYSTEM
 * Single source of truth for projects, categories, client-specific portfolios & smart filtering.
 * Nandhalal P S — Video Editor, Videographer & Content Creator
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

  /* ==========================================================================
     1. CATEGORIES CONFIGURATION (10 DEDICATED SERVICE SPECIALTIES)
     ========================================================================== */
  const categories = [
    {
      id: 'all',
      name: 'All Projects',
      slug: 'all',
      headline: 'Complete Video Editing Showcase',
      badge: 'All Formats & Styles',
      shortDescription: 'A complete collection of selected short-form reels, commercial videos, talking-head dialogue, and cinematic productions.',
      heroImage: 'assets/hero_poster.png',
      seoTitle: 'Selected Video Editing Works & Portfolio — Nandhalal P S',
      seoDescription: 'Comprehensive video editing portfolio of Nandhalal P S: YouTube Shorts, Instagram Reels, Podcasts, Commercials, and Cinematic Visuals.',
      whatsappMessage: 'Hi Nandhu! I checked out your complete video editing portfolio and would like to discuss a project with you: ',
      clientShareText: 'Hi! Here is the complete video editing and creative portfolio of Nandhalal P S: ',
      deliverables: ['9:16 Vertical Reels', '16:9 Commercials', 'Subtitles & Motion', 'Sound Design'],
      featured: true,
      visible: true
    },
    {
      id: 'youtube-shorts',
      name: 'YouTube Shorts',
      slug: 'youtube-shorts',
      headline: 'YouTube Shorts Editing',
      badge: '9:16 High-Retention Short-Form',
      shortDescription: 'Engaging short-form videos designed to capture attention in the first 3 seconds, maintain viewer interest, and drive channel subscriber growth.',
      heroImage: 'assets/reel_1.jpg',
      seoTitle: 'YouTube Shorts Video Editor — Nandhalal P S',
      seoDescription: 'Professional YouTube Shorts video editing with fast hooks, dynamic text animations, rhythmic cuts, and tailored sound design.',
      whatsappMessage: 'Hi Nandhu! I saw your YouTube Shorts editing portfolio and would like to discuss an edit for my channel: ',
      clientShareText: 'Hi! Here are some of my selected YouTube Shorts editing projects. Feel free to take a look: ',
      deliverables: ['First 3-Second Hooks', 'Animated Captions & Zoom Cuts', 'Dynamic Foley Sound FX', 'Audience Retention Pacing'],
      featured: true,
      visible: true
    },
    {
      id: 'instagram-reels',
      name: 'Instagram Reels',
      slug: 'instagram-reels',
      headline: 'Instagram Reels & Viral Content',
      badge: '9:16 Aesthetic & Dynamic Social',
      shortDescription: 'Punchy, trend-aware vertical edits combining rhythmic pacing, seamless transitions, typography, and crisp visual hooks for brands and creators.',
      heroImage: 'assets/reel_travel.jpg',
      seoTitle: 'Instagram Reels Video Editor — Nandhalal P S',
      seoDescription: 'High-impact Instagram Reels editing designed for creators and brands. Rhythmic beat-synced cuts, speed ramps, and engaging audio styling.',
      whatsappMessage: 'Hi Nandhu! I checked your Instagram Reels editing showcase and want to collaborate on vertical content: ',
      clientShareText: 'Hi! Here are selected Instagram Reels and viral short-form edits by Nandhalal P S: ',
      deliverables: ['Beat-Matched Edits', 'Trend-Aware Visual Hooks', 'Clean Color Grading', 'Seamless Loop Transitions'],
      featured: true,
      visible: true
    },
    {
      id: 'podcast-editing',
      name: 'Podcast Editing',
      slug: 'podcast-editing',
      headline: 'Podcast Video Editing',
      badge: 'Multi-Speaker & Dialogue Mastery',
      shortDescription: 'Clean, engaging podcast edits with dynamic cuts, animated subtitles, speaker framing, audio cleanup, and viral snackable highlight clips.',
      heroImage: 'assets/reel_2.jpg',
      seoTitle: 'Podcast Video Editor & Highlight Specialist — Nandhalal P S',
      seoDescription: 'Professional podcast video editing: multi-camera speaker switching, voice denoise EQ, highlight extraction, and vertical clip packaging.',
      whatsappMessage: 'Hi Nandhu! I saw your podcast video editing portfolio and need an editor for my show: ',
      clientShareText: 'Hi! Here are selected podcast video edits and viral highlight clips by Nandhalal P S: ',
      deliverables: ['Multi-Speaker Auto Switching', 'Voice Clarity EQ & De-noise', 'Keyword Animated Subtitles', 'B-Roll & Graphic Insertions'],
      featured: true,
      visible: true
    },
    {
      id: 'motion-graphics',
      name: 'Motion Graphics',
      slug: 'motion-graphics',
      headline: 'Motion Graphics & Visual Editing',
      badge: 'Typography & Visual Impact',
      shortDescription: 'Creative motion-driven visuals, kinetic typography, shapes, and animated graphic elements designed to make content clearer and more memorable.',
      heroImage: 'assets/reel_retro.jpg',
      seoTitle: 'Motion Graphics & Kinetic Title Editor — Nandhalal P S',
      seoDescription: 'Creative motion graphics, kinetic title typography, UI callouts, and animated brand overlays crafted for modern digital video.',
      whatsappMessage: 'Hi Nandhu! I saw your motion graphics and visual editing portfolio and would like to discuss custom motion work: ',
      clientShareText: 'Hi! Take a look at these motion graphics and visual editing projects by Nandhalal P S: ',
      deliverables: ['Kinetic Typography Titles', 'Lower Thirds & Brand Badges', 'UI Mockup Animations', 'Vector Graphic Overlays'],
      featured: true,
      visible: true
    },
    {
      id: 'commercial-videos',
      name: 'Commercial Videos',
      slug: 'commercial-videos',
      headline: 'Commercial Video Production & Editing',
      badge: 'Brand & Product Showcases',
      shortDescription: 'Polished commercial edits and advertisements balancing product highlights, premium aesthetics, sound design, and clear call-to-action impact.',
      heroImage: 'assets/work5.jpg',
      seoTitle: 'Commercial Video Editor & Product Ads — Nandhalal P S',
      seoDescription: 'High-conversion commercial video editing for brands, ecommerce products, and digital ads in 16:9 widescreen and 9:16 vertical formats.',
      whatsappMessage: 'Hi Nandhu! I saw your commercial video editing work and want to discuss a promotional video for our brand: ',
      clientShareText: 'Hi! Here are some of my commercial video editing and brand ad projects: ',
      deliverables: ['Product Feature Spotlights', 'Brand Color Science & Grading', 'Transient Sound Design', 'Multi-Platform Ad Resizes'],
      featured: true,
      visible: true
    },
    {
      id: 'talking-head',
      name: 'Talking Head Videos',
      slug: 'talking-head',
      headline: 'Talking Head & Educational Editing',
      badge: 'Personality & Authority Content',
      shortDescription: 'Personality-driven video editing featuring crisp voice optimization, smooth punch-in framing shifts, contextual b-roll, and educational clarity.',
      heroImage: 'assets/reel_louvre.jpg',
      seoTitle: 'Talking Head Video Editor for Creators — Nandhalal P S',
      seoDescription: 'Talking head video editing with animated subtitles, zoom emphasis, b-roll insertions, and conversational pacing for coaches and founders.',
      whatsappMessage: 'Hi Nandhu! I checked your talking-head video editing portfolio and want to edit my educational content: ',
      clientShareText: 'Hi! Here are selected talking-head and educational edits by Nandhalal P S: ',
      deliverables: ['Smooth Punch-In Zooms', 'Dialogue Pacing Optimization', 'B-Roll & Diagram Cutaways', 'Animated Word-by-Word Captions'],
      featured: true,
      visible: true
    },
    {
      id: 'fast-cut-editing',
      name: 'Fast-Cut Editing',
      slug: 'fast-cut-editing',
      headline: 'Fast-Cut & High-Energy Editing',
      badge: 'Speed Ramps & Beat Syncing',
      shortDescription: 'High-octane editing with millisecond beat alignment, dynamic speed ramps, whip transitions, and heavy audio sound design that keeps eyes glued.',
      heroImage: 'assets/work1.jpg',
      seoTitle: 'Fast-Cut & Kinetic Video Editor — Nandhalal P S',
      seoDescription: 'High-energy fast-cut video editing with speed ramping, beat matching, impact sound effects, and seamless motion flow.',
      whatsappMessage: 'Hi Nandhu! I loved your high-energy fast-cut editing reel and want to create a dynamic edit: ',
      clientShareText: 'Hi! Take a look at these high-energy fast-cut edits and transition reels by Nandhalal P S: ',
      deliverables: ['Precision Beat Matching', 'Velocity Speed Ramps', 'Custom Impact Foley & SFX', 'Whip & Match Cut Flow'],
      featured: true,
      visible: true
    },
    {
      id: 'cinematic-editing',
      name: 'Cinematic Editing',
      slug: 'cinematic-editing',
      headline: 'Cinematic Visual Storytelling',
      badge: 'Atmosphere, Pacing & Look',
      shortDescription: 'Atmospheric storytelling with evocative natural lighting, thoughtful cadence, rich color tone styling, and immersive cinematic soundscapes.',
      heroImage: 'assets/work2.jpg',
      seoTitle: 'Cinematic Video Editor & Color Grading — Nandhalal P S',
      seoDescription: 'Cinematic video storytelling, mood pacing, natural color palette enhancement, and ambient audio design for films, travel, and documentaries.',
      whatsappMessage: 'Hi Nandhu! I was really impressed by your cinematic editing work and would like to collaborate on a film project: ',
      clientShareText: 'Hi! Here are selected cinematic editing and visual storytelling projects by Nandhalal P S: ',
      deliverables: ['Atmospheric Pacing & Rhythm', 'Moody Color Grading & Film Look', 'Spatial Ambience & Score Sync', 'Natural Light Preservation'],
      featured: true,
      visible: true
    },
    {
      id: 'youtube-long-form',
      name: 'YouTube Long-Form',
      slug: 'youtube-long-form',
      headline: 'YouTube Long-Form Video Editing',
      badge: '16:9 Storytelling & High AVD',
      shortDescription: 'Structured 16:9 widescreen video editing focused on audience retention, chapter pacing, relevant b-roll integration, and professional audio leveling.',
      heroImage: 'assets/work3.jpg',
      seoTitle: 'YouTube Long-Form Video Editor — Nandhalal P S',
      seoDescription: 'Long-form YouTube video editing engineered for high Average View Duration (AVD), retention graphs, b-roll research, and visual variety.',
      whatsappMessage: 'Hi Nandhu! I saw your YouTube long-form video editing portfolio and want to elevate my channel content: ',
      clientShareText: 'Hi! Here are some of my selected YouTube long-form video editing projects: ',
      deliverables: ['Retention Graph Structuring', 'Story Arc & Chapter Pacing', 'Contextual B-Roll Placement', 'Voice EQ & Background Music Mixing'],
      featured: true,
      visible: true
    }
  ];

  /* ==========================================================================
     2. CENTRALIZED PROJECT DATABASE
     Multi-category mapping: Each project can belong to multiple categories!
     ========================================================================== */
  const projects = [
    {
      id: 'video14',
      title: 'test12345',
      description: 'Cinematic video showcase uploaded to Supabase Storage.',
      thumbnail: '',
      videoUrl: 'https://npswzpmqdsxvqkndtvav.supabase.co/storage/v1/object/public/portfolio/videos/1794991696557_video2.mp4',
      aspectRatio: '9:16',
      categories: ['cinematic-editing'],
      productionType: 'Shot & Edited by Me',
      software: ['CapCut Pro & Premiere'],
      duration: '00:30',
      client: 'Nandhalal P S',
      featured: false,
      isVertical: true,
      status: 'published',
      specs: ['9:16 Vertical', '00:30', 'Supabase Storage'],
      breakdown: [
        { key: 'Storage Source', val: 'Supabase Cloud Bucket' },
        { key: 'Format', val: '9:16 Vertical HD MP4' }
      ]
    },
    {
      id: 'video13',
      title: 'test',
      description: 'Wistia cloud embed streaming integration.',
      thumbnail: 'https://fast.wistia.com/embed/medias/htvzexs3p8/swatch',
      videoUrl: '<script src="https://fast.wistia.com/player.js" async></script>\n<script src="https://fast.wistia.com/embed/htvzexs3p8.js" async type="module"></script>\n<style>wistia-player[media-id=\'htvzexs3p8\']:not(:defined) { background: center / contain no-repeat url(\'https://fast.wistia.com/embed/medias/htvzexs3p8/swatch\'); display: block; filter: blur(5px); padding-top:177.78%; }</style>\n<wistia-player media-id="htvzexs3p8" aspect="0.5625"></wistia-player>',
      aspectRatio: '9:16',
      categories: ['cinematic-editing'],
      productionType: 'Shot & Edited by Me',
      software: ['CapCut Pro & Premiere'],
      duration: '00:30',
      client: 'Nandhalal P S',
      featured: false,
      isVertical: true,
      status: 'published',
      specs: ['9:16 Vertical', '00:30', 'Wistia Embed'],
      breakdown: [
        { key: 'Embed Engine', val: 'Wistia Web Component' },
        { key: 'Media ID', val: 'htvzexs3p8' }
      ]
    },
    {
      id: 'video1',
      title: 'Urban Sound & Brand Spot',
      description: 'Product promotions and dynamic brand advertisements with high-retention pacing, rhythmic cuts, and tailored sound design.',
      thumbnail: 'assets/reel_1.jpg',
      videoUrl: 'assets/video1.mp4',
      aspectRatio: '9:16',
      categories: ['commercial-videos', 'instagram-reels', 'youtube-shorts', 'fast-cut-editing'],
      productionType: 'Shot & Edited by Me',
      software: ['CapCut Desktop'],
      duration: '00:30',
      featured: true,
      visible: true,
      specs: ['9:16 Vertical Reel', '00:30', 'Commercial Reels', 'Shot & Edited by Me'],
      breakdown: [
        { key: 'Production Type', val: 'Shot & Edited by Me' },
        { key: 'Software', val: 'CapCut Desktop' },
        { key: 'Focus', val: 'Product staging, transient sound sync & brand timing' }
      ],
      tags: ['Commercial', 'Reels', 'Shot & Edited', 'Sound Design']
    },
    {
      id: 'video2',
      title: 'Kinetic Travel & Movement',
      description: 'High-energy editing with speed ramps, dynamic transitions, punchy sound design, and microsecond beat alignment.',
      thumbnail: 'assets/reel_travel.jpg',
      videoUrl: 'assets/video2.mp4',
      aspectRatio: '9:16',
      categories: ['fast-cut-editing', 'instagram-reels', 'youtube-shorts', 'cinematic-editing'],
      productionType: 'Editing Only',
      software: ['CapCut Desktop'],
      duration: '00:25',
      featured: true,
      visible: true,
      specs: ['9:16 Vertical Reel', '00:25', 'Fast-Cut Edits', 'Editing Only'],
      breakdown: [
        { key: 'Production Type', val: 'Editing Only' },
        { key: 'Software', val: 'CapCut Desktop' },
        { key: 'Technique', val: 'Speed Ramps, Whip Transitions & Impact Audio' }
      ],
      tags: ['Fast-Cut', 'Transitions', 'Editing Only', 'Rhythm']
    },
    {
      id: 'video3',
      title: 'Creator Persona & Intro',
      description: 'Personal branding and creator introduction video highlighting clear visual hierarchy, authentic framing, and storytelling.',
      thumbnail: 'assets/reel_louvre.jpg',
      videoUrl: 'assets/video3.mp4',
      aspectRatio: '9:16',
      categories: ['talking-head', 'podcast-editing', 'youtube-shorts', 'instagram-reels'],
      productionType: 'Shot & Edited by Me',
      software: ['CapCut Desktop'],
      duration: '00:45',
      featured: true,
      visible: true,
      specs: ['9:16 Vertical Reel', '00:45', 'Self-Presentation', 'Shot & Edited by Me'],
      breakdown: [
        { key: 'Production Type', val: 'Shot & Edited by Me' },
        { key: 'Software', val: 'CapCut Desktop' },
        { key: 'Style', val: 'Creator Introduction & Visual Narrative' }
      ],
      tags: ['Creator', 'Self-Presentation', 'Shot & Edited', 'Branding']
    },
    {
      id: 'video4',
      title: 'Educational Insights & Dialogue',
      description: 'Personality-driven video editing featuring crisp audio cleanup, subtle framing shifts, captions, and educational flow.',
      thumbnail: 'assets/reel_2.jpg',
      videoUrl: 'assets/video4.mp4',
      aspectRatio: '9:16',
      categories: ['podcast-editing', 'talking-head', 'youtube-shorts', 'instagram-reels'],
      productionType: 'Editing Only',
      software: ['Adobe Premiere Pro', 'CapCut Desktop'],
      duration: '01:00',
      featured: true,
      visible: true,
      specs: ['9:16 Vertical Reel', '01:00', 'Talking Head', 'Editing Only'],
      breakdown: [
        { key: 'Production Type', val: 'Editing Only' },
        { key: 'Software', val: 'Adobe Premiere Pro' },
        { key: 'Audio & Text', val: 'Dialogue Cleanup, EQ & Animated Subtitles' }
      ],
      tags: ['Talking Head', 'Educational', 'Premiere Pro', 'Subtitles']
    },
    {
      id: 'video5',
      title: 'Atmospheric City Reflections',
      description: 'Visually engaging cinematic storytelling captured on mobile and edited with atmospheric pacing and moody color tones.',
      thumbnail: 'assets/work6.jpg',
      videoUrl: 'assets/video5.mp4',
      aspectRatio: '9:16',
      categories: ['cinematic-editing', 'instagram-reels', 'motion-graphics'],
      productionType: 'Shot & Edited by Me',
      software: ['CapCut Desktop'],
      duration: '00:35',
      featured: true,
      visible: true,
      specs: ['9:16 Vertical Reel', '00:35', 'Cinematic Edits', 'Shot & Edited by Me'],
      breakdown: [
        { key: 'Production Type', val: 'Shot & Edited by Me' },
        { key: 'Software', val: 'CapCut Desktop' },
        { key: 'Camera', val: 'Shot on iPhone · 4K Mobile Video' }
      ],
      tags: ['Cinematic', 'Shot & Edited', 'Mobile Video', 'Atmospheric']
    },
    {
      id: 'video6',
      title: 'Nocturnal Visual Rhythm',
      description: 'Recent creative edit with rhythm-matched cuts, customized transitions, and modern social format finishing.',
      thumbnail: 'assets/work1.jpg',
      videoUrl: 'assets/video6.mp4',
      aspectRatio: '9:16',
      categories: ['fast-cut-editing', 'motion-graphics', 'commercial-videos', 'instagram-reels'],
      productionType: 'Editing Only',
      software: ['CapCut Desktop'],
      duration: '00:28',
      featured: true,
      visible: true,
      specs: ['9:16 Vertical Reel', '00:28', 'Recent Projects', 'Editing Only'],
      breakdown: [
        { key: 'Production Type', val: 'Editing Only' },
        { key: 'Software', val: 'CapCut Desktop' },
        { key: 'Finishing', val: 'Color Grading & Beat Synchronization' }
      ],
      tags: ['Recent', 'Editing Only', 'Beat Sync', 'CapCut']
    },
    {
      id: 'video7',
      title: 'Long-Form Storytelling & Pacing',
      description: 'Structured YouTube video pacing, engaging b-roll placement, audio leveling, and viewer-retention structuring.',
      thumbnail: 'assets/work3.jpg',
      videoUrl: 'assets/video7.mp4',
      aspectRatio: '16:9',
      categories: ['youtube-long-form', 'podcast-editing', 'talking-head'],
      productionType: 'Editing Only',
      software: ['CapCut Desktop', 'Adobe Premiere Pro'],
      duration: '04:15',
      featured: true,
      visible: true,
      specs: ['16:9 Widescreen', '04:15', 'YouTube Videos', 'Editing Only'],
      breakdown: [
        { key: 'Production Type', val: 'Editing Only' },
        { key: 'Software', val: 'CapCut Desktop' },
        { key: 'Format', val: '16:9 Long-Form / YouTube' }
      ],
      tags: ['YouTube', 'Long-Form', 'Editing Only', 'Retention']
    },
    {
      id: 'video8',
      title: 'Brand Showcase & Product Visuals',
      description: 'Widescreen commercial edit balancing product highlights, clean motion graphics, and punchy promotional timing.',
      thumbnail: 'assets/work5.jpg',
      videoUrl: 'assets/video8.mp4',
      aspectRatio: '16:9',
      categories: ['commercial-videos', 'motion-graphics', 'youtube-long-form'],
      productionType: 'Shot & Edited by Me',
      software: ['CapCut Desktop'],
      duration: '01:20',
      featured: true,
      visible: true,
      specs: ['16:9 Widescreen', '01:20', 'Commercial Video', 'Shot & Edited by Me'],
      breakdown: [
        { key: 'Production Type', val: 'Shot & Edited by Me' },
        { key: 'Software', val: 'CapCut Desktop' },
        { key: 'Format', val: '16:9 Commercial Showcase' }
      ],
      tags: ['Commercial', 'Widescreen', 'Shot & Edited', 'Product']
    },
    {
      id: 'video9',
      title: 'Cinematic Atmosphere & Field Reel',
      description: 'Mobile-captured cinematic project exploring natural landscapes, light transitions, and evocative soundscapes.',
      thumbnail: 'assets/work2.jpg',
      videoUrl: 'assets/video9.mp4',
      aspectRatio: '16:9',
      categories: ['cinematic-editing', 'youtube-long-form'],
      productionType: 'Shot & Edited by Me',
      software: ['Adobe Premiere Pro', 'CapCut Desktop'],
      duration: '02:10',
      featured: true,
      visible: true,
      specs: ['16:9 Widescreen', '02:10', 'Cinematic Projects', 'Shot & Edited by Me'],
      breakdown: [
        { key: 'Production Type', val: 'Shot & Edited by Me' },
        { key: 'Software', val: 'Adobe Premiere Pro' },
        { key: 'Camera & Shooting', val: 'Shot on iPhone · Natural Light' }
      ],
      tags: ['Cinematic', 'Shot & Edited', 'iPhone Video', 'Widescreen']
    },
    {
      id: 'video10',
      title: 'Echoes of the Open Horizon',
      description: 'Mobile-captured landscape visual exploring natural light, horizon geometries, and wide golden hour illumination.',
      thumbnail: 'assets/work2.jpg',
      videoUrl: 'assets/video10.mp4',
      aspectRatio: '16:9',
      categories: ['cinematic-editing', 'youtube-long-form'],
      productionType: 'Shot & Edited by Me',
      software: ['CapCut Desktop', 'Adobe Premiere Pro'],
      duration: '01:45',
      featured: false,
      visible: true,
      specs: ['Mobile Video', 'Shot on iPhone', '4K 60fps', 'Natural Light'],
      breakdown: [
        { key: 'Shooting Device', val: 'iPhone (Handheld)' },
        { key: 'Editing & Grade', val: 'CapCut Desktop & Premiere Pro' },
        { key: 'Focus', val: 'Natural Landscape Geometry & Light' }
      ],
      tags: ['Landscape', 'Mobile Videography', 'Cinematic']
    },
    {
      id: 'video11',
      title: 'Urban Cadence & Pace',
      description: 'Dynamic mobile videography exploring urban textures, architectural elements, and handheld tracking movement.',
      thumbnail: 'assets/proc3.jpg',
      videoUrl: 'assets/video11.mp4',
      aspectRatio: '9:16',
      categories: ['fast-cut-editing', 'instagram-reels', 'motion-graphics', 'youtube-shorts'],
      productionType: 'Shot & Edited by Me',
      software: ['CapCut Desktop'],
      duration: '00:22',
      featured: false,
      visible: true,
      specs: ['Mobile Video', 'Shot on iPhone', '4K 60fps', 'Handheld'],
      breakdown: [
        { key: 'Shooting Device', val: 'iPhone' },
        { key: 'Editing', val: 'CapCut Desktop' },
        { key: 'Focus', val: 'Street Rhythm & Movement Pacing' }
      ],
      tags: ['Urban', 'Handheld', 'Street Rhythm']
    },
    {
      id: 'video12',
      title: 'Night City Glow & Movement',
      description: 'Handheld mobile night shoot capturing neon reflections, low-light street mood, and rhythmic visual movement.',
      thumbnail: 'assets/reel_5.jpg',
      videoUrl: 'assets/video12.mp4',
      aspectRatio: '9:16',
      categories: ['cinematic-editing', 'commercial-videos', 'instagram-reels', 'fast-cut-editing'],
      productionType: 'Shot & Edited by Me',
      software: ['CapCut Desktop'],
      duration: '00:18',
      featured: false,
      visible: true,
      specs: ['Mobile Video', 'Shot on iPhone', 'Low-Light', 'Night Mode'],
      breakdown: [
        { key: 'Shooting Device', val: 'iPhone' },
        { key: 'Editing & Grade', val: 'CapCut Desktop' },
        { key: 'Focus', val: 'Night Ambient Light & Reflection Pacing' }
      ],
      tags: ['Night City', 'Neon', 'Cinematic']
    }
  ];

  /* ==========================================================================
     3. REUSABLE QUERY HELPERS
     ========================================================================== */
  function getAllCategories() {
    return categories.filter(c => c.visible !== false);
  }

  function getCategoryBySlug(slug) {
    if (!slug) return null;
    const clean = slug.toLowerCase().trim();
    return categories.find(c => c.slug === clean || c.id === clean) || null;
  }

  function getProjectsByCategory(categorySlug) {
    if (!categorySlug || categorySlug === 'all') {
      return projects.filter(p => p.visible !== false);
    }
    const clean = categorySlug.toLowerCase().trim();
    return projects.filter(p => {
      if (p.visible === false) return false;
      return Array.isArray(p.categories) && p.categories.includes(clean);
    });
  }

  function getProjectById(id) {
    if (!id) return null;
    return projects.find(p => p.id === id) || null;
  }

  return {
    categories,
    projects,
    getAllCategories,
    getCategoryBySlug,
    getProjectsByCategory,
    getProjectById
  };
}));

