const Discord = require("discord.js");
const config = require("../../vezalan.json");
const data = require("all.db");
const db = new data();

exports.run = async(client,message,args,log) =>{
    let bpara = args[1];
    let us = message.mentions.members.first();
    if(!us) return message.channel.send("Birini etiketle yoldaş");
    if(us.id == message.author.id) return message.channel.send("Kendine para atamazsın");
    let para = db.get(`altin.${message.guild.id}.${message.author.id}`) || 0;
    if(isNaN(bpara) || bpara == "" || bpara == " ") return message.channel.send("Sayı girsene knks");
    if(para < parseInt(bpara)) return message.channel.send("Yeterli Para Yok!");
    bpara = Math.abs(parseInt(bpara));
    let aa = db.substr(`altin.${message.guild.id}.${message.author.id}`, parseInt(bpara));
    let altin = db.add(`altin.${message.guild.id}.${us.user.id}`, parseInt(bpara));

    const emb = new Discord.MessageEmbed()
    .setAuthor({name:message.guild.name, iconURL:message.guild.iconURL({dynamic:true})})
    .setTitle(`${us.displayName} Dolar Yollandı`)
    .setDescription(`Verilen Miktar: ${bpara} \n\n💰 Güncel Dolar: ${aa}`)
    .setFooter({text:us.user.tag, iconURL:us.displayAvatarURL({dynamic:true})})
    message.channel.send({embeds:[emb]});

};


exports.conf = {
    enabled: true,
    dm:false,
    name: "para-ver",
    aliases: ["paraver"],
};

