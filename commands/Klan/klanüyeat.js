const Discord = require("discord.js");
const data = require("all.db");
const db = new data();


exports.run = async (client, message, args) => {
    let klanlar = db.get(`klan.${message.guild.id}`);
    let klanCheck = klanlar.filter(a => a.yetkili.includes(message.author.id)) || [];
    if(klanCheck == []) return message.channel.send("Bir Klan Sahibi Değilsin");

    let user = message.mentions.users.first();
    if(!user) return message.channel.send("Atacak Birini Etiketle!");


    var klanIds = klanlar.findIndex(a => a.id == klanCheck[0].id);

    let uyeler = klanCheck[0].uye;
    if(!uyeler.includes(user.id)) return message.channel.send("Zaten Klanda Değil!");

    let newUye = [];

    uyeler.forEach(a =>{
      if(a != user.id){
        newUye.push(a);
      }
    });

    db.delete(`klan.${user.id}.id`);
    db.set(`klan.${message.guild.id}.${klanIds}`,{...klanCheck[0], uye:newUye});

    message.channel.send("Kullanıcı Klandan Başarıyla Atıldı :(");
} 
exports.conf = {
  enabled: true,
  dm: false,
  name: "klanüyeat",
  aliases: []
};
