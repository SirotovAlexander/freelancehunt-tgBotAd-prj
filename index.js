const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");
require("dotenv").config();

const bot = new TelegramBot(process.env.API_KEY_BOT, {
  polling: {
    interval: 2000,
    autoStart: true,
  },
});

// console.log(process.env.API_KEY_BOT);
// bot.on("polling_error", (err) => console.log(err.data.error.message));
bot.on("text", async (msg) => {
  console.log(msg);
  await bot.sendMessage(msg.chat.id, msg.text);
  await axios
    .post("https://t.me/sadasdaqw", {
      message_id: 35,
      from: {
        id: 6110004577,
        is_bot: false,
        first_name: "467bb057db35b17f58d663158d63a0b2",
        username: "two_face_project",
        language_code: "ru",
      },
      chat: {
        id: 6110004577,
        first_name: "467bb057db35b17f58d663158d63a0b2",
        username: "two_face_project",
        type: "private",
      },
      date: 1708124209,
      text: `${msg.text}`,
    })
    .then((res) => {
      console.log("успешно отправлено");
    })
    .catch((err) => console.log(err.massege));
});
