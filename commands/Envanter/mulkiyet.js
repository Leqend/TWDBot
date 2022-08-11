const Discord = require("discord.js");

const data = require("all.db");
const db = new data();


exports.run = async(client,message,args) =>{
    let inv = db.get(`envanter.${message.guild.id}.${message.author.id}`) || [];
    if(inv.length == 0) return message.channel.send("Hiç Mülkün Yok!");
    let invv = inv.filter(item => item.tür == "araçlar" || item.tür == "evler");
    if(invv.length == 0) return message.channel.send("Hiç Mülkün Yok!");

    let liste = [];
    inv.forEach((item) => {
        if(item.adet == 0) return db.pull(`envanter.${message.guild.id}.${message.author.id}`,item.id,"id");
        if(item.tür != "araçlar" && item.tür != "evler") return;
        if(item.tür == "araçlar"){
            let emoji = item.araç == "araba" ? "🏍️" : "🚗";
            liste.push({label:`${item.isim}`, description:`Adet: ${item.adet}`,value:`${item.id}`,emoji: {name: emoji}});
        }else{
            liste.push({label:`${item.isim}`, description:`Adet: ${item.adet}`,value:`${item.id}`,emoji: {name: "🏠"}});
        }
    });
    const row = new Discord.MessageActionRow();
    row.addComponents(new Discord.MessageSelectMenu().setCustomId('select').setPlaceholder('Tıklayarak İncele').addOptions(liste));
    const filter = (i) => i.user.id === message.author.id;
    const collector = message.channel.createMessageComponentCollector({ filter:filter, time: 10000 });
    collector.on('collect', async i => {
        i.deferUpdate().catch(err => {});
    });
    message.channel.send({components:[row]}).catch(err => { message.channel.send("Hiç Mülkün Yok!"); });
};


exports.conf = {
    enabled: true,
    dm:false,
    name: "mülkiyet",
    aliases: [],
};

