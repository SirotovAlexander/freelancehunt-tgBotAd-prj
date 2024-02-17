const TelegramBot = require("node-telegram-bot-api");
const { Api, TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");

require("dotenv").config();

const apiId = 21198973;
const apiHash = "129fb6187b256a6b35e139c35b19e615";

const session = new StringSession(
  "1AgAOMTQ5LjE1NC4xNjcuNDEBu42rlElH+pFdxxJ3XZUm4yg2Iu4fBtPXFOKPMsfdcH8Z8T0QMXZ/hzmJwANJRy0dYNcp6pfcdHK3tE889nWNB5T2wUGoUK87QSTKnDi1Mc+8uGNCFi9vz1f09MHtBdHlSthLiShpSof7KjsMvHX77sEqVJ/BovhOfrpYuUwcjG8aLJyLb038VDmfA8m/JQ/1dMNSo8o5475Lhzf5ETt8cHCzer/yu7BSIen8s5iyOVum/WxmcysXVZEzV6qWqTbt4Mw9zYB4X1We1Oer/2L4MGn94DfT87sMnxV3va9U1FVwN51bRcauV464GjOVv3zTmlryfSQMr4yW7Ycmdc7+kAM="
); // You should put your string session here

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

const client = new TelegramClient(session, apiId, apiHash, {});

(async function run() {
  await client.connect(); // This assumes you have already authenticated with .start()

  const result = await client.invoke(
    new Api.messages.SendMessage({
      // peer: "two_face_project",
      peer: "ceasar1995",
      message: "Hello there@!!",
      randomId: BigInt("-4156887774564"),
      noWebpage: true,
      noforwards: true,
      scheduleDate: 43,
      clearDraft: true,
      // sendAs: "two_face_project",
    })
  );
  console.log(result); // prints the result
})();
