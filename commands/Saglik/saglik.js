const Discord = require("discord.js");

const data = require("all.db");
const db = new data();

exports.run = async(client,message,args) =>{
    let can = db.get(`user.${message.guild.id}.${message.author.id}.can`) || 100;
    let mcan = db.get(`user.${message.guild.id}.${message.author.id}.maxcan`) || 100;
    let enfeksiyon = db.get(`user.${message.guild.id}.${message.author.id}.enfeksiyon`) || 0;
    let su = db.get(`user.${message.guild.id}.${message.author.id}.su`) || 100;
    let aclik = db.get(`user.${message.guild.id}.${message.author.id}.aclik`) || 100;

    const emb = new Discord.MessageEmbed()
    .setAuthor({name:message.guild.name, iconURL:message.guild.iconURL({dynamic:true})})
    .setTitle(`${message.author.username} Sağlık Durumu`)
    .setDescription(`Can: **${can.toFixed(1)}/${mcan}**\n Enfeksiyon: **%${enfeksiyon}**\n Su: **%${su}**\n Açlık: **%${aclik}**`)
    .setFooter({text:`${message.author.username}#${message.author.discriminator}`, iconURL:message.author.displayAvatarURL({dynamic:true})})

    message.channel.send({embeds:[emb]});


};


exports.conf = {
    enabled: true,
    dm:false,
    name: "sağlık",
    aliases: [],
};

