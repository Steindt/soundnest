import json
from yt_dlp import YoutubeDL

SOURCES = {
  "soundcloud": "scsearch",
  "youtube_music": "ytmusic",
  "youtube": "",
}

OPTIONS = {
  "quiet": True,
  "no_warnings": True,
  "extract_flat": True,
  "skip_download": True,
  "ignore_errors": True,
  "flat_playlist": True,
  "geo_bypass": True,
  "socket_timeout": 10,
}

def search(query: str):
  searchQuery = f"ytmsearch10:{query}"
  with YoutubeDL(OPTIONS) as ydl:
    info = ydl.extract_info(searchQuery, download=False)

  return json.dumps(ydl.sanitize_info(info))