const Discord = require("discord.js");
const data = require("all.db");
const db = new data();


exports.run = async (client, message, args) => {
    let klan = db.get(`klan.${message.guild.id}`).filter(a => a.yetkili.includes(message.author.id)) || [];
    if(!klan[0]) return message.channel.send("Bir Klan Sahibi Değilsin");

    const row = new Discord.MessageActionRow();
    row.addComponents(new Discord.MessageButton().setCustomId("kapat").setLabel("Klanı Kapat").setStyle('PRIMARY'));

    message.channel.send({content:"Klanı Kapatmak İstiyorsanız Butona Basın;",components:[row]});

    const filter = (i) => {
      return i.user.id === message.author.id;
    };
    const collector = message.channel.createMessageComponentCollector({ filter:filter, time: 10000 });
    collector.on('collect', async i => {
      if(i.customId == "kapat"){
        klan[0].uye.forEach(a =>{
            db.delete(`klan.${a}.id`);
        });
        db.delete(`klanlar.${klan[0].id}`);
        db.pull(`klan.${message.guild.id}`,klan[0].id,"id");

        await i.update({content:"Klan Başarıyla Kapatıldı :(",components:[]});
      }
    });
} 
exports.conf = {
  enabled: true,
  dm: false,
  name: "klankapat",
  aliases: []
};
