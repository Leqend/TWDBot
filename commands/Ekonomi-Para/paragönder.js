const Discord = require("discord.js");

const data = require("all.db");
const bdb = new data();

exports.run = async(client,message,args) =>{
    let banka = bdb.get(`bakiye.${message.guild.id}.${message.author.id}`)||0;

    let user = message.mentions.users.first();
    if(!user) return message.channel.send("Lütfen Birini Etiketle!");
    let bbakiye = args[1];
    let sbakiye = parseInt(bbakiye);
    if(isNaN(bbakiye)) return message.channel.send("Sayı Belirt!").then(a => setTimeout(function(){a.delete()},5000));

    let karakter = [".",",","*","/",":",";","-","+","e"];
    let err = false;
    karakter.forEach(a => sbakiye.includes(a) ? err = true : null);
    if(err == true) return message.channel.send("Lütfen özel karakter kullanmayın!");

    if(banka < sbakiye) return message.channel.send("O Kadar Doların Yok!");
    sbakiye = Math.abs(parseInt(sbakiye));
    bdb.add(`altin.${message.guild.id}.${user.id}`,sbakiye);
    bdb.substr(`altin.${message.guild.id}.${message.author.id}`,sbakiye);

    const emb = new Discord.MessageEmbed()
    .setAuthor({name:message.guild.name, iconURL:message.guild.iconURL({dynamic:true})})
    .setTitle(`Dolar Gönder.`)
    .setDescription(`Gönderdiğin Kişi: <@${user.id}> \nGönderilen Dolar: ${sbakiye}`)
    .setFooter({text:message.author.tag, iconURL:message.author.displayAvatarURL({dynamic:true})})
    message.channel.send({embeds:[emb]});
};


exports.conf = {
    enabled: true,
    dm:false,
    name: "para-gönder",
    aliases: ["para-gonder","paragonder","paragönder"],
};

