const Discord = require("discord.js");
const moment = require("moment-timezone");

const veriler = require("../../veriler.json");
const data = require("all.db");
const db = new data();


exports.run = async (client, message, args) => {
    let klan = db.get(`klan.${message.guild.id}`).filter(a => a.yetkili.includes(message.author.id)) || [];
    if(klan.length <= 0) return message.channel.send("Bir Klan Sahibi Değilsin");

    var klanIds = klan.findIndex(a => a.id == parseInt(klan[0].id));
    let klans = klan[klanIds];
    if(!klans) return;
    let seviye = veriler.klanseviye.find(a => a.level == (klan[0].seviye+1));
    if(!seviye) return message.channel.send("Maximum Seviye!");
    if(klan[0].altin < seviye.altin) return message.channel.send(`Klanın altını yeterli değil! \nGerekli Olan: ${seviye.altin-klan[0].altin}`);
    db.set(`klan.${message.guild.id}.${klanIds}`, {...klan[0],limit:seviye.limit,altin:(klans.altin-seviye.altin), seviye:(klans.seviye+1)});
    let basarim = db.get(`user.${message.guild.id}.${message.author.id}.basarim`) || [];
    let basarimlar = basarim.map(a => a.isim);
    if(!basarimlar.includes("Umut Saçan Grup")) {
      db.push(`user.${message.guild.id}.${message.author.id}.basarim`,{isim:"Umut Saçan Grup",tarih:moment().tz('Europe/Istanbul').format('DD.MM.YYYY, HH:mm:ss')});
    }
    message.channel.send("Klan Seviye Atladı!")  
} 
exports.conf = {
  enabled: true,
  dm: false,
  name: "klanseviyeatlat",
  aliases: []
};
