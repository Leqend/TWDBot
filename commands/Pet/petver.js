const Discord = require("discord.js");
const veriler = require("../../veriler.json");
const config = require("../../vezalan.json");
const data = require("all.db");
const db = new data();


exports.run = async(client,message,args) =>{
    let petdb = db.get(`pet.${message.guild.id}.${message.author.id}`) || [];
    let user = message.mentions.users.first();
    if(!user) return message.channel.send("Kullanıcıyı Etiketlemelisin!");

    let isim = args.slice(1).join(" ");
    if(!isim) return message.channel.send("Pet ismini girmelisin!");

    let veri = petdb.find(a => a.isim == isim);
    if(!veri) return message.channel.send("Böyle bir Pet'in yok!");

    db.pull(`pet.${message.guild.id}.${message.author.id}`,veri.isim,"isim");
    db.push(`pet.${message.guild.id}.${user.id}`,{...veri, takılı:false});

    message.channel.send(`${user.username} adlı kullanıcıya pet gönderildi!`);
};


exports.conf = {
    enabled: true,
    dm:false,
    name: "petver",
    aliases: [],
};

