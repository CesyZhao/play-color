import http from '../http'

const getLoginStatus = param => http.get('/login/status')

const refreshLoginStatus = param => http.get('/login/refresh')

const getUserDetail = param => http.get(`/user/detail?uid=${param.uid}`)

const getUserPlaylist = param => http.get(`/user/playlist?uid=${param.uid}&limit=9999`)

export default {
  getLoginStatus,
  refreshLoginStatus,
  getUserDetail,
  getUserPlaylist
}