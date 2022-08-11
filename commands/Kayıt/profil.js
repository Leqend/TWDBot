const Discord = require("discord.js");
const veriler = require("../../veriler.json");
const config = require("../../vezalan.json");
const moment = require("moment-timezone");
const data = require("all.db");
const db = new data();


exports.run = async(client,message,args) =>{
    let user = message.author;
    if (args[0] && isNaN(args[0])) user = message.mentions.users.first()
    if (args[0] && !isNaN(args[0])) {
        user = client.users.cache.get(args[0])
        if (!message.guild.members.cache.has(args[0])) return message.reply({content: "Kullanıcı bulunamadı.",allowedMentions: {repliedUser: false}});
    }
    let isim = db.fetch(`isim.${message.guild.id}.${user.id}`) ? db.fetch(`isim.${message.guild.id}.${user.id}`) : "Belirlenmedi."
    let yaş = db.fetch(`yaş.${message.guild.id}.${user.id}`) ? db.fetch(`yaş.${message.guild.id}.${user.id}`) : "Belirlenmedi."
    let meslek = db.fetch(`meslek.${message.guild.id}.${user.id}`) ? db.fetch(`meslek.${message.guild.id}.${user.id}`) : "Belirlenmedi."
    let ülke = db.fetch(`ülke.${message.guild.id}.${user.id}`) ? db.fetch(`ülke.${message.guild.id}.${user.id}`) :{tur:"Belirlenmedi."}
    let cinsiyet = db.fetch(`cinsiyet.${message.guild.id}.${user.id}`) ? db.fetch(`cinsiyet.${message.guild.id}.${user.id}`) :{tur:"Belirlenmedi."}
    let inanc = db.fetch(`inanc.${message.guild.id}.${user.id}`) ? db.fetch(`inanc.${message.guild.id}.${user.id}`) :{tur:"Belirlenmedi."}
    let yönelim = db.fetch(`yönelim.${message.guild.id}.${user.id}`) ? db.fetch(`yönelim.${message.guild.id}.${user.id}`) :{tur:"Belirlenmedi."}
    let görünüm = db.fetch(`görünüm.${message.guild.id}.${user.id}`) ? db.fetch(`görünüm.${message.guild.id}.${user.id}`) : "https://cdn.discordapp.com/attachments/825084860245868566/954831448790147132/question-mark-1019820_960_720.png"
    const embed = new Discord.MessageEmbed()
    .setFooter({text: `Daha İyi Bir Roleplay Adına Sizler İçin`, iconURL: `${message.author.avatarURL({dynamic: true})}`})
    .setAuthor({name: `The Walking Dead Roleplay`, iconURL: `${message.guild.iconURL({dynamic: true})}`})
    .setColor("000001")
    .setThumbnail(`${görünüm.url}`)
    .setDescription(`${user} Adlı Kullanıcın Profili:\n\n**İsim:** ${isim}\n**Yaş:** ${yaş}\n**Meslek:** ${meslek}\n**Ülke:** ${ülke.tur}\n**Cinsiyet:** ${cinsiyet.tur}\n**İnanç:** ${inanc.tur}\n**Yönelim:** ${yönelim.tur}\n`)
    message.reply({embeds: [embed],allowedMentions: {repliedUser: false}});
};


exports.conf = {
    enabled: true,
    dm:false,
    name: "profil",
    aliases: [],
};

