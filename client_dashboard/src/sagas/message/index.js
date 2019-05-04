import {
  PAGE_REQUEST,
  ON_CLICK_SEND_MESSAGE_BUTTON
} from '../../actions/message/constant'
import { call, put, takeLatest } from 'redux-saga/effects'
import * as apiCompany from '../../api/company'
import * as apiMessage from '../../api/message'
import * as actMessage from '../../actions/message'

function* pageRequest() {
  try {
    const response = yield call(apiCompany.getSubscribers)
    yield put(actMessage.setSubscribers(response.data))
  } catch (e) {
    console.log(e)
  }
}

function* onClickSendMessage(request) {
  try {
    const { payload } = request
    yield call(apiMessage.sendMessage, payload)
  } catch (e) {
    console.log(e)
  }
}

export default function* authSaga() {
  yield takeLatest(PAGE_REQUEST, pageRequest)
  yield takeLatest(ON_CLICK_SEND_MESSAGE_BUTTON, onClickSendMessage)
}