import {
  SET_ERROR_LOGIN
} from '../../actions/notif/constant'

let initialState = {
  errorLogin:  {
    show: false,
    message: null
  }
}

const reducer = (state = initialState, action) => {
  const {payload = {}} = action
  switch (action.type) {
    case SET_ERROR_LOGIN:
      return {...state, errorLogin: {show: payload.value.show, message: payload.value.message}}
    default:
      return {...state}
  }
}

export { reducer }