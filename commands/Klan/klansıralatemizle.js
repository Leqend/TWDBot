const Discord = require("discord.js");
const config = require("../../vezalan.json");

const data = require("all.db");
const db = new data();


exports.run = async(client,message,args) =>{
    if(!config.owners.includes(message.author.id)) return message.channel.send("Bu komutu sadece bot sahibi kullanabilir!");

    let idler = db.get(`klan.id`) || [];

    idler.forEach(e => {
        db.set(`klan.${e}.kelime`,1)
    });

    message.channel.send("Sıfırlandı!");
    
};


exports.conf = {
    enabled: true,
    dm:false,
    name: "klansıralamatemizle",
    aliases: [],
};

