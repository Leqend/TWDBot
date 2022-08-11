const Discord = require("discord.js");
const config = require("../../vezalan.json");
const data = require("all.db");
const db = new data();

exports.run = async(client,message,args,log) =>{
    if(!config.owners.includes(message.author.id)) return message.channel.send("Sen Kurucu Değilsin!");

    let klanId = args[0];
    if(isNaN(klanId) || klanId == "" || klanId == " ") return message.channel.send("Klan ID").then(a => setTimeout(function(){a.delete()},5000));

    let altin = args[1];
    if(isNaN(altin) || altin == "" || altin == " ") return message.channel.send("Verilecek Altın Miktarı").then(a => setTimeout(function(){a.delete()},5000));
    let karakter = [".",",","*","/",":",";","e"];
    let err = false;
    karakter.forEach(a => altin.includes(a) ? err = true : null);
    if(err == true) return message.channel.send("Lütfen özel karakter kullanmayın!");
    let klanlar = db.get(`klan.${message.guild.id}`)
    var klanIds = klanlar.findIndex(a => a.id == parseInt(klanId));
    let klan = klanlar[klanIds];
    if(!klan) return message.channel.send("Klanı Bulamadım!");

    db.set(`klan.${message.guild.id}.${klanIds}`,{...klan, altin:(klan.altin+parseInt(altin))});
    message.channel.send(`Eklenen Miktar: ${altin}\n💰 Altın: ${klan.altin+parseInt(altin)}`);

};


exports.conf = {
    enabled: true,
    dm:false,
    name: "klanparaekle",
    aliases: [],
};

