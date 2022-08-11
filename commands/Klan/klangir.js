const Discord = require("discord.js");
const data = require("all.db");
const db = new data();


exports.run = async (client, message, args) => {
    let klan = db.get(`klan.${message.author.id}.id`);
    if(klan) return message.channel.send("Zaten Bir Klandasın!");
    let id = args[0];
    let davetler = db.get(`klandavet.${message.guild.id}.${message.author.id}`) || [];
    if(davetler == []) return message.channel.send("Hiç Davetin Yok :(");
    if(!id){
        let msg = "Bir Klan ID'si gir.\n";
        davetler.forEach(x => {
            let kl = db.get(`klan.${message.guild.id}`).filter(uwu => uwu.id == x);
            if(!kl) return;
            msg += `ID: **${kl[0].id}**, İsim: **${kl[0].isim}**\n`;
        });
        return message.channel.send(msg);
    }else{
        if(!davetler.includes(parseInt(id))) return message.channel.send("Bu ID ile bir davet bulamadım!");
        let klanlar = db.get(`klan.${message.guild.id}`);
        var klanIds = klanlar.findIndex(a => a.id == parseInt(id));
        let klan = klanlar[klanIds];
        if(klan.uye.length >= klan.limit) return message.channel.send("Klan dolu!");
        if(!klan) return message.channel.send("Klanı Bulamadım!");
        let uyeler = [...klan.uye, message.author.id];
        db.set(`klan.${message.author.id}.id`,parseInt(id));
        db.set(`klan.${message.guild.id}.${klanIds}`,{...klan, uye:uyeler});
        db.pull(`klandavet.${message.guild.id}.${message.author.id}`,klan.id);

        message.channel.send(`**${id}** ID'li Klana Başarıyla Katıldın!`)
    }
} 
exports.conf = {
  enabled: true,
  dm: false,
  name: "klangir",
  aliases: []
};
