const Discord = require("discord.js");
const veriler = require("../../veriler.json");
const config = require("../../vezalan.json");
const data = require("all.db");
const db = new data();


exports.run = async(client,message,args) =>{
    let miktar = args[0];
    if(isNaN(miktar)) return message.channel.send("Satılacak miktarı belirlemelisin!");
    let karakter = [".",",","*","/",":",";","-","+","e"];
    let err = false;
    karakter.forEach(a => miktar.includes(a) ? err = true : null);
    if(err == true) return message.channel.send("Lütfen özel karakter kullanmayın!");
    
    let ürün = args.slice(1).join(" ").replaceAll(" ","-");
    if(!ürün) return message.channel.send("Satılacak ürünü girmelisin!");

    let veri = veriler.itemler[ürün.toLowerCase()];
    if(!veri) return message.channel.send("Böyle bir ürün yok!");

    let envanter = db.get(`envanter.${message.guild.id}.${message.author.id}`) || [];
    let urun = envanter.find(a => a.id == veri.id);
    if(!urun) return message.channel.send("Sende zaten bu ürün yok!");
    if(urun.adet == 0) return message.channel.send("Sende zaten bu ürün yok!");
    if(miktar > urun.adet) return message.channel.send("Sende bu kadar ürün yok!");
    if(veri.satış == null) return message.channel.send("Bu ürünü geri satamazsın!");
    db.add(`altin.${message.guild.id}.${message.author.id}`,parseInt(veri.satış)*parseInt(miktar));
    db.pull(`envanter.${message.guild.id}.${message.author.id}`,veri.id,"id");
    db.push(`envanter.${message.guild.id}.${message.author.id}`,{...veri, fiyat:undefined, yapılış:undefined, adet:parseInt(urun.adet)-parseInt(miktar)});

    message.channel.send(`${veri.isim}, ${miktar} Adet satıldı! \nFiyat: ${(parseInt(veri.satış)*parseInt(miktar))}`);
};


exports.conf = {
    enabled: true,
    dm:false,
    name: "eşyasat",
    aliases: [],
};

