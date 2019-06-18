import {toast} from 'react-toastify'

const toaster = {
  error (message, onClose) {
    return toast(message, {
      className: 'play-color-toast error',
      onClose
    })
  }
}

export default toaster