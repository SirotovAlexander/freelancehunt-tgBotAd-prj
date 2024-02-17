const TelegramBot = require("node-telegram-bot-api");
const { Api, TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");

require("dotenv").config();

const apiId = 21198973;
const session = new StringSession(process.env.STRING_SESSION); // You should put your string session here
const client = new TelegramClient(session, apiId, process.env.API_HASH, {});

const bot = new TelegramBot(process.env.API_KEY_BOT, {
  polling: {
    interval: 2000,
    autoStart: true,
  },
});

bot.on("text", async (msg) => {
  console.log(msg);
  await bot.sendMessage(msg.chat.id, msg.text);
  (async function run() {
    await client.connect(); // This assumes you have already authenticated with .start()

    const result = await client.invoke(
      new Api.messages.SendMessage({
        // peer: "two_face_project",
        noWebpage: true,
        background: true,
        clearDraft: true,
        peer: "https://t.me/mariia2208",
        replyToMsgId: 6872073,
        message: msg.text,
        randomId: Math.floor(Math.random() * 1000000),
        scheduleDate: 789917,
      })
    );
    console.log(result); // prints the result
    // process.exit();
  })();
});
