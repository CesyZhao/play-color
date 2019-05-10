import axios from 'axios'
import {toast} from 'react-toastify'
import {BASE_URL} from './index'

const errorToast = (message) => {
  return toast(message, {
    className: 'play-color-toast error'
  })
}

const instance = axios.create({
  xhrFields: {
    withCredentials: true
  },
  baseURL: BASE_URL,
  timeout:50000
})
instance.interceptors.response.use((resp) => {
  return resp
},(error) => {
  if(error.response){
    switch(error.response.status){
      case 401:
        errorToast('Access denied,full authorization is required!')
        break;
      case 403:
        errorToast('Access denied,full authorization is required!')
        break;
      case 404:
        errorToast('The content you head for is not found!')
        break;
      case 500:
        errorToast('Sorry,something went wrong, please try again!')
        break;
    }
  }
  return Promise.reject(error);
})
export default instance;
