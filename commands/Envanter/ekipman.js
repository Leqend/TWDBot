const Discord = require("discord.js");

const data = require("all.db");
const db = new data();


exports.run = async(client,message,args) =>{
    let zırh = db.get(`ekipman.zırh.${message.guild.id}.${message.author.id}`);
    let silah = db.get(`ekipman.silah.${message.guild.id}.${message.author.id}`);
    if(!zırh) zırh = {isim:"Yok"}
    if(!silah) silah = {isim:"Yok"}
    const emb = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(`${message.author.username}'nın Ekipmanları`)
    .setDescription(`Zırh: **${zırh.isim}**\nSilah: **${silah.isim}**`)
    message.channel.send({embeds:[emb]});

};


exports.conf = {
    enabled: true,
    dm:false,
    name: "ekipman",
    aliases: [],
};

