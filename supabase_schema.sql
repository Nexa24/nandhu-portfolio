-- ============================================================================
-- NANDHALAL P S PORTFOLIO & ADMIN SYSTEM — SUPABASE DATABASE SCHEMA
-- Run this script in your Supabase SQL Editor (Dashboard -> SQL Editor -> New Query -> Run)
-- ============================================================================

-- 1. CLIENTS TABLE (Mini CRM)
CREATE TABLE IF NOT EXISTS public.clients (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  whatsapp TEXT,
  instagram TEXT,
  type TEXT DEFAULT 'Individual Creator',
  status TEXT DEFAULT 'Lead',
  date_added DATE DEFAULT CURRENT_DATE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PROJECTS TABLE (Internal Client Tracking)
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  client_id TEXT REFERENCES public.clients(id) ON DELETE SET NULL,
  client_name TEXT,
  type TEXT NOT NULL,
  budget TEXT,
  start_date DATE,
  deadline DATE,
  delivery_date DATE,
  status TEXT DEFAULT 'Planning',
  description TEXT,
  notes TEXT,
  attachments TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PORTFOLIO PROJECTS TABLE (Public Website Videos)
CREATE TABLE IF NOT EXISTS public.portfolio_projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT NOT NULL,
  poster TEXT NOT NULL,
  is_vertical BOOLEAN DEFAULT TRUE,
  aspect_ratio TEXT DEFAULT '9:16',
  categories TEXT[] DEFAULT '{}',
  production_type TEXT DEFAULT 'Shot & Edited by Me',
  software TEXT DEFAULT 'CapCut Pro & Premiere',
  duration TEXT DEFAULT '00:30',
  featured BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'published',
  sort_order INT DEFAULT 0,
  show_on_home BOOLEAN DEFAULT TRUE,
  show_on_works BOOLEAN DEFAULT TRUE,
  featured_slot INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  headline TEXT,
  short_description TEXT,
  hero_image TEXT,
  deliverables TEXT[] DEFAULT '{}',
  visible BOOLEAN DEFAULT TRUE,
  featured BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. ENQUIRIES TABLE (Inbound Website Contact Forms)
CREATE TABLE IF NOT EXISTS public.enquiries (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  reason TEXT,
  budget TEXT,
  message TEXT,
  status TEXT DEFAULT 'New',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. EMAIL ALIASES TABLE (DNS Routing Configuration)
CREATE TABLE IF NOT EXISTS public.email_aliases (
  id SERIAL PRIMARY KEY,
  alias TEXT UNIQUE NOT NULL,
  purpose TEXT NOT NULL,
  destination TEXT NOT NULL,
  status TEXT DEFAULT 'Active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. WEBSITE CONTENT TABLE (Dynamic Homepage Copy)
CREATE TABLE IF NOT EXISTS public.website_content (
  id TEXT PRIMARY KEY DEFAULT 'default',
  hero_heading TEXT,
  hero_description TEXT,
  profile_image TEXT,
  contact_email TEXT,
  phone TEXT,
  whatsapp_number TEXT,
  instagram_url TEXT,
  location TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. ACTIVITY LOGS TABLE
CREATE TABLE IF NOT EXISTS public.activity_logs (
  id TEXT PRIMARY KEY,
  text TEXT NOT NULL,
  icon TEXT DEFAULT 'info',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Allow public anon read/write with the Publishable Key
-- ============================================================================

ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_aliases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- Allow full access for anon/authenticated users using publishable key
CREATE POLICY "Public read/write clients" ON public.clients FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public read/write projects" ON public.projects FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public read/write portfolio" ON public.portfolio_projects FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public read/write categories" ON public.categories FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public read/write enquiries" ON public.enquiries FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public read/write email_aliases" ON public.email_aliases FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public read/write website_content" ON public.website_content FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public read/write activity_logs" ON public.activity_logs FOR ALL USING (true) WITH CHECK (true);

-- ============================================================================
-- INITIAL SEED DATA
-- ============================================================================

-- Seed Email Aliases
INSERT INTO public.email_aliases (alias, purpose, destination, status) VALUES
  ('edits@nandhuiie.tech', 'Video Editing Enquiries', 'ndhumov@gmail.com', 'Active'),
  ('video@nandhuiie.tech', 'Videography & Shooting', 'ndhumov@gmail.com', 'Active'),
  ('work@nandhuiie.tech', 'Client Projects & Collaborations', 'ndhumov@gmail.com', 'Active'),
  ('support@nandhuiie.tech', 'Customer Support', 'ndhumov@gmail.com', 'Active'),
  ('contact@nandhuiie.tech', 'General Contact', 'ndhumov@gmail.com', 'Active'),
  ('info@nandhuiie.tech', 'General Information', 'ndhumov@gmail.com', 'Active')
ON CONFLICT (alias) DO NOTHING;

-- Seed Default Website Content
INSERT INTO public.website_content (id, hero_heading, hero_description, profile_image, contact_email, phone, whatsapp_number, instagram_url, location)
VALUES (
  'default',
  'Hello, I''m Nandhalal P S.\nA Video Editor, Content Creator, a I phone videographer,  SMM Strategist.',
  'I create engaging visual experiences through cinematic storytelling, creative editing, and compelling content. From short-form reels to commercial videos, I turn ideas into impactful visuals.',
  'assets/nandhu_profile.jpg',
  'edits@nandhuiie.tech',
  '+91 94477 46535',
  '+919447746535',
  'https://instagram.com/nandhuiie',
  'Kerala / Bangalore, India'
) ON CONFLICT (id) DO NOTHING;

-- Seed Categories
INSERT INTO public.categories (id, name, slug, headline, short_description, deliverables, visible, featured, sort_order) VALUES
  ('youtube-shorts', 'YouTube Shorts', 'youtube-shorts', 'YouTube Shorts Editing', 'Engaging short-form videos designed to capture attention in the first 3 seconds and drive subscriber growth.', ARRAY['Hooks', 'Animated Captions', 'Sound Design'], true, true, 1),
  ('instagram-reels', 'Instagram Reels', 'instagram-reels', 'Instagram Reels & Viral Content', 'Punchy, trend-aware vertical edits combining rhythmic pacing, transitions, and crisp visual hooks.', ARRAY['Beat Syncing', 'Speed Ramps', 'Color Grading'], true, true, 2),
  ('podcast-editing', 'Podcast Editing', 'podcast-editing', 'Podcast Video Editing', 'Clean podcast edits with multi-speaker switching, audio cleanup, and viral highlight clips.', ARRAY['Speaker Auto-Switch', 'Audio EQ', 'Highlight Clips'], true, true, 3),
  ('motion-graphics', 'Motion Graphics', 'motion-graphics', 'Motion Graphics & Visual Editing', 'Creative motion-driven visuals, animated typography, and dynamic graphic overlays.', ARRAY['Kinetic Type', 'Lower Thirds', 'UI Mockups'], true, true, 4),
  ('commercial-videos', 'Commercial Videos', 'commercial-videos', 'Commercial Videos & Brand Spots', 'High-production-value commercial edits crafted to highlight products and brand aesthetic.', ARRAY['Product Highlights', 'Sound Design', 'Color Grade'], true, true, 5),
  ('talking-head', 'Talking Head Videos', 'talking-head', 'Talking Head & Educational Content', 'Clear dialogue editing with pacing adjustments, zoom transitions, and illustrative B-roll.', ARRAY['Zoom Cuts', 'B-Roll Sync', 'Voice Clarity'], true, true, 6),
  ('fast-cut-editing', 'Fast-Cut Editing', 'fast-cut-editing', 'Fast-Cut & High-Energy Editing', 'Rhythmic, high-tempo editing featuring swift cuts, sound foley, and motion transitions.', ARRAY['Rhythmic Cuts', 'Sound FX', 'Dynamic Speed'], true, true, 7),
  ('cinematic-editing', 'Cinematic Editing', 'cinematic-editing', 'Cinematic Video Editing', 'Atmospheric pacing, rich film color grades, soundscapes, and emotive storytelling.', ARRAY['Film Color LUTs', 'Ambient Soundscapes', 'Pacing'], true, true, 8),
  ('youtube-long-form', 'YouTube Long-Form', 'youtube-long-form', 'YouTube Long-Form Video Editing', 'High-retention editing for long-form episodes, tutorials, video essays, and documentaries.', ARRAY['Chapters', 'Retention Pacing', 'Custom Thumbnails'], true, true, 9)
ON CONFLICT (id) DO NOTHING;

-- Seed Clients
INSERT INTO public.clients (id, name, company, email, phone, whatsapp, instagram, type, status, date_added, notes) VALUES
  ('cli-101', 'Anand Varma', 'The Urban Pod', 'anand@theurbanpod.in', '+91 98450 12345', '+91 98450 12345', '@theurbanpod', 'Individual Creator', 'Active Client', '2026-02-15', 'Weekly podcast episodes. Needs vertical shorts with animated subtitles and sound design.'),
  ('cli-102', 'Sneha Kapur', 'Aura Skin Lab', 'sneha@auraskinlab.com', '+91 98112 34567', '+91 98112 34567', '@auraskinlab', 'Business / Brand', 'Active Client', '2026-01-20', 'D2C skincare brand. Product launch commercial reels, clean aesthetic, pastel color grading.'),
  ('cli-103', 'Rohan Mehra', 'Velocity Media', 'rohan@velocitymedia.co', '+91 97234 56789', '+91 97234 56789', '@velocitymedia', 'Agency', 'Active Client', '2026-02-01', 'Automotive and lifestyle client deliverables. Fast-cut edits, cinematic sound effects.'),
  ('cli-104', 'Dr. Arjun Das', 'MindFit Mental Wellness', 'dr.arjun@mindfit.org', '+91 94450 67890', '+91 94450 67890', '@mindfit_official', 'Individual Creator', 'Negotiation', '2026-03-02', 'Talking-head educational series for YouTube and Reels. 12 videos batch quoted.'),
  ('cli-105', 'Pooja Hegde Media', 'The Culture Blend', 'pooja@cultureblend.in', '+91 98200 45678', '+91 98200 45678', '@cultureblend', 'Individual Creator', 'Lead', '2026-03-12', 'Inquired through website form for YouTube Shorts and Instagram Reels retainer.')
ON CONFLICT (id) DO NOTHING;

-- Seed Projects
INSERT INTO public.projects (id, title, client_id, client_name, type, budget, start_date, deadline, status, description, notes, attachments) VALUES
  ('prj-201', 'Episode 42: Startup Mindset - 4x Vertical Shorts', 'cli-101', 'The Urban Pod', 'Podcast Editing', '$650', '2026-03-10', '2026-03-22', 'In Progress', 'Cut 4 high-retention 9:16 vertical clips from 60-min raw zoom interview. Include speaker auto-switch and animated captions.', 'Audio cleaned with iZotope RX. Premiere timeline synced.', 'https://drive.google.com/drive/folders/urbanpod_ep42'),
  ('prj-202', 'Spring Glow Hydration Serum - Commercial Reel', 'cli-102', 'Aura Skin Lab', 'Commercial Videos', '$800', '2026-03-01', '2026-03-18', 'Review', 'Shot on iPhone 15 Pro, studio tabletop staging. 9:16 fast-paced edit with pastel color grade, micro-sync beat drops.', 'Client requested warmer highlights on frame 00:14. V2 uploaded to Frame.io.', 'https://frame.io/aura_hydrationserum_v2'),
  ('prj-203', 'GT3 Track Day Teaser Reel', 'cli-103', 'Velocity Media', 'Fast-Cut Editing', '$950', '2026-02-18', '2026-02-28', 'Completed', 'High-octane 30s cut with exhaust audio foley, speed ramping, motion blur, and kinetic text typography.', 'Final delivery in ProRes 422 and H.264 vertical. Client approved without revisions.', 'https://wetransfer.com/downloads/gt3_final'),
  ('prj-204', 'Managing Cognitive Overload - 5 Part Reel Series', 'cli-104', 'MindFit Mental Wellness', 'Talking Head Videos', '$1,200', '2026-03-15', '2026-04-05', 'Planning', '5 talking head clips with dynamic zoom transitions, illustrated iconography, and clean B-roll overlays.', 'Awaiting raw A-cam and Lavalier audio tracks via WeTransfer.', '')
ON CONFLICT (id) DO NOTHING;

-- Seed Portfolio Projects (video1 - video12)
INSERT INTO public.portfolio_projects (id, title, description, video_url, poster, is_vertical, aspect_ratio, categories, production_type, software, duration, featured, status, sort_order) VALUES
  ('video1', 'Urban Sound & Brand Spot', 'Product promotions and dynamic brand advertisements with high-retention pacing, rhythmic cuts, and tailored sound design.', 'assets/video1.mp4', 'assets/reel_1.jpg', true, '9:16', ARRAY['commercial-videos', 'instagram-reels', 'youtube-shorts', 'fast-cut-editing'], 'Shot & Edited by Me', 'CapCut Desktop', '00:30', true, 'published', 1),
  ('video2', 'Kinetic Travel & Movement', 'High-energy editing with speed ramps, dynamic transitions, punchy sound design, and microsecond beat alignment.', 'assets/video2.mp4', 'assets/reel_2.jpg', true, '9:16', ARRAY['fast-cut-editing', 'instagram-reels', 'youtube-shorts', 'cinematic-editing'], 'Shot & Edited by Me', 'CapCut Desktop', '00:25', true, 'published', 2),
  ('video3', 'Creator Persona & Intro', 'High-retention storytelling, kinetic typography, dynamic zoom framing, and crisp personality branding.', 'assets/video3.mp4', 'assets/reel_3.jpg', true, '9:16', ARRAY['talking-head', 'podcast-editing', 'youtube-shorts', 'instagram-reels'], 'Editing Only', 'CapCut Desktop', '00:45', true, 'published', 3),
  ('video4', 'Educational Insights & Dialogue', 'Clean multi-speaker framing, motion graphics callouts, highlighted key points, and engaging visual pace.', 'assets/video4.mp4', 'assets/reel_4.jpg', true, '9:16', ARRAY['podcast-editing', 'talking-head', 'youtube-shorts', 'instagram-reels'], 'Editing Only', 'CapCut Desktop', '01:00', true, 'published', 4),
  ('video5', 'Atmospheric City Reflections', 'Cinematic mood piece featuring ambient sound design, low-light color grading, and deliberate emotional pacing.', 'assets/video5.mp4', 'assets/reel_5.jpg', true, '9:16', ARRAY['cinematic-editing', 'instagram-reels', 'motion-graphics'], 'Shot & Edited by Me', 'CapCut Desktop', '00:35', false, 'published', 5),
  ('video6', 'Nocturnal Visual Rhythm', 'Rapid-fire visual montage driven by synthetic beats, neon color accents, and precise tempo cutting.', 'assets/video6.mp4', 'assets/reel_6.jpg', true, '9:16', ARRAY['fast-cut-editing', 'motion-graphics', 'commercial-videos', 'instagram-reels'], 'Shot & Edited by Me', 'CapCut Desktop', '00:28', false, 'published', 6),
  ('video7', 'Long-Form Storytelling & Pacing', 'Wide-format narrative editing with documentary structure, ambient foley, chapter cards, and archival pacing.', 'assets/video7.mp4', 'assets/long_1.jpg', false, '16:9', ARRAY['youtube-long-form', 'podcast-editing', 'talking-head'], 'Shot & Edited by Me', 'CapCut Desktop', '04:15', true, 'published', 7),
  ('video8', 'Brand Showcase & Product Visuals', 'Horizontal commercial narrative combining studio lighting, macro product focus, and seamless graphic integration.', 'assets/video8.mp4', 'assets/long_2.jpg', false, '16:9', ARRAY['commercial-videos', 'motion-graphics', 'youtube-long-form'], 'Shot & Edited by Me', 'CapCut Desktop', '01:20', true, 'published', 8),
  ('video9', 'Cinematic Atmosphere & Field Reel', 'Widescreen landscape and lifestyle journey featuring rich color science, quiet storytelling, and immersive soundscapes.', 'assets/video9.mp4', 'assets/long_3.jpg', false, '16:9', ARRAY['cinematic-editing', 'youtube-long-form'], 'Shot & Edited by Me', 'CapCut Desktop', '02:10', true, 'published', 9),
  ('video10', 'Echoes of the Open Horizon', 'Expansive documentary travelogue with wide cinematic frames, natural field audio, and orchestral pacing.', 'assets/video10.mp4', 'assets/long_1.jpg', false, '16:9', ARRAY['cinematic-editing', 'youtube-long-form'], 'Shot & Edited by Me', 'CapCut Desktop', '01:45', false, 'published', 10),
  ('video11', 'Urban Cadence & Pace', 'Vertical reel showcasing the raw energy of modern city life with whip pans, street audio, and kinetic text.', 'assets/video11.mp4', 'assets/reel_2.jpg', true, '9:16', ARRAY['fast-cut-editing', 'instagram-reels', 'motion-graphics', 'youtube-shorts'], 'Shot & Edited by Me', 'CapCut Desktop', '00:22', false, 'published', 11),
  ('video12', 'Night City Glow & Movement', 'After-dark neon visuals, smooth speed ramps, and stylized night grading designed for social media feeds.', 'assets/video12.mp4', 'assets/reel_4.jpg', true, '9:16', ARRAY['cinematic-editing', 'commercial-videos', 'instagram-reels', 'fast-cut-editing'], 'Shot & Edited by Me', 'CapCut Desktop', '00:18', false, 'published', 12)
ON CONFLICT (id) DO NOTHING;

-- Migration helper for existing databases (adds placement columns if not already present):
ALTER TABLE IF EXISTS public.portfolio_projects ADD COLUMN IF NOT EXISTS show_on_home BOOLEAN DEFAULT TRUE;
ALTER TABLE IF EXISTS public.portfolio_projects ADD COLUMN IF NOT EXISTS show_on_works BOOLEAN DEFAULT TRUE;
ALTER TABLE IF EXISTS public.portfolio_projects ADD COLUMN IF NOT EXISTS featured_slot INT DEFAULT 0;

-- ============================================================================
-- 9. SUPABASE STORAGE BUCKET: PORTFOLIO MEDIA (VIDEOS & IMAGES)
-- ============================================================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio', 'portfolio', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Allow public access to portfolio bucket for uploads & reads
DROP POLICY IF EXISTS "Public Upload Portfolio Storage" ON storage.objects;
CREATE POLICY "Public Upload Portfolio Storage" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'portfolio');

DROP POLICY IF EXISTS "Public Read Portfolio Storage" ON storage.objects;
CREATE POLICY "Public Read Portfolio Storage" ON storage.objects
FOR SELECT USING (bucket_id = 'portfolio');

DROP POLICY IF EXISTS "Public Update Portfolio Storage" ON storage.objects;
CREATE POLICY "Public Update Portfolio Storage" ON storage.objects
FOR UPDATE USING (bucket_id = 'portfolio');
