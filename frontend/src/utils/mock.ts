const searchResult: SearchResult[] = [{
  song: {title: "Levels",
  artists: ["Avicii"],
  source: "Spotify",
  length: 250}
}, {
  song: {title: "Piercing Light",
  artists: ["League of Legends", "Mako"],
  source: "Youtube",
  length: 250}
}]

const queueItems: QueueItem[] = [{
  song: {title: "Levels",
  artists: ["Avicii"],
  source: "Spotify",
  length: 250},
  requester: {
    uuid: "0",
    name: "Person1",
    displayName: "DisplayName1"
  }
}, {
  song: {title: "Piercing Light",
  artists: ["League of Legends", "Mako"],
  source: "Youtube",
  length: 250},
  requester: {
    uuid: "1",
    name: "Person2",
    displayName: "DisplayName2"
  }
}, {
  song: {title: "Piercing Light2",
  artists: ["League of Legends", "Mako"],
  source: "Youtube",
  length: 250},
  requester: {
    uuid: "1",
    name: "Person2",
    displayName: "DisplayName2"
  }
}]

export {searchResult, queueItems}