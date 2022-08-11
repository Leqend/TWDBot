const Discord = require("discord.js");
const veriler = require("../../veriler.json");
const config = require("../../vezalan.json");
const data = require("all.db");
const db = new data();


exports.run = async(client,message,args) =>{
    if (!config.owners.includes(message.author.id) && !message.member.roles.cache.has(`${config.yetkili.kurucu}`) && !message.member.roles.cache.has(`${config.yetkili.yönetici}`) && !message.member.roles.cache.has(`${config.yetkili.moderatör}`) && !message.member.roles.cache.has(`${config.yetkili.rm}`) && !message.member.roles.cache.has(`${config.yetkili.kılavuz}`)) return message.reply({content: "Bu komutu kullanacak yetkin bulunmamakta.",allowedMentions: {repliedUser: false}});
    let user;
    if (args[0] && isNaN(args[0])) user = message.mentions.users.first()
    if (args[0] && !isNaN(args[0])) {
        user = client.users.cache.get(args[0])
        if (!message.guild.members.cache.has(args[0])) return message.reply({content: "Kullanıcı bulunamadı.",allowedMentions: {repliedUser: false}});
    }
    if (!user) return message.reply({content: "Birini etiketle.",allowedMentions: {repliedUser: false}});
    db.delete(`görünüm.${message.guild.id}.${user.id}`);
    message.reply({content: "Görüntüsü silindi.",allowedMentions: {repliedUser: false}});
};


exports.conf = {
    enabled: true,
    dm:false,
    name: "gs",
    aliases: [],
};