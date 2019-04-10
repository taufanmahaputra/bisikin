import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

import Postgre from './resources/postgre'

import indexRouter from './routes/index'
import messageRouter from './routes/message'

class Application {
  constructor() {
    /*
     DATABASE SETUP
     */
    Postgre.__init()


    /*
     APPLICATION SETUP
     */

    this.app = express()
    this.app.use(logger('dev'))
    this.app.use(express.json())
    this.app.use(express.urlencoded({extended: false}))
    this.app.use(cookieParser())
    this.app.use(express.static(path.join(__dirname, 'public')))

    this.app.use('/', indexRouter)
    this.app.use('/message', messageRouter)
  }
}


module.exports = new Application()

