const Discord = require("discord.js");
const data = require("all.db");
const db = new data();


exports.run = async (client, message, args) => {
    let klanlar = db.get(`klan.${message.guild.id}`);
    let klanC = db.get(`klan.${message.author.id}.id`);
    if(!klanC) return message.channel.send("Zaten Bir Klanda Değilsin!");

    var klanIds = klanlar.findIndex(a => a.id == parseInt(klanC));
    let klan = klanlar[klanIds];
    if(!klan) return;

    let uyeler = klan.uye;
    
    if(klan.yetkili.includes(message.author.id)) return message.channel.send("Klanın Sahibi Sensin! \nKlanı birine aktar ve tekrar dene");

    let newUye = [];
    uyeler.forEach(a =>{
      if(a == message.author.id) return;
      newUye.push(a);
    });

    db.delete(`klan.${message.author.id}.id`);
    db.set(`klan.${message.guild.id}.${klanIds}`,{...klan, uye:newUye});

    message.channel.send(`Klandan Başarıyla Ayrıldın!`)
    
} 
exports.conf = {
  enabled: true,
  dm: false,
  name: "klançık",
  aliases: []
};
