const Discord = require("discord.js");
const config = require("../../vezalan.json");

const data = require("all.db");
const db = new data();

exports.run = async(client,message,args) =>{
    if(!config.owners.includes(message.author.id)) return message.channel.send("Bu komutu sadece bot sahibi kullanabilir!");
    let user = message.mentions.users.first();
    if(!user) return message.channel.send("Kullanıcıyı etiketlemelisin!");
    db.delete(`basarimlar.${message.guild.id}.${user.id}`);
    db.delete(`user.${message.guild.id}.${user.id}.basarim`);

    message.channel.send("Başarım Temizlendi!");

};


exports.conf = {
    enabled: true,
    dm:false,
    name: "başarımsıfırla",
    aliases: [],
};

