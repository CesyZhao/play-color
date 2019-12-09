import axios from 'axios'
import toaster from '../util/toast'
import {BASE_URL} from './index'

const instance = axios.create({
  xhrFields: {
    withCredentials: true
  },
  baseURL: BASE_URL,
  timeout: 50000
})
instance.interceptors.response.use((resp) => {
  return resp
}, (error) => {
  if(error.response){
    // eslint-disable-next-line default-case
    switch(error.response.status){
      case 401:
        toaster.error('Access denied,full authorization is required!')
        break;
      case 403:
        toaster.error('Access forbidden!')
        break;
      case 404:
        toaster.error('The content you head for is not found!')
        break;
      case 500:
        toaster.error('Sorry,something went wrong, please try again!')
        break;
    }
  }
  return Promise.reject(error);
})
export default instance;
