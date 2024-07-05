const TelegramBot = require('node-telegram-bot-api')
const { gameOptions, againOption} = require("./options")
const token = '7304131271:AAG9LHkmbkK5Brk35sfnTwXDEexenhilhCk'
const bot = new TelegramBot(token, {polling: true})


const obj ={}





const startGame = async chatId => {
    await bot.sendMessage(chatId, "Kompyuter 0 dan 9 gacha son o'yladi, Siz o'sha sonni topishga harakat qilib ko'ring")
    const randomNumber = Math.floor(Math.random() * 10)
    obj[chatId] = randomNumber
    await bot.sendMessage(chatId, "To'g'ri sonni toping", gameOptions)
}
const bootstrap = () => {
    
    bot.setMyCommands([
        {
          command: '/start',
          description: "Botni ishga tushirish"
        },
        {
         command: '/info',
         description: "O'zingiz haqingizda ma'lumot"
        },
        {command: "/game",
         description: "O'yin o'ynash"
        }
        
     ])
     

    bot.on('message',async msg => {
        const text = msg.text
        const chatId = msg.chat.id;
    
        if(text === "/start"){
          return  bot.sendMessage(chatId, `Assalomu alaykum ${msg.from?.first_name} Numbers Game Botiga xush kelibsiz!`);
        }
    
        if(text === "/info"){
            await bot.sendSticker(chatId, "https://tlgrm.eu/_/stickers/ccd/a8d/ccda8d5d-d492-4393-8bb7-e33f77c24907/192/1.webp")
    
            await bot.sendPhoto(chatId, "https://cerberus-laboratories.com/images/blog/random_numbers.jpg")
          return  bot.sendMessage(chatId, `Sizning telegram usernameingiz ${msg.from?.username}, Sizning ismingiz esa ${msg.from?.first_name} ${msg.from?.last_name}`)
        }
    
      if(text === '/game'){
       return startGame(chatId)
      }
       
    })

    bot.on("callback_query", msg => {
        const data = msg.data
        const chatId = msg.message.chat.id

        if(data === '/again'){
            return startGame(chatId)
        }

        if(data == obj[chatId]){
            return bot.sendMessage(chatId, `Tabriklaymiz, Siz Kompyuter o'ylagan sonni topdingiz !!!  Kompyuter ${obj[chatId]} sonini o'ylagan edi`)
        }else{
            return bot.sendMessage(chatId, `Siz tanlagan son noto'g'ri, Siz ${data} sonini tanladingiz. Kompyuter ${obj[chatId]} sonini o'ylagan edi.`, againOption)
        }

        
        console.log(msg);
    })
}


bootstrap()