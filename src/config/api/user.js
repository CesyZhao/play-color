import http from '../http'

const login = param => http.get('/login/cellphone', { param: param })

const getLoginStatus = param => http.get('/login/status')

const refreshLoginStatus = param => http.get('/login/refresh')

const getUserDetail = param => http.get(`/user/detail?uid=${param.uid}`)

const getUserPlaylist = param => http.get(`/user/playlist?uid=${param.uid}&limit=9999`)

const likeSong = param => http.get(`/like?id=${param.id}&like=${status}`)

export default {
  login,
  getLoginStatus,
  refreshLoginStatus,
  getUserDetail,
  getUserPlaylist,
  likeSong
}