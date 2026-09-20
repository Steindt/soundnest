type SearchResult = {
  song: Song
}

type QueueItem = {
  song: Song;
  requester: Account
}

type Song = {
  title: string; 
  artists: stirng[]; 
  source: string; 
  length: number
}

type Account = {
  uuid: string;
  name: string;
  displayName: string;
}