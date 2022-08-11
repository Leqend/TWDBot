const Discord = require("discord.js");

const data = require("all.db");
const db = new data();


exports.run = async(client,message,args) =>{
    let gelir = db.get(`altinBanka.${message.guild.id}.${message.author.id}`) || 0;
    let toplam = db.get(`taltinBanka.${message.guild.id}.${message.author.id}`) || 0;


    const emb = new Discord.MessageEmbed()
    .setAuthor({name:message.guild.name, iconURL:message.guild.iconURL({dynamic:true})})
    .setDescription(`Anlık Gelir: **${gelir.toFixed(0)}** \nToplam Gelir: **${toplam.toFixed(0)}**`)
    .setFooter({text:message.author.username, iconURL:message.author.displayAvatarURL({dynamic:true})})
    message.channel.send({embeds:[emb]});

};


exports.conf = {
    enabled: true,
    dm:false,
    name: "gelir",
    aliases: [],
};

