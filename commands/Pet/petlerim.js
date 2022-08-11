const Discord = require("discord.js");
const veriler = require("../../veriler.json");
const data = require("all.db");
const db = new data();

exports.run = async(client,message,args) =>{
    let dpet = db.get(`pet.${message.guild.id}.${message.author.id}`) || [];
    if(dpet.length == 0) return message.channel.send("Bir Petin Yok!");
    msg = "";
    i = 0;
    dpet.forEach(e => {
        i++;
        let tür = e.tür;
        tür = tür.charAt(0).toUpperCase() + tür.slice(1);
        let petdata = veriler.petler[e.tür];
        let yemek = petdata.seviye.find(a => a.level == e.level);
        var besin = `Alması Gereken Yemek: **${yemek.besin-e.yemek}**,`;
        if(e.level >= petdata.seviye.length) besin = "";
        msg += `${i}) İsim: **${e.isim}**, Tür: **${tür}**, Level: **${e.level}**, ${besin} Hasar: **${e.hasar.join("**~**")}**\n`;
    });

    const emb = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle("Petler")
    .setDescription(msg);

    message.channel.send({embeds:[emb]});




};

exports.conf = {
    enabled: true,
    dm:false,
    name: "petlerim",
    aliases: [],
};

