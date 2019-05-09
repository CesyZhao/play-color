import axios from 'axios'
import {toast} from 'react-toastify'

const errorToast = (message) => {
  return toast(message, {
    className: 'play-color-toast error'
  })
}

const instance = axios.create({
  xhrFields: {
    withCredentials: true
  },
  timeout:50000
})
instance.interceptors.response.use((resp) => {
  return resp
},(error) => {
  if(error.response){
    switch(error.response.status){
      case 401:
        errorToast('You')
        break;
      case 403:
        errorToast('Access denied,full authorization is required!')
        break;
      case 404:

        break;
      case 500:
        errorToast('Sorry,something went wrong, please try again!')
        break;
    }
  }
  return Promise.reject(error);
})
export default instance;