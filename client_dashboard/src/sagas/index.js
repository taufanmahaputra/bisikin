import {
  JWT_EXPIRED
} from '../actions/app/constant'
import { put, takeLatest } from 'redux-saga/effects'
import * as actApp from '../actions/app'
import * as actNotif from '../actions/notif'

function* jwtExpired() {
  yield put(actApp.setIsLogin(false))
  yield put(actNotif.setErrorAlert({show: true, message: 'Please login first'}))
}

export default function* authSaga() {
  yield takeLatest(JWT_EXPIRED, jwtExpired)
}