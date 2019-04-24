import {
  ON_CLICK_LOGIN_BUTTON_SUBMIT,
  ON_CLICK_SIGNUP_BUTTON_SUBMIT
} from '../../actions/auth/constant'
import Cookie from 'js-cookie'
import { push } from 'connected-react-router'
import { call, put, takeLatest } from 'redux-saga/effects'
import * as apiAuth from '../../api/auth'
import * as actApp from '../../actions/app'
import * as actNotif from '../../actions/notif'

function* onClickSubmitLogin(request) {
  const { payload } = request

  try {
    const response = yield call(apiAuth.loginUser, payload.values)
    const token = response.data.token

    Cookie.set('access_token', token);
    yield put(actApp.setIsLogin(true))
    yield put(push('/dashboard'))
  } catch (e) {
    yield put(actNotif.setErrorLogin({show: true, message: e.response.data.message}))
  }
}

export default function* authSaga() {
  yield takeLatest(ON_CLICK_LOGIN_BUTTON_SUBMIT, onClickSubmitLogin)
}