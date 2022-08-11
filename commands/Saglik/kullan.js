const Discord = require("discord.js");
const veriler = require("../../veriler.json");
const data = require("all.db");
const db = new data();

function randomSayi(min,max){
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
exports.run = async(client,message,args) =>{
    let inv = db.get(`envanter.${message.guild.id}.${message.author.id}`) || [];
    let gıdalar = inv.filter(a => a.tür == "sağlık");
    if(gıdalar.length == 0) return message.channel.send("Hiç Sağlık ürünü Yok!");

    let ürün = args.slice(0).join(" ").replaceAll(" ","-");
    if(!ürün){
        let liste = "Bir Ürün Belirtmelisin! \n";
        gıdalar.forEach((item) => {
            if(item.adet <= 0) return;
            liste += `İsim: **${item.isim}**, Adet: **${item.adet}**\n`;
        });
        const emb = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${message.author.username} Envanteri`)
        .setDescription(liste);
        message.channel.send({embeds:[emb]});
    }else{
        let veri = veriler.itemler[ürün.toLowerCase()];
        if(!veri) return message.channel.send("Sağlık ürünü yok!");

        let urun = inv.find(a => a.id == veri.id);
        if(!urun) return message.channel.send("Sağlık ürünü yok!");
        if(urun.adet <= 0) return message.channel.send("Sağlık ürünü yok!");

        let ccan = db.get(`user.${message.guild.id}.${message.author.id}.can`) || 0;
        let mcan = db.get(`user.${message.guild.id}.${message.author.id}.maxcan`) || 100;
        let rndmcan = parseInt(ccan)+veri.özellik.can;
        let ncan = db.set(`user.${message.guild.id}.${message.author.id}.can`,rndmcan);
        if(mcan <= ncan) ncan = db.set(`user.${message.guild.id}.${message.author.id}.can`,(mcan));

        let enfeksiyon = db.get(`user.${message.guild.id}.${message.author.id}.enfeksiyon`) || 0;
        let rndmenf = parseInt(enfeksiyon)-veri.özellik.enfeksiyon;
        let nenf = db.set(`user.${message.guild.id}.${message.author.id}.enfeksiyon`,rndmenf);
        if(nenf <= 0) nenf = db.set(`user.${message.guild.id}.${message.author.id}.enfeksiyon`,0);

        db.pull(`envanter.${message.guild.id}.${message.author.id}`,veri.id,"id");
        db.push(`envanter.${message.guild.id}.${message.author.id}`,{isim:veri.isim, id:veri.id,tür:veri.tür, adet:parseInt(urun.adet)-1});

        return message.channel.send(`Sağlık Ürünü Kullandın! \nCan: ${ncan}/${mcan} \nEnfeksiyon: %${nenf}`);
    }
};


exports.conf = {
    enabled: true,
    dm:false,
    name: "kullan",
    aliases: [],
};

