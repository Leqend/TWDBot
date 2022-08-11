const Discord = require("discord.js");
const veriler = require("../../veriler.json");
const data = require("all.db");
const db = new data();

exports.run = async(client,message,args) =>{
    let dpet = db.get(`pet.${message.guild.id}.${message.author.id}`) || [];
    let envanter = db.get(`envanter.${message.guild.id}.${message.author.id}`) || [];

    if(!dpet) return message.channel.send("Bir Petin Yok!");

    let isim = args.slice(0).join(" ");
    if(!isim) return message.channel.send("Pet ismini girmelisin!");

    let veri = dpet.find(a => a.isim == isim);
    if(!veri) return message.channel.send("Böyle bir Pet'in yok!");

    let petdata = veriler.petler[veri.tür];
    if(!petdata) return message.channel.send("Böyle bir Pet türü yok!");

    let urun = envanter.find(a => a.id == 193);
    let yemek = veriler.itemler["pet-besini"];
    if(!urun) return message.channel.send("Sende Pet Besini yok!");
    if(urun.adet == 0) return message.channel.send("Sende Pet Besini yok!");
    
    db.pull(`envanter.${message.guild.id}.${message.author.id}`,urun.id,"id");
    db.push(`envanter.${message.guild.id}.${message.author.id}`,{isim:yemek.isim, id:yemek.id,tür:yemek.tür, adet:parseInt(urun.adet)-1});
    let seviye = petdata.seviye.find(a => a.level == veri.level);
    if(seviye.besin <= (veri.yemek+1) && petdata.seviye.length != seviye.level){
        let nseviye = petdata.seviye.find(a => a.level == (veri.level+1));
        let enerji = veri.enerji+5;
        if(enerji >= nseviye.enerji) enerji = nseviye.enerji;
        db.pull(`pet.${message.guild.id}.${message.author.id}`,veri.isim,"isim");
        db.push(`pet.${message.guild.id}.${message.author.id}`,{...veri,level:nseviye.level, yemek:0 ,hasar:nseviye.hasar,takılı:true});
        message.channel.send("Pet level atladı!");
    }else{
        db.pull(`pet.${message.guild.id}.${message.author.id}`,veri.isim,"isim");
        let enerji = veri.enerji+5;
        if(enerji >= seviye.enerji) enerji = seviye.enerji;
        db.push(`pet.${message.guild.id}.${message.author.id}`,{...veri,level:veri.level, yemek:veri.yemek+1,enerji:enerji ,hasar:veri.hasar,takılı:true});
        message.channel.send("Pet beslendi!");
    }


};

exports.conf = {
    enabled: true,
    dm:false,
    name: "petbesle",
    aliases: [],
};

