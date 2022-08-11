const Discord = require("discord.js");
const veriler = require("../../veriler.json");
const data = require("all.db");
const db = new data();

exports.run = async(client,message,args) =>{
    let dpet = db.get(`pet.${message.guild.id}.${message.author.id}`) || [];
    if(!dpet) return message.channel.send("Bir Petin Yok!");

    let isim = args.slice(0).join(" ");
    if(!isim) return message.channel.send("Pet ismini girmelisin!");

    let veri = dpet.find(a => a.isim == isim);
    if(!veri) return message.channel.send("Böyle bir Pet'in yok!");

    db.pull(`pet.${message.guild.id}.${message.author.id}`,veri.isim,"isim");
    db.push(`pet.${message.guild.id}.${message.author.id}`,{...veri,takılı:true});

    message.channel.send("Pet takıldı!");

};

exports.conf = {
    enabled: true,
    dm:false,
    name: "pet",
    aliases: [],
};

