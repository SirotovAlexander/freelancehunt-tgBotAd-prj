const TelegramBot = require("node-telegram-bot-api");
const { Api, TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");

require("dotenv").config();

const apiId = 21854456;
const session = new StringSession(process.env.STRING_SESSION); // You should put your string session here
const client = new TelegramClient(session, apiId, process.env.API_HASH, {});

// (async () => {
//   console.log("Loading interactive example...");
//   const client = new TelegramClient(stringSession, apiId, apiHash, {
//     connectionRetries: 5,
//   });
//   await client.start({
//     phoneNumber: async () => await input.text("Please enter your number: "),
//     password: async () => await input.text("Please enter your password: "),
//     phoneCode: async () =>
//       await input.text("Please enter the code you received: "),
//     onError: (err) => console.log(err),
//   });
//   console.log("You should now be connected.");
//   console.log(client.session.save()); // Save this string to avoid logging in again
//   await client.sendMessage("me", { message: "Hello!" });
// })();
// (async function run() {
//   await client.connect(); // This assumes you have already authenticated with .start()

//   const result = await client.invoke(new Api.contacts.GetSaved({}));
//   console.log(result); // prints the result
// })();
