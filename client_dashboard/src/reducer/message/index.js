import {
  SET_SUBSCRIBERS
} from '../../actions/message/constant'

let initialState = {
  subscribers: []
}

const reducer = (state = initialState, action) => {
  const {payload = {}} = action
  switch (action.type) {
    case SET_SUBSCRIBERS:
      return {...state, subscribers: payload.subscribers}
    default:
      return {...state}
  }
}

export { reducer }