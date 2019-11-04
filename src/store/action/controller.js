import { UPDATE_PLAYING_SONG, UPDATE_PLAYING_ALBUM, NEXT_SONG, PREV_SONG, UPDATE_PLAYING_MODE } from './actions'

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

export const updatePlayingMode = (mode) => {
  return {
    type: UPDATE_PLAYING_MODE,
    mode
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