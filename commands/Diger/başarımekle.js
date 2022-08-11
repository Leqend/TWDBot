const Discord = require("discord.js");
const veriler = require("../../veriler.json");
const config = require("../../vezalan.json");

const moment = require("moment-timezone");

const data = require("all.db");
const db = new data();

exports.run = async(client,message,args) =>{
    if(!config.owners.includes(message.author.id)) return message.channel.send("Bu komutu sadece bot sahibi kullanabilir!");

    let user = message.mentions.users.first();
    if(!user) return message.channel.send("Kullanıcıyı Etiketle!");
    let arg = args.slice(1).join(" ");
    let basarim = veriler.başarımlar;
    if(!basarim.includes(arg)) return message.channel.send("Başarım Bulunamadı!");
    let bas = db.get(`user.${message.guild.id}.${user.id}.basarim`) || [];
    let find = bas.find(x => x.isim == arg);
    if(find) return message.channel.send("Bu Başarım Zaten Var!");
    db.push(`user.${message.guild.id}.${user.id}.basarim`,{isim:arg,tarih:moment().tz('Turkey').format('DD.MM.YYYY, h:mm:ss')});
    message.channel.send("Başarım Eklendi!")
};


exports.conf = {
    enabled: true,
    dm:false,
    name: "başarımekle",
    aliases: [],
};

