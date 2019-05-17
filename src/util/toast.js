import {toast} from 'react-toastify'

const toaster = {
  error (message) {
    return toast(message, {
      className: 'play-color-toast error'
    })
  }
}

export default toaster