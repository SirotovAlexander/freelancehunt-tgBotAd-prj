// const TelegramBot = require("node-telegram-bot-api");
// const axios = require("axios");
require("dotenv").config();

// const bot = new TelegramBot(process.env.API_KEY_BOT, {
//   polling: {
//     interval: 2000,
//     autoStart: true,
//   },
// });

// bot.on("text", async (msg) => {
//   console.log(msg);
//   await bot.sendMessage(msg.chat.id, msg.text);
// });
const path = require("path");
const MTProto = require("@mtproto/core");
new MTProto({
  storageOptions: {
    path: path.resolve(__dirname, "./data/1.json"),
  },
});

const API_ID = process.env.API_ID;
const API_HASH = process.env.API_HASH;

// 1. Create instance
const mtproto = new MTProto({
  API_ID,
  API_HASH,
  storageOptions: {
    path: path.resolve(__dirname, "./data/1.json"),
  },
});

// 2. Print the user country code
mtproto.call("help.getNearestDc").then((result) => {
  console.log("country:", result.country).catch((err) => console.error(err));
});
