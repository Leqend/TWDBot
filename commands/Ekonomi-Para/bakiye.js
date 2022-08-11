const Discord = require("discord.js");

const data = require("all.db");
const bdb = new data();


exports.run = async(client,message,args) =>{
    let user = message.mentions.members.first() || message.member;


    let altin = bdb.get(`altin.${message.guild.id}.${user.id}`)||0;
    
    const emb = new Discord.MessageEmbed()
    .setAuthor({name:message.guild.name, iconURL:message.guild.iconURL({dynamic:true})})
    .setTitle(`${user.displayName} Dolar Durumu`)
    .setDescription(`:coin: Dolar: ${altin} `)
    .setFooter({text:`${user.user.username}#${user.user.discriminator}`, iconURL:user.displayAvatarURL({dynamic:true})})
    message.channel.send({embeds:[emb]});
};


exports.conf = {
    enabled: true,
    dm:false,
    name: "bakiye",
    aliases: ["para"],
};

