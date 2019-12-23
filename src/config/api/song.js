import http from '../http'

const getHeartbeatList = param => http.get(`/playmode/intelligence/list?id=${param.id}&pid=${param.pid}&sid=${param.sid}`)

const getPlayList = param => http.get(`/playlist/detail?id=${param.id}`)

const getComments = param => http.get(`/comment/music?id=${param.id}`)

const getLyric = param => http.get(`/lyric?id=${param.id}`)


export default {
  getHeartbeatList,
  getPlayList,
  getComments,
  getLyric
}