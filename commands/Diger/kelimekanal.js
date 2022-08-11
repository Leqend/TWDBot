const Discord = require("discord.js");
const config = require("../../vezalan.json");
const data = require("all.db");
const db = new data();

exports.run = async(client,message,args) =>{
    if(!config.owners.includes(message.author.id)) return message.channel.send("Bu komutu sadece bot sahibi kullanabilir!");
    let kanallar = db.get(`kanallar`) || [];
    if(args[0] == "ekle"){
        if(kanallar.includes(message.channel.id)) return message.channel.send("Bu kanal zaten eklenmiş!");
        db.push(`kanallar`,message.channel.id);
        return message.channel.send("Bu kanal eklendi!");
    }else if(args[0] == "sil"){
        if(!kanallar.includes(message.channel.id)) return message.channel.send("Bu kanal zaten silinmiş!");
        db.pull(`kanallar`,message.channel.id);
        return message.channel.send("Bu kanal silindi!");
    }else{
       return message.channel.send("!kkanal <ekle,sil>");
    }
};


exports.conf = {
    enabled: true,
    dm:false,
    name: "kkanal",
    aliases: ["kelimekanal"],
};

