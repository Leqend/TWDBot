const Discord = require("discord.js");

const data = require("all.db");
const db = new data();


exports.run = async(client,message,args) =>{
    let klans = db.get(`klan.${message.guild.id}`).filter(a => a.yetkili.includes(message.author.id)) || false;
    if(!klans[0]) return message.channel.send("Bir Klan Sahibi Değilsin");

    let klanlar = db.get(`klan.${message.guild.id}`);
    var klanIds = klanlar.findIndex(a => a.id == parseInt(klans[0].id));
    let klan = klanlar[klanIds];
    if(!klan) return message.channel.send("Klanı Bulamadım!");
    let altin = args[0];
    let yaltin = klans.altin;
    if(isNaN(altin)) return message.channel.send("Miktar Belirt!");
    if(altin > yaltin) return message.channel.send("Klanda Yeterli Altın Yok!");
    db.add(`altin.${message.guild.id}.${message.author.id}`,parseInt(altin));
    
    db.set(`klan.${message.guild.id}.${klanIds}`,{...klan, altin:(klan.altin-parseInt(altin))});

    message.channel.send(`Klandan Altın Alındı! \nAlınan Altın: ${altin}`)
};


exports.conf = {
    enabled: true,
    dm:false,
    name: "klanparaçek",
    aliases: ["klanparacek"],
};

