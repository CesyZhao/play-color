import axios from 'axios'

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

        break;
      case 403:

        break;
      case 404:

        break;
      case 500:

        break;
    }
  }
  return Promise.reject(error);
})
export default instance;
