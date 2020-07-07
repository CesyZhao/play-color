import http from '../http'

const login = param => http.get('/login/cellphone', { params: param })

const logout = param => http.get('/logout')

const getLoginStatus = param => http.get('/login/status')

const refreshLoginStatus = param => http.get('/login/refresh')

const getUserDetail = param => http.get(`/user/detail?uid=${param.uid}`)

const getUserPlaylist = param => http.get(`/user/playlist?uid=${param.uid}&limit=9999`)

const likeSong = param => http.get(`/like?id=${param.id}&like=${param.status}`)

export default {
  login,
  logout,
  getLoginStatus,
  refreshLoginStatus,
  getUserDetail,
  getUserPlaylist,
  likeSong
}