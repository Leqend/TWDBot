const Discord = require("discord.js");
const moment = require("moment-timezone");
const data = require("all.db");
const db = new data();


exports.run = async(client,message,args) =>{
    let klanId = db.get(`klan.${message.author.id}.id`);
    if(!klanId) return message.channel.send("Herhangi bir klana üye değilsin!");
    let klanlar = db.get(`klan.${message.guild.id}`);
    var klanIds = klanlar.findIndex(a => a.id == parseInt(klanId));
    let klan = klanlar[klanIds];
    if(!klan) return message.channel.send("Klanı Bulamadım!");
    let altin = args[0];
    let yaltin = db.get(`altin.${message.guild.id}.${message.author.id}`) || 0;
    if(isNaN(altin)) return message.channel.send("Miktar Belirt!");
    let karakter = [".",",","*","/",":",";","-","+","e"];
    let err = false;
    karakter.forEach(a => altin.includes(a) ? err = true : null);
    if(err == true) return message.channel.send("Lütfen özel karakter kullanmayın!");
    if(altin > yaltin) return message.channel.send("Yeterli Altın Yok!");
    db.substr(`altin.${message.guild.id}.${message.author.id}`,parseInt(altin));
    
    db.set(`klan.${message.guild.id}.${klanIds}`,{...klan, altin:(klan.altin+parseInt(altin))});

    let basarim = db.get(`user.${message.guild.id}.${message.author.id}.basarim`) || [];
    let basarimlar = basarim.map(a => a.isim);
    if(!basarimlar.includes("Pamuk Eller Cebe")) {
        db.push(`user.${message.guild.id}.${message.author.id}.basarim`,{isim:"Pamuk Eller Cebe",tarih:moment().tz('Europe/Istanbul').format('DD.MM.YYYY, HH:mm:ss')});
    }
    message.channel.send(`Klana Bağış Yapıldı! \nBağışlanan Altın: ${altin}`)
};


exports.conf = {
    enabled: true,
    dm:false,
    name: "klanbağış",
    aliases: [],
};

