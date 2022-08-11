const Discord = require("discord.js");

const data = require("all.db");
const db = new data();

exports.run = async(client,message,args) =>{
    let puan = db.get(`user.${message.guild.id}.${message.author.id}.puan.level`) || 0;
    if(!puan) return message.channel.send("Bu komutu kullanmak için yeterli puanınız yok!");

    let can = db.get(`user.${message.guild.id}.${message.author.id}.can`) || "uwu";
    let mcan = db.get(`user.${message.guild.id}.${message.author.id}.maxcan`) || "uwu";
    let güç = db.get(`user.${message.guild.id}.${message.author.id}.güç`) || 0;
    let yenilenme = db.get(`user.${message.guild.id}.${message.author.id}.yenileme`) || 0.10;

    if(args[0] == "can"){
        let skill = db.get(`user.${message.guild.id}.${message.author.id}.puan.can`) || 0;
        if(skill >= 10) return message.channel.send("Can sınırına ulaştınız!");

        if(can == "uwu") can = db.add(`user.${message.guild.id}.${message.author.id}.can`,105);
            else can = db.add(`user.${message.guild.id}.${message.author.id}.can`,5);

        if(mcan == "uwu") mcan = db.add(`user.${message.guild.id}.${message.author.id}.maxcan`,105);
            else mcan = db.add(`user.${message.guild.id}.${message.author.id}.maxcan`,5);
        
        db.add(`user.${message.guild.id}.${message.author.id}.puan.can`,1);
        db.substr(`user.${message.guild.id}.${message.author.id}.puan.level`,1);
        message.channel.send(`Can: ${can}/${mcan}\nCan Puanı: ${skill+1}`)
    }else if(args[0] == "güç"){
        let skill = db.get(`user.${message.guild.id}.${message.author.id}.puan.güç`) || 0;
        if(skill >= 10) return message.channel.send("Güç sınırına ulaştınız!");

        güç = db.add(`user.${message.guild.id}.${message.author.id}.güç`,1);
        
        db.add(`user.${message.guild.id}.${message.author.id}.puan.güç`,1);
        db.substr(`user.${message.guild.id}.${message.author.id}.puan.level`,1);
        message.channel.send(`Güç: ${güç}\nGüç Puanı: ${skill+1}`)
    }else if(args[0] == "yenilenme"){
        let skill = db.get(`user.${message.guild.id}.${message.author.id}.puan.yenilenme`) || 0;
        if(skill >= 10) return message.channel.send("Yenilenme sınırına ulaştınız!");

        yenilenme = db.add(`user.${message.guild.id}.${message.author.id}.yenilenme`,0.10);
        
        db.add(`user.${message.guild.id}.${message.author.id}.puan.yenilenme`,1);
        db.substr(`user.${message.guild.id}.${message.author.id}.puan.level`,1);
        message.channel.send(`Yenilenme: ${yenilenme.toFixed(1)}\nYenilenme Puanı: ${skill+1}`)
    }else {
        message.channel.send(`Neye puan vermek istediğinizi seçin; *can, güç, yenilenme*`);
    }
};


exports.conf = {
    enabled: true,
    dm:false,
    name: "levelatlat",
    aliases: [],
};

