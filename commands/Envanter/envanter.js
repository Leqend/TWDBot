const Discord = require("discord.js");

const data = require("all.db");
const db = new data();


exports.run = async(client,message,args) =>{
    let inv = db.get(`envanter.${message.guild.id}.${message.author.id}`) || [];
    if(inv.length == 0) return message.channel.send("Envanterin Boş!");
    
    let liste = "";
    inv.forEach((item) => {
        if(item.adet <= 0) return db.pull(`envanter.${message.guild.id}.${message.author.id}`,item.id,"id");
        if(item.tür == "araçlar" || item.tür == "evler") return;
        liste += `İsim: **${item.isim}**, Adet: **${item.adet}**\n`;
    });
    const emb = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(`${message.author.username} Envanteri`)
    .setDescription(liste);

    message.channel.send({embeds:[emb]});
};


exports.conf = {
    enabled: true,
    dm:false,
    name: "envanter",
    aliases: [],
};

