interface SearchResult {
  entries: Song[];
  epoch?: number;
  extractor?: string;
  extractor_key?: string;
  id: string;
  original_url?: string;
  playlist_count?: number;
  release_year?: string | number | null;
  title: string;
  webpage_url?: string;
  webpage_url_basename?: string;
  webpage_url_domain?: string | null;
  _type?: string;
}

interface Song {
  comment_count?: number;
  description?: string;
  duration: number;
  formats?: string | null;
  genres?: string[];
  id: string;
  ie_key: string;
  license?: string;
  like_count?: number;
  modified_timestamp?: number;
  repost_count?: number;
  tags?: string[];
  thumbnails?: Thumbnail[];
  timestamp?: number;
  title: string;
  track?: string;
  uploader: string;
  uploader_id?: string;
  uploader_url?: string;
  url?: string;
  view_count?: number;
  webpage_url?: string;
  __post_extractor?: string | null;
  __x_forwarded_for_ip?: string | null;
}

interface Thumbnail {
  height: number;
  width: number;
  id: string;
  url: string;
}

interface QueueItem {
  song: Song;
  requester: Account
}

interface Account {
  uuid: string;
  name: string;
  displayName: string;
}