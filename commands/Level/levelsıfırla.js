const Discord = require("discord.js");
const config = require("../../vezalan.json");

const data = require("all.db");
const db = new data();

exports.run = async(client,message,args) =>{
    if(!config.owners.includes(message.author.id)) return message.channel.send("Sen Kurucu Değilsin!");
    let user = message.mentions.users.first();
    if(!user) return message.channel.send("Kullanıcıyı etiketlemelisin!");

    db.set(`user.${message.guild.id}.${user.id}.xp`,1);
    db.set(`user.${message.guild.id}.${user.id}.seviye`,1);
    db.set(`user.${message.guild.id}.${user.id}.can`,100);
    db.set(`user.${message.guild.id}.${user.id}.maxcan`,100);
    db.delete(`user.${message.guild.id}.${user.id}.puan`);
    db.delete(`user.${message.guild.id}.${user.id}.yenilenme`);
    db.delete(`user.${message.guild.id}.${user.id}.güç`);

    message.channel.send(`${user} kullanıcısının verileri başarıyla sıfırlandı!`);	
};


exports.conf = {
    enabled: true,
    dm:false,
    name: "levelsıfırla",
    aliases: [],
};

