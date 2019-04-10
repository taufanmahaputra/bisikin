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

  getListSubscriberByCompanyID = async (companyID) => {
    //TODO: change use companyID from auth
    return await this.client.query('SELECT u.id, active_line, active_telegram, active_whatsapp, full_name, username ' +
      'FROM user_subscribes INNER JOIN users u on user_subscribes.user_id = u.id ' +
      'WHERE company_id = $1;', [1])
  }
}

export default new Postgre()