const Discord = require("discord.js");
const veriler = require("../../veriler.json");
const data = require("all.db");
const db = new data();

function randomSayi(min,max){
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
exports.run = async(client,message,args) =>{
    let inv = db.get(`envanter.${message.guild.id}.${message.author.id}`) || [];

    let a = args[0];
    if(a == "zırh"){
        let azh = db.get(`ekipman.zırh.${message.guild.id}.${message.author.id}`) || false;
        if(azh == false) return message.channel.send("Zaten Zırh giymiyorsun!")

        let veri = veriler.itemler[azh.isim.toLowerCase().replaceAll(" ","-")];
        if(!veri) return message.channel.send("Zırh yok!");

        let urun = inv.find(a => a.id == azh.id);

        db.pull(`envanter.${message.guild.id}.${message.author.id}`,veri.id,"id");
        if(!urun) db.push(`envanter.${message.guild.id}.${message.author.id}`,{...veri,fiyat:undefined,yapılış:undefined, adet:1});
        if(urun) db.push(`envanter.${message.guild.id}.${message.author.id}`,{...veri,fiyat:undefined,yapılış:undefined, adet:parseInt(urun.adet)+1});

        db.delete(`ekipman.zırh.${message.guild.id}.${message.author.id}`);
    }else if(a == "silah"){
        let azh = db.get(`ekipman.silah.${message.guild.id}.${message.author.id}`) || false;
        if(azh == false) return message.channel.send("Zaten Silah kuşanmamışsın!")

        let veri = veriler.itemler[azh.isim.toLowerCase().replaceAll(" ","-")];
        if(!veri) return message.channel.send("Silah yok!");

        let urun = inv.find(a => a.id == azh.id);

        db.pull(`envanter.${message.guild.id}.${message.author.id}`,veri.id,"id");
        if(!urun) db.push(`envanter.${message.guild.id}.${message.author.id}`,{...veri,fiyat:undefined,yapılış:undefined, adet:1});
        if(urun) db.push(`envanter.${message.guild.id}.${message.author.id}`,{...veri,fiyat:undefined,yapılış:undefined, adet:parseInt(urun.adet)+1});

        db.delete(`ekipman.silah.${message.guild.id}.${message.author.id}`);
        message.channel.send("Silah Çıkarıldı!")

    }else {
        message.channel.send("Doğru Kullanım: !çıkar <zırh,silah>")
    }
};


exports.conf = {
    enabled: true,
    dm:false,
    name: "çıkar",
    aliases: [],
};

