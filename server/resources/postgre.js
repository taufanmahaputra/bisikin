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

  getCompanyByEmailOrToken = async (param) => {
    return await this.client.query('SELECT * FROM companies WHERE email = $1 OR token = $1', [param])
  }

  insertCompany = async (req) => {
    const query = 'INSERT INTO companies(company_name, url, first_name, last_name, email, password, ' +
      'mobile_phone, address, phone, token) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)'

    const params = [req.company_name, req.url, req.first_name, req.last_name, req.email, req.password,
      req.mobile_phone, req.address, req.phone, req.token]

    return await this.client.query(query, params)
  }

  getUserDetailByUsername = async (username) => {
    return await this.client.query('SELECT * FROM users u INNER JOIN user_subscribes us2 ' +
      'ON u.id = us2.user_id WHERE u.username = $1', [username])
  }

  getListUserDetailByUsernames = async (usernames) => {
    return await this.client.query('SELECT * FROM users u INNER JOIN user_subscribes us2 ' +
      'on u.id = us2.user_id WHERE u.username = ANY ($1)', [usernames])
  }

  getListSubscriberByCompanyID = async (companyID) => {
    return await this.client.query('SELECT u.id, active_line, active_telegram, active_whatsapp, full_name, username ' +
      'FROM user_subscribes INNER JOIN users u on user_subscribes.user_id = u.id ' +
      'WHERE company_id = $1;', [companyID])
  }
}

export default new Postgre()