const Discord = require("discord.js");
const data = require("all.db");
const db = new data();


exports.run = async (client, message, args) => {
    let klan = db.get(`klan.${message.guild.id}`).filter(a => a.yetkili.includes(message.author.id)) || [];
    if(klan.length <= 0) return message.channel.send("Bir Klan Sahibi Değilsin");
    let user = message.mentions.users.first();
    if(!user || user.id == message.author.id) return message.channel.send("Devredecek Edecek Birini Etiketle!");
    let klana = db.get(`klan.${message.guild.id}`).filter(a => a.uye.includes(user.id)) || [];
    if(klana.length <= 0) return message.channel.send("Kullanıcı klanda değil!");

    db.pull(`klan.${message.guild.id}`,klan[0].id,"id");
    db.push(`klan.${message.guild.id}`, {...klan[0], yetkili:[user.id]});
    
    message.channel.send("Klan Devredildi :(")
} 
exports.conf = {
  enabled: true,
  dm: false,
  name: "klandevret",
  aliases: []
};
