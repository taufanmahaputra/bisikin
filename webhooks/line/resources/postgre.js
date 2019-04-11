import {Pool} from 'pg/lib/index'
import config from '../config'

class Postgre {
  constructor() {
    this.pool = {}
    this.client = {}
  }

  __init = async () => {
    this.pool = new Pool({
      user: config.database.user,
      host: config.database.host,
      database: config.database.db,
      password: config.database.password,
      port: config.database.port,
    })

    this.client = await this.pool.connect()
  }

  getCompanyIdAndNameByCompanyToken = async (token) => {
    return await this.client.query('SELECT id, company_name FROM companies WHERE token = $1', [token])
  }

  getUserDetailByUsername = async (username) => {
    return await this.client.query('SELECT * FROM users WHERE username = $1', [username])
  }

  insertNewUser = async (username, fullName, mobilePhone, passwordHash) => {
    const query = 'INSERT INTO users(username, full_name, mobile_phone, password) VALUES ($1, $2, $3, $4)'
    const params = [username, fullName, mobilePhone, passwordHash]

    await this.client.query(query, params)
  }

  updateLineIdIfNull = async (username, lineId) => {
    const query = 'UPDATE users SET line_id = $1 WHERE username = $2 AND line_id ISNULL'
    const params = [lineId, username]

    await this.client.query(query, params)
  }

  insertNewSubscriber = async (companyId, userId) => {
    const query = 'INSERT INTO user_subscribes(company_id, user_id, active_line) VALUES ($1, $2, $3) ' +
      'ON CONFLICT (company_id, user_id) ' +
      'DO UPDATE SET active_line = EXCLUDED.active_line'
    const params = [companyId, userId, true]

    await this.client.query(query, params)
  }

  updateStatusActiveLine = async(companyId, userId, status) => {
    const query = 'UPDATE user_subscribes SET active_line = $1 WHERE company_id = $2 AND user_id = $3'
    const params = [status, companyId, userId]

    await this.client.query(query, params)
  }
}

export default new Postgre()