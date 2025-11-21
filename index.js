import express from "express";
import TelegramBot from "node-telegram-bot-api";

const TOKEN = process.env.TELEGRAM_TOKEN;
const app = express();
app.use(express.json());

// Biar node-telegram-bot-api jalan dengan webhook
const bot = new TelegramBot(TOKEN, { webHook: true });

// Webhook endpoint
app.post(`/webhook/${TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Handler pesan
bot.on("message", (msg) => {
  bot.sendMessage(msg.chat.id, `Halo ${msg.from.first_name}!`);
});

// Start server (WAJIB pakai PORT dari Railway)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Bot running on port " + PORT);
  bot.setWebHook(`${process.env.WEBHOOK_URL}/webhook/${TOKEN}`);
});
