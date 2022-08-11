const Discord = require("discord.js");
const config = require("../../vezalan.json");
const data = require("all.db");
const db = new data();

exports.run = async(client,message,args) =>{
    if(!config.owners.includes(message.author.id)) return message.channel.send("Bu komutu sadece bot sahibi kullanabilir!");
    let kelime = Object.keys(db.get(`user.${message.guild.id}`));
    kelime.forEach(a =>{
        db.set(`user.${message.guild.id}.${a}.kelime`,0);
    });
    return message.channel.send("Tüm kelimeler sıfırlandı!");
};


exports.conf = {
    enabled: true,
    dm:false,
    name: "ksıfırla",
    aliases: ["kelimesıfırla"],
};

