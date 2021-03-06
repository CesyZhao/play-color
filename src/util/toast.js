import {toast} from 'react-toastify'

const toaster = {
  error(message, onClose) {
    return toast(message, {
      className: 'play-color-toast error',
      onClose
    })
  },
  success(message, onClose) {
    return toast(message, {
      className: 'play-color-toast success',
      onClose
    })
  }
}

export default toaster