const Discord = require("discord.js");
const config = require("../../vezalan.json");
const data = require("all.db");
const db = new data();

exports.run = async(client,message,args,log) =>{
    if(!config.owners.includes(message.author.id)) return message.channel.send("Sen Kurucu Değilsin!");
    let role = message.mentions.roles.first();
    if(!role) return message.channel.send("Bir Rol Etiketle!").then(a => setTimeout(function(){a.delete()},5000));

    let miktar = args[1];
    if(isNaN(miktar) || miktar == "" || miktar == " ") return message.channel.send("Sayı girsene knks").then(a => setTimeout(function(){a.delete()},5000));
    let karakter = [".",",","*","/",":",";","-","+","e"];
    let err = false;
    karakter.forEach(a => miktar.includes(a) ? err = true : null);
    if(err == true) return message.channel.send("Lütfen özel karakter kullanmayın!");

    message.guild.members.cache.forEach(a =>{
        if(a._roles.includes(role.id)){
            db.add(`altin.${message.guild.id}.${a.id}`, parseInt(miktar));
        }
    });
    message.channel.send(`${miktar} Dolar ${role.name} Rolüne Gönderildi!`);

};


exports.conf = {
    enabled: true,
    dm:false,
    name: "maaşyatır",
    aliases: [],
};

