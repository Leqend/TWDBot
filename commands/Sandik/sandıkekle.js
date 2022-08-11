const Discord = require("discord.js");
const veriler = require("../../veriler.json");
const config = require("../../vezalan.json");
const moment = require("moment-timezone");
const data = require("all.db");
const db = new data();


exports.run = async(client,message,args) =>{
    if(!config.owners.includes(message.author.id)) return message.channel.send("Bu komutu sadece bot sahibi kullanabilir!");

    let user = message.mentions.users.first();
    if(!user) return message.channel.send("Bir kullanıcı etiketlemelisin!");

    let urun = args.slice(1).join(" ");
    if(!urun) return message.channel.send("Bir sandık ismi girmelisin!");
    let sandik = veriler.sandik[urun.toLowerCase().replaceAll(" ","-")];
    if(!sandik) return message.channel.send("Böyle bir sandık yok!");
    db.set(`sandik.${message.guild.id}.${user.id}.${sandik.isim.toLowerCase().replaceAll(" ","-")}`,sandik.kelime);
    message.channel.send(`Sandık Verildi`);
    
};


exports.conf = {
    enabled: true,
    dm:false,
    name: "sandıkekle",
    aliases: [],
};

