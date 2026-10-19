import json
from pathlib import Path
from typing import Literal
from yt_dlp import YoutubeDL
from concurrent.futures import ThreadPoolExecutor
from pydantic import TypeAdapter

from ..util.types import SearchResult

_search_executor = ThreadPoolExecutor(thread_name_prefix="s:yt-dlp")
_download_executor = ThreadPoolExecutor(thread_name_prefix="d:yt-dlp")

AUDIO_DIR = Path(__file__).parent / "downloads"

SourceNames = Literal["soundcloud", "youtube", "youtube_music"]

SOURCES: dict[SourceNames, str] = {
  "soundcloud": "scsearch",
  "youtube": "ytsearch",
  "youtube_music": "ytmusic", # Replace with youtube music url as this is deprecated
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

def _search_sync(source: str, query: str):
  searchQuery = f"{SOURCES[source]}10:{query}"
  with YoutubeDL(OPTIONS) as ydl:
    info = ydl.extract_info(searchQuery, download=False)

  return info

async def search(source: str, query: str):
  future = _search_executor.submit(_search_sync, source, query)
  return SearchResult.model_validate(future.result())

DOWNLOAD_OPTIONS = {
  "format": "m4a/bestaudio/best",
  "postprocessors": [{
    "key": "FFmpegExtractAudio",
    "preferredcodec": "m4a"
  }],
  "outtmpl": str(AUDIO_DIR) + "/%(extractor)s/%(id)s.%(ext)s",
  "noplaylist": True,
  "quiet": True,
  "overwrites": False,
}

def _download_sync(url: str):
  with YoutubeDL(DOWNLOAD_OPTIONS) as ydl:
    code = ydl.download([url])

  return code

async def download(url: str):
  return await _download_executor.submit(_download_sync, url)

def get_downloaded(source: str, identifier: str): 
  for p in (AUDIO_DIR + source).glob(f"{identifier}.*"):
    if p.suffix not in (".tmp", ".ytdl"):
      return p
  return None
