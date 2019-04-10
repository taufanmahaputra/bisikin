require('dotenv').config()

export default {
  database: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    db: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT
  },
  line: {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET
  }
}