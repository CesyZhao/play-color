import http from '../http'

const getPlayList = param => http.get(`/playlist/detail?id=${param.id}`)

const getComments = param => http.get(`/comment/music?id=${param.id}`)

const getLyric = param => http.get(`/lyric?id=${param.id}`)


export default {
  getPlayList,
  getComments,
  getLyric
}