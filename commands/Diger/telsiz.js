const Discord = require("discord.js");
const moment = require("moment-timezone");

const data = require("all.db");
const db = new data();

exports.run = async(client,message,args) =>{
    let kanale = db.get(`kanallar`);
    if(!kanale.includes(message.channel.id)) return message.channel.send("Doğru kanalda değilsin!");
    let env = db.get(`envanter.${message.guild.id}.${message.author.id}`) || [];
    let telsiz = env.find(a => a.id == 202);
    if(!telsiz) return message.channel.send("Telsiz Bulunamadı!");
    let user = message.mentions.users.first();
    if(!user) return message.channel.send("Kullanıcıyı Etiketlemelisin!");
    let arg = args.slice(1).join(" ");
    if(!arg) return message.channel.send("Kullanım: !telsiz <@Kullanıcı> <Mesaj>");
    /*let arg = args.slice(0).join(" ").split(/[\/]/);
    if(!arg[0]) return message.channel.send("Başlık Gir. (<Başlık> / <Metin>)");
    if(!arg[1]) return message.channel.send("Bir Yazı Gir. (<Başlık> / <Metin>)");*/

    let basarim = db.get(`user.${message.guild.id}.${message.author.id}.basarim`) || [];
    let basarimlar = basarim.map(a => a.isim);
    if(!basarimlar.includes("Bipbop Orada mısın")) {
        db.push(`user.${message.guild.id}.${message.author.id}.basarim`,{isim:"Bipbop Orada mısın",tarih:moment().tz('Europe/Istanbul').format('DD.MM.YYYY, HH:mm:ss')});
    }

    message.delete();
    let kanal = client.channels.cache.get("953393014275977226");
    kanal.send(`:radio:**|**\`Mesajı Gönderen:\` <@${message.author.id}> \n📻**|**\`Mesajı Alan:\` <@${user.id}> \n\n🗣️**|**\`İleti:\` ${arg}`).catch(err =>{ message.channel.send("Mesaj Gönderilemedi!")});
    
};


exports.conf = {
    enabled: true,
    dm:false,
    name: "telsiz",
    aliases: [],
};

