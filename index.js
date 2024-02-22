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

let adMessage = null;
let chanelList = [];

const commands = [
  {
    command: "start",
    description: "Запуск бота",
  },
  {
    command: "msggen",
    description: "Генерация рекламного сообщения",
  },
  {
    command: "chanelsgen",
    description: "Генерация массива каналов",
  },
  {
    command: "listcheck",
    description: "Вывести сохраненный текст рекламы",
  },
  {
    command: "arrchech",
    description: "Вывести список каналов для рассылки",
  },
  {
    command: "flood",
    description: "Запуск рассылки",
  },
];

bot.setMyCommands(commands);

bot.on("text", async (msg) => {
  try {
    if (msg.text.startsWith("/start")) {
      await bot.sendMessage(
        msg.chat.id,
        `Hy Vita!\n Для использования бота необходимо сделать два шага: 1)Создать рекламное сообщение. В меню слева есть соответствующая кнопка. Перед любым сформированым рекламным сообщением необходимо поставить знак $.\n 2) Нужно создать массив каналов. Каналы передаются полными ссылками через пробел. 3)Выполнив эти два шага проверь сооветсвующими функциями из меню бота сохраненное сообщение и масив каналов, после чего нажимай команду flood!`
      );
    } else if (msg.text == "/msggen") {
      await bot.sendMessage(msg.chat.id, `Введи рекламное сообщение.`);

      bot.on("text", async (msg) => {
        if (msg.text.startsWith("$")) {
          adMessage = msg.text.slice(1, msg.text.length);
          await bot.sendMessage(msg.chat.id, `Рекламное сообщение Сохранено!`);
        }
      });
    } else if (msg.text == "/chanelsgen") {
      await bot.sendMessage(msg.chat.id, `Введи список каналов.`);
      bot.on("text", async (msg) => {
        if (msg.text.startsWith("http")) {
          const strToArr = msg.text.split(" ").filter((item) => item !== "");

          chanelList = null;
          chanelList = strToArr;
          await bot.sendMessage(msg.chat.id, `Cписок каналов Сохранен!`);
        }
      });
    } else if (msg.text == "/listcheck") {
      await bot.sendMessage(
        msg.chat.id,
        `<b>${adMessage || "Реклама не создана"}</b>\n`,
        {
          parse_mode: "HTML",
        }
      );
    } else if (msg.text == "/arrchech") {
      if (chanelList[0] === undefined) {
        await bot.sendMessage(
          msg.chat.id,
          "Заполните список каналов для рассылки!"
        );
      } else {
        let keyboard = [];
        for (let i = 0; i < chanelList.length; i++) {
          keyboard.push([
            {
              text: `${chanelList[i]}`,
              callback_data: "delete" + i,
            },
          ]);
        }
        console.log(keyboard);
        await bot.sendMessage(msg.chat.id, `Каналы для рассылки`, {
          reply_markup: { inline_keyboard: keyboard },
        });
      }
    } else if (msg.text == "/flood") {
      if (adMessage === null) {
        await bot.sendMessage(msg.chat.id, "Созайте рекламное сообщение!");
      } else if (chanelList[0] === undefined) {
        await bot.sendMessage(
          msg.chat.id,
          "Заполните список каналов для рассылки!"
        );
      } else {
        (async function run() {
          await client.connect(); // This assumes you have already authenticated with .start()

          for (let i = 0; i < chanelList.length; i++) {
            const result = await client.invoke(
              new Api.messages.SendMessage({
                // peer: "two_face_project",
                noWebpage: true,
                background: true,
                clearDraft: true,
                peer: `${chanelList[i]}`,
                replyToMsgId: 6872073,
                message: `${adMessage}`,
                randomId: Math.floor(Math.random() * 1000000),
                scheduleDate: 789917,
              })
            );
            console.log(result); // prints the result
          }

          client.disconnect();
        })();
      }
    }
  } catch (error) {
    console.log(error);
  }
});

bot.on("callback_query", async (ctx) => {
  try {
    chanelList.splice(ctx.data[ctx.data.length - 1], 1);
    await bot.deleteMessage(ctx.message.chat.id, ctx.message.message_id);
  } catch (error) {
    console.log(error);
  }
});
