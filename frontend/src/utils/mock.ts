const searchResult: Song[] = [{
  duration: 285,
  id: "123",
  ie_key: "Soundcloud",
  title: "Levels",
  uploader: "Avicii",
}, {
  duration: 218,
    id: "124",
    ie_key: "Soundcloud",
    title: "Piercing Light",
    uploader: "League of Legends",
}, {
  duration: 132,
    id: "125",
    ie_key: "Soundcloud",
    title: "Magic",
    uploader: "Pilot",
}]

const queueItems: QueueItem[] = [{song: {
  duration: 285,
  id: "123",
  ie_key: "Soundcloud",
  title: "Levels",
  uploader: "Avicii",
}, requester: {
  uuid: "0",
  name: "Karl",
  displayName: "Stein"
}}, {song: {
  duration: 218,
  id: "124",
  ie_key: "Soundcloud",
  title: "Piercing Light",
  uploader: "League of Legends",
}, requester: {
  uuid: "0",
  name: "Karl",
  displayName: "Stein"
}}, {song: {
  duration: 132,
  id: "125",
  ie_key: "Soundcloud",
  title: "Magic",
  uploader: "Pilot",
}, requester: {
  uuid: "0",
  name: "Karl",
  displayName: "Stein"
}}]

export {searchResult, queueItems}