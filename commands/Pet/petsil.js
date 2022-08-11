const Discord = require("discord.js");
const veriler = require("../../veriler.json");
const config = require("../../vezalan.json");
const data = require("all.db");
const db = new data();


exports.run = async(client,message,args) =>{
    if(!config.owners.includes(message.author.id)) return message.channel.send("Bu komutu sadece bot sahibi kullanabilir!");
    let user = message.mentions.users.first();
    if(!user) return message.channel.send("Kullanıcıyı Etiketlemelisin!");
    let petdb = db.get(`pet.${message.guild.id}.${user.id}`) || [];

    let isim = args.slice(1).join(" ");
    if(!isim) return message.channel.send("Pet ismini girmelisin!");

    let veri = petdb.find(a => a.isim == isim);
    if(!veri) return message.channel.send("Böyle bir Pet'i yok!");

    db.pull(`pet.${message.guild.id}.${user.id}`,veri.isim,"isim");

    message.channel.send(`${user.username} adlı kullanıcının Pet'i silindi!`);
};


exports.conf = {
    enabled: true,
    dm:false,
    name: "petsil",
    aliases: [],
};

