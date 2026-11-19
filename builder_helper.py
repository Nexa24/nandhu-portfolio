"""
GENERATOR FOR 8 COMPLETELY DIFFERENT PORTFOLIO DESIGNS
Creates Portfolio4 through Portfolio11 with completely distinct architectures, layouts, CSS, and interactive features.
"""

import os, json

BASE = r"E:\Alanove\VS Code"

# ---------------------------------------------------------------------------
# SHARED SAMPLE PROJECT DATA (Generic & Clean)
# ---------------------------------------------------------------------------
sample_projects = [
    {
        "id": "clip1",
        "title": "Urban Velocity & Cyber Rhythm",
        "description": "High-octane commercial spot featuring precision beat synchronization, kinetic typography, and rapid whip-pan transitions.",
        "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        "aspectRatio": "9:16",
        "isVertical": True,
        "categories": ["reels", "fast-cut", "commercial"],
        "duration": "00:30",
        "views": "1.4M",
        "likes": "48.2K",
        "shares": "12.5K",
        "track": "PHONK WAVE 04",
        "codec": "Apple ProRes 422 HQ"
    },
    {
        "id": "clip2",
        "title": "Nocturnal Tokyo Moods",
        "description": "Atmospheric cinematic travel film with moody neo-tokyo neon grading, spatial field recording, and evocative slow cadence.",
        "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        "aspectRatio": "9:16",
        "isVertical": True,
        "categories": ["cinematic", "reels"],
        "duration": "00:25",
        "views": "890K",
        "likes": "32.1K",
        "shares": "8.4K",
        "track": "LO-FI DRIFT",
        "codec": "RED RAW 6K"
    },
    {
        "id": "clip3",
        "title": "Aura Cosmica — Luxury Fragrance",
        "description": "Studio lighting commercial narrative combining high-speed phantom macro focus and seamless 3D liquid transitions.",
        "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        "aspectRatio": "16:9",
        "isVertical": False,
        "categories": ["commercial", "cinematic"],
        "duration": "01:15",
        "views": "620K",
        "likes": "19.4K",
        "shares": "4.2K",
        "track": "SYMPHONY IN D",
        "codec": "ARRI ALEXA Mini LF"
    },
    {
        "id": "clip4",
        "title": "Creator Persona & Hook Mastery",
        "description": "High-retention talking-head dialogue edit with dynamic zoom cuts, animated icon callouts, and clean color tone styling.",
        "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
        "aspectRatio": "9:16",
        "isVertical": True,
        "categories": ["talking-head", "reels", "podcast"],
        "duration": "00:45",
        "views": "2.1M",
        "likes": "94.6K",
        "shares": "31.0K",
        "track": "TECH BEAT 02",
        "codec": "Sony S-Log3 10-bit"
    },
    {
        "id": "clip5",
        "title": "Echoes of the High Plateau",
        "description": "Wide-format documentary travelogue with majestic landscape framing, natural ambient soundscapes, and orchestral cadence.",
        "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
        "aspectRatio": "16:9",
        "isVertical": False,
        "categories": ["cinematic", "youtube-long-form"],
        "duration": "02:40",
        "views": "450K",
        "likes": "18.3K",
        "shares": "5.1K",
        "track": "ICELANDIC ORCHESTRA",
        "codec": "Sony FX6 4K"
    },
    {
        "id": "clip6",
        "title": "Retro Hardware Synth Waves",
        "description": "Visual montage exploring analog hardware synthesizer brutalism with synthwave audio and rhythmic beat cutting.",
        "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
        "aspectRatio": "9:16",
        "isVertical": True,
        "categories": ["motion-graphics", "fast-cut", "reels"],
        "duration": "00:28",
        "views": "1.1M",
        "likes": "45.0K",
        "shares": "14.2K",
        "track": "SYNTH PULSE 84",
        "codec": "Blackmagic RAW 6K"
    }
]

print("Script template ready.")
