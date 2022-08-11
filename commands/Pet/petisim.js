const Discord = require("discord.js");
const veriler = require("../../veriler.json");
const data = require("all.db");
const db = new data();

exports.run = async(client,message,args) =>{
    let petisim = db.get(`petisim`) || [];

    let dpet = db.get(`pet.${message.guild.id}.${message.author.id}`) || [];
    let dps = dpet.find(a => a.takılı == true);
    if(!dps) return message.channel.send("Bir Petini Tak!");

    let isim = args.slice(0).join(" ");
    if(!isim) return message.channel.send("Yeni Pet ismini girmelisin!");
    if(petisim.includes(isim.toLowerCase())) return message.channel.send("Bu isim kullanılmaktadır!");


    db.pull(`pet.${message.guild.id}.${message.author.id}`,dps.isim,"isim");
    db.push(`pet.${message.guild.id}.${message.author.id}`,{...dps, isim:isim});

    db.push(`petisim`,isim.toLowerCase());
    db.pull(`petisim`,dps.isim.toLowerCase());

    message.channel.send("Petin İsmi Değiştirildi!");

};

exports.conf = {
    enabled: true,
    dm:false,
    name: "petisim",
    aliases: [],
};

