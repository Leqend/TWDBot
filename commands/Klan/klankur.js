const Discord = require("discord.js");
const moment = require("moment-timezone");

const data = require("all.db");
const db = new data();

function randomSayi(min,max){
    let idler = db.get(`klan.id`) || [];
    let id = Math.floor(Math.random() * (max - min + 1) ) + min;
    if(idler.includes(id)) return randomSayi(min,max);
        else{
            db.push(`klan.id`,id);
            return id;
        }
}

exports.run = async(client,message,args) =>{
    let klan = db.get(`klan.${message.guild.id}`).filter(a => a.yetkili.includes(message.author.id)) || [];
    if(klan.length >= 1) return message.channel.send("Bir Klanın zaten var");

    let altin = db.get(`altin.${message.guild.id}.${message.author.id}`)||0;
    if(altin < 100) return message.channel.send("Altınınız yeterli değil!");
    let isim = args.splice(0).join(" ");
    if(!isim) return message.channel.send("Bir isim belirtmelisin!");  
    let err = false;
    let karakter = ["[","'","@","&","+","^","*","!","%","/","(","{","}",")","=",",","?","_","-","]",""];
    karakter.forEach(a => isim.includes(a) ? err = true : null);
    if(err == true) return message.channel.send("Lütfen özel karakter kullanmayın!");
    if(isim.length > 20) return message.channel.send("İsim 20 karakterden fazla olamaz!");

    let filters = (db.get(`klan.${message.guild.id}`)||[]).filter(a => a.isim.toLowerCase().replaceAll(" ","") == isim.toLowerCase().replaceAll(" ","")) || [];
    if(filters.length >= 1) return message.channel.send("Klan ismi mevcut");
    let id = randomSayi(1,1000000);
    db.push(`klan.${message.guild.id}`,{id:id,isim:isim,altin:0,limit:5,seviye:1,amblem:null,yetkili:[message.author.id],uye:[message.author.id]});
    db.set(`klan.${message.author.id}.id`,id);
    db.substr(`altin.${message.guild.id}.${message.author.id}`,100);

    let basarim = db.get(`user.${message.guild.id}.${message.author.id}.basarim`) || [];
    let basarimlar = basarim.map(a => a.isim);
    if(!basarimlar.includes("Birlikten Kuvvet Doğar")) {
        db.push(`user.${message.guild.id}.${message.author.id}.basarim`,{isim:"Birlikten Kuvvet Doğar",tarih:moment().tz('Europe/Istanbul').format('DD.MM.YYYY, HH:mm:ss')});
    }

    message.channel.send({embeds:[new Discord.MessageEmbed().setAuthor({name:message.guild.name, iconURL:message.guild.iconURL({dynamic:true})}).setDescription(`*${isim}* İsimli klanınız oluşturuldu!`).setFooter({text:`${message.author.username}#${message.author.discriminator}`, iconURL:message.author.displayAvatarURL({dynamic:true})})]});

    
};


exports.conf = {
    enabled: true,
    dm:false,
    name: "klankur",
    aliases: [],
};

