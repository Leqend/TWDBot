const Discord = require("discord.js");
const config = require("../../vezalan.json");
const data = require("all.db");
const bdb = new data();

exports.run = async(client,message,args,log) =>{
    if(!config.owners.includes(message.author.id)) return message.channel.send("Sen Kurucu Değilsin!");

    let bpara = args[1];
    let us = message.mentions.members.first();
    if(!us) return message.channel.send("Birini etiketle yoldaş").then(a => setTimeout(function(){a.delete()},5000));

    if(isNaN(bpara) || bpara == "" || bpara == " ") return message.channel.send("Sayı girsene knks").then(a => setTimeout(function(){a.delete()},5000));

    let karakter = [".",",","*","/",":",";","+","e"];
    let err = false;
    karakter.forEach(a => bpara.includes(a) ? err = true : null);
    if(err == true) return message.channel.send("Lütfen özel karakter kullanmayın!");

    let altin = bdb.add(`altin.${message.guild.id}.${us.user.id}`, parseInt(bpara));

    const emb = new Discord.MessageEmbed()
    .setAuthor({name:message.guild.name, iconURL:message.guild.iconURL({dynamic:true})})
    .setTitle(`${us.displayName} Güncel Dolarınız: ${altin}`)
    .setDescription(`Eklenen Miktar: ${bpara} \n\n💰 Dolar: ${altin}`)
    .setFooter({text:us.user.tag, iconURL:us.displayAvatarURL({dynamic:true})})
    message.channel.send({embeds:[emb]});

};


exports.conf = {
    enabled: true,
    dm:false,
    name: "para-ekle",
    aliases: ["paraekle"],
};

