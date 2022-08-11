const Discord = require("discord.js");
const data = require("all.db");
const db = new data();


exports.run = async (client, message, args) => {
    let klan = db.get(`klan.${message.guild.id}`).filter(a => a.yetkili.includes(message.author.id)) || [];
    if(klan.length <= 0) return message.channel.send("Bir Klan Sahibi Değilsin");
    let user = message.mentions.users.first();
    if(!user) return message.channel.send("Davet Edecek Birini Etiketle!");

    db.push(`klandavet.${message.guild.id}.${user.id}`,klan[0].id);

    message.channel.send(`**${user.username}** Klana Davet Edildi!`)
} 
exports.conf = {
  enabled: true,
  dm: false,
  name: "klandavetet",
  aliases: []
};
