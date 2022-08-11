const Discord = require("discord.js");
const veriler = require("../../veriler.json");
const config = require("../../vezalan.json");
const data = require("all.db");
const db = new data();


exports.run = async(client,message,args) =>{
    if(!config.owners.includes(message.author.id)) return message.channel.send("Bu komutu sadece bot sahibi kullanabilir!");

    let user = message.mentions.users.first();
    if(!user) return message.channel.send("Kullanıcıyı Etiketlemelisin!");
    let miktar = args[1];
    if(isNaN(miktar)) return message.channel.send("Miktarı Belirlemelisin!");
    let karakter = [".",",","*","/",":",";","-","+","e"];
    let err = false;
    karakter.forEach(a => miktar.includes(a) ? err = true : null);
    if(err == true) return message.channel.send("Lütfen özel karakter kullanmayın!");
    let ürün = args.slice(2).join(" ").replaceAll(" ","-");
    if(!ürün) return message.channel.send("Ürünü Girmelisin!");
    let veri = veriler.itemler[ürün.toLowerCase()];
    if(!veri) return message.channel.send("Böyle bir ürün yok!");
    let envanter = db.get(`envanter.${message.guild.id}.${user.id}`) || [];
    miktar = Math.abs(miktar);
    let urun = envanter.find(a => a.id == veri.id);
    if(!urun) urun = {adet:0};
    if(urun.adet < miktar) return message.channel.send("Bu kadar ürünü yok!");

    if(envanter.length != 0) db.pull(`envanter.${message.guild.id}.${user.id}`,veri.id,"id");
    db.push(`envanter.${message.guild.id}.${user.id}`,{...veri,yapılış:undefined,fiyat:undefined, adet:parseInt(miktar)-parseInt(urun.adet)});
    message.channel.send(`${user.username} adlı kullanıcıya ${miktar} adet ${veri.isim} silindi!`);
};


exports.conf = {
    enabled: true,
    dm:false,
    name: "eşyasil",
    aliases: [],
};

