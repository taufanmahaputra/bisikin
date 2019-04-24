import {
  SET_IS_LOGIN
} from '../../actions/app/constant'

let initialState = {
  loggedIn: false
}

const reducer = (state = initialState, action) => {
  const {payload = {}} = action
  switch (action.type) {
    case SET_IS_LOGIN:
      return {...state, loggedIn: payload.value}
    default:
      return {...state}
  }
}

export { reducer }