const Discord = require("discord.js");

const data = require("all.db");
const db = new data();


exports.run = async(client,message,args) =>{
    let gelir = db.get(`altinBanka.${message.guild.id}.${message.author.id}`) || 0;
    if(gelir == 0) return message.channel.send("Geliriniz Bulunmamakta!");
    let miktar = args[0];
    if(isNaN(miktar)) return message.channel.send("Bir miktar girin!");
    let karakter = [".",",","*","/",":",";","-","+","e"];
    let err = false;
    karakter.forEach(a => miktar.includes(a) ? err = true : null);
    if(err == true) return message.channel.send("Lütfen özel karakter kullanmayın!");
    if(miktar > gelir) return message.channel.send("Çekmek istediğin miktar fazla!");

    db.add(`altin.${message.guild.id}.${message.author.id}`, Math.abs(parseInt(miktar)));

    db.substr(`altinBanka.${message.guild.id}.${message.author.id}`, Math.abs(parseInt(miktar)));

    const emb = new Discord.MessageEmbed()
    .setAuthor({name:message.guild.name, iconURL:message.guild.iconURL({dynamic:true})})
    .setDescription(`Çekilen Miktar: ${miktar}`)
    .setFooter({text:message.author.username, iconURL:message.author.displayAvatarURL({dynamic:true})})
    message.channel.send({embeds:[emb]});

};


exports.conf = {
    enabled: true,
    dm:false,
    name: "gelirçek",
    aliases: [],
};

