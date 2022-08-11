const Discord = require("discord.js");
const veriler = require("../../veriler.json");
const data = require("all.db");
const db = new data();

exports.run = async(client,message,args) =>{
    let xp = db.get(`user.${message.guild.id}.${message.author.id}.xp`) || 0;
    let level = db.get(`user.${message.guild.id}.${message.author.id}.seviye`) || 1;
    let puan = db.get(`user.${message.guild.id}.${message.author.id}.puan.level`) || 0;
    let güç = db.get(`user.${message.guild.id}.${message.author.id}.puan.güç`) || 0;
    let can = db.get(`user.${message.guild.id}.${message.author.id}.puan.can`) || 0;
    let yenilenme = db.get(`user.${message.guild.id}.${message.author.id}.puan.yenilenme`) || 0;
    let xpveri = veriler.seviye.filter(a => a.level >= level);

    const emb = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(`${message.author.username} Level Bilgileri`)
    .setDescription(`Level: **${level}**\nXP: **${xp}**/**${xpveri[0].xp}** \nHarcayabileceğin Level Puanları: **${puan}** \nGüç Seviyesi: **${güç}/10** \nCan Seviyesi: **${can}/10** \nYenilenme Seviyesi: **${yenilenme}/10**`)

    message.channel.send({embeds:[emb]});
};


exports.conf = {
    enabled: true,
    dm:false,
    name: "level",
    aliases: [],
};

