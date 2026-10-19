from __future__ import annotations 
from pydantic import BaseModel, Field, ConfigDict

class Base(BaseModel):
  model_config = ConfigDict(coerce_numbers_to_str=True)

class SearchResult(Base):
  entries: list[Song] = []
  playlist_count: int = 0
  title: str | None
  release_year: str | int | None = None
  type: str | None = Field(None, alias="_type")

class Song(Base):
  id: str
  title: str | None = None
  genres: list[str] = []
  duration: float | None = None
  ie_key: str | None = None
  like_count: int | None = None
  thumbnails: list[Thumbnail] = []
  timestamp: int | None = None
  uploader: str | None = None
  url: str | None = None
  view_count: int | None = None
  webpage_url: str | None = None

class Thumbnail(Base):
  id: str | None = None
  url: str
  width: int | None = None
  height: int | None = None

class Playlist(Base):
  identifier: str | None = None
  title: str | None = None
  soundcloudTracks: list[Song] = []
  spotifyTracks: list[Song] = []
  thumbnail: str | None = None
  created: int | None = None
  createdBy: User | None = None

class User(BaseModel):
  id: int
  name: str
  nickname: str | None = None
  stilid: str