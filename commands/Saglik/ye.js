const Discord = require("discord.js");
const veriler = require("../../veriler.json");
const data = require("all.db");
const db = new data();

function randomSayi(min,max){
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
exports.run = async(client,message,args) =>{
    let inv = db.get(`envanter.${message.guild.id}.${message.author.id}`) || [];
    let gıdalar = inv.filter(a => a.tür == "gıda");
    if(gıdalar.length == 0) return message.channel.send("Hiç Yemeğin Yok!");

    let ürün = args.slice(0).join(" ").replaceAll(" ","-");
    if(!ürün){
        let liste = "Bir Ürün Belirtmelisin! \n";
        gıdalar.forEach((item) => {
            liste += `İsim: **${item.isim}**, Adet: **${item.adet}**\n`;
        });
        const emb = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${message.author.username} Envanteri`)
        .setDescription(liste);
        message.channel.send({embeds:[emb]});
    }else{
        let veri = veriler.itemler[ürün.toLowerCase()];
        if(!veri) return message.channel.send("Böyle bir yemeğe sahip değilsin!");

        let urun = inv.find(a => a.id == veri.id);
        if(!urun) return message.channel.send("Böyle bir yemeğe sahip değilsin!");
        if(urun.adet <= 0) return message.channel.send("Böyle bir yemeğe sahip değilsin!");
        if(urun.tür != "gıda") return message.channel.send("Yemeğe çalıştığın şey yenilmiyor!");

        let ccan = db.get(`user.${message.guild.id}.${message.author.id}.aclik`) || 90;
        let rndmcan = parseInt(ccan)+parseInt(veri.açlık);
        let ncan = db.set(`user.${message.guild.id}.${message.author.id}.aclik`,rndmcan);
        if(100 <= ncan) ncan = db.set(`user.${message.guild.id}.${message.author.id}.aclik`,100);

        db.pull(`envanter.${message.guild.id}.${message.author.id}`,veri.id,"id");
        db.push(`envanter.${message.guild.id}.${message.author.id}`,{isim:veri.isim, id:veri.id,tür:veri.tür, adet:parseInt(urun.adet)-1});

        return message.channel.send(`Yemek Yedin! \nAçlık: %${ncan}`);
    }
};


exports.conf = {
    enabled: true,
    dm:false,
    name: "ye",
    aliases: [],
};

