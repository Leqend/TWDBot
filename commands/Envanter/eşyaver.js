const Discord = require("discord.js");
const veriler = require("../../veriler.json");
const config = require("../../vezalan.json");
const data = require("all.db");
const db = new data();


exports.run = async(client,message,args) =>{
    let user = message.mentions.users.first();
    if(!user) return message.channel.send("Kullanıcıyı Etiketlemelisin!");
    if(user.id == message.author.id) return message.channel.send("Kendine eşya vermezsin!");
    let miktar = args[1];
    if(isNaN(miktar) || miktar == 0) return message.channel.send("Miktarı Belirlemelisin!");
    let karakter = [".",",","*","/",":",";","-","+","e"];
    let err = false;
    karakter.forEach(a => miktar.includes(a) ? err = true : null);
    if(err == true) return message.channel.send("Lütfen özel karakter kullanmayın!");
    
    let ürün = args.slice(2).join(" ").replaceAll(" ","-");
    if(!ürün) return message.channel.send("Ürünü Girmelisin!");
    let veri = veriler.itemler[ürün.toLowerCase()];
    if(!veri) return message.channel.send("Böyle bir ürün yok!");
    let aenvanter = db.get(`envanter.${message.guild.id}.${message.author.id}`) || [];
    let aurun = aenvanter.find(a => a.id == veri.id);
    if(!aurun) aurun = {adet:0};
    miktar = Math.abs(miktar);
    if(aurun.adet < miktar) return message.channel.send("Yeterli eşyan yok!");
    if(aenvanter.length != 0) db.pull(`envanter.${message.guild.id}.${message.author.id}`,veri.id,"id");
    db.push(`envanter.${message.guild.id}.${message.author.id}`,{...veri,yapılış:undefined,fiyat:undefined, adet:parseInt(aurun.adet)-parseInt(miktar)});

    let envanter = db.get(`envanter.${message.guild.id}.${user.id}`) || [];
    let urun = envanter.find(a => a.id == veri.id);
    if(!urun) urun = {adet:0};
    if(envanter.length != 0) db.pull(`envanter.${message.guild.id}.${user.id}`,veri.id,"id");
    db.push(`envanter.${message.guild.id}.${user.id}`,{...veri,yapılış:undefined,fiyat:undefined, adet:parseInt(miktar)+parseInt(urun.adet)});

    message.channel.send(`${user.username} adlı kullanıcıya ${miktar} adet ${veri.isim} eklendi!`);
};


exports.conf = {
    enabled: true,
    dm:false,
    name: "eşyaver",
    aliases: [],
};

