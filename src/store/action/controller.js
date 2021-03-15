import { UPDATE_PLAYING_SONG, UPDATE_PLAYING_ALBUM, NEXT_SONG, PREV_SONG, UPDATE_PLAYING_MODE, UPDATE_HEARTBEAT_ALBUM, UPDATE_PLAYING_STATUS } from './actions'

export const updatePlayingSong = (song) => {
  return {
    type: UPDATE_PLAYING_SONG,
    song
  }
}

export const updatePlayingAlbum = (album) => {
  return {
    type: UPDATE_PLAYING_ALBUM,
    playingAlbum: album
  }
}

export const updateHeartbeatAlbum = (heartbeatAlbum) => {
  return {
    type: UPDATE_HEARTBEAT_ALBUM,
    heartbeatAlbum
  }
}

export const updatePlayingMode = (mode) => {
  return {
    type: UPDATE_PLAYING_MODE,
    mode
  }
}

export const updatePlayingStatus = () => {
  return {
    type: UPDATE_PLAYING_STATUS
  }
}

export const nextSong = () => {
  return {
    type: NEXT_SONG
  }
}

export const prevSong = () => {
  return {
    type: PREV_SONG
  }
}