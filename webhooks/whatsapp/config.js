require('dotenv').config()

export default {
  database: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    db: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT
  },
  whatsapp: {
    number: process.env.TWILIO_NUMBER,
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN
  }
}