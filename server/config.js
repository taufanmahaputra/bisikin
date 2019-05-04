require('dotenv').config()

export default {
  auth: {
    jwt_secret_key: process.env.JWT_SECRET_KEY
  },
  database: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    db: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT
  },
  service: {
    line: process.env.SERVICE_LINE,
    telegram: process.env.SERVICE_TELEGRAM,
    whatsapp: process.env.SERVICE_WHATSAPP
  }
}