import * as line from '@line/bot-sdk';

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET
};

const middleware = line.middleware(config);
const client = new line.Client(config);

module.exports = {
  middleware,
  client
}