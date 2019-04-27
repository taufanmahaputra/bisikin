import {
  SET_ERROR_ALERT
} from '../../actions/notif/constant'

let initialState = {
  errorAlert:  {
    show: false,
    message: null
  }
}

const reducer = (state = initialState, action) => {
  const {payload = {}} = action
  switch (action.type) {
    case SET_ERROR_ALERT:
      return {...state, errorAlert: {show: payload.value.show, message: payload.value.message}}
    default:
      return {...state}
  }
}

export { reducer }