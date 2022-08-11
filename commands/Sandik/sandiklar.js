const Discord = require("discord.js");
const veriler = require("../../veriler.json");
const moment = require("moment-timezone");
const data = require("all.db");
const db = new data();

exports.run = async(client,message,args) =>{
    let sandiklar = Object.keys(veriler.sandik);
    var msg = "";
    sandiklar.forEach(UwU => {
        let sandik = db.get(`sandik.${message.guild.id}.${message.author.id}.${UwU}`) || 0;
        let veri = veriler.sandik[UwU];
        if(veri.isim == "Yardım Sandığı"){
            let date = Date.now();
            if(date > (sandik)) {
                msg += `${veri.isim}: **Açılabilir** ✅\n`
            }else msg += `${veri.isim}: **${moment(sandik).tz('Turkey').format('DD.MM.YYYY, h:mm:ss')}** \n`
        }else{
            if(sandik >= veri.kelime) {
                msg += `${veri.isim}: **${veri.kelime}/${veri.kelime}** ✅\n`;
            }else {
                msg += `${veri.isim}: **${sandik}/${veri.kelime}**\n`;
            }
        }
    });
    message.channel.send({embeds:[new Discord.MessageEmbed().setAuthor({name:message.guild.name, iconURL:message.guild.iconURL({dynamic:true})}).setTitle("Sandıkların:").setDescription(msg).setFooter({text:`${message.author.username}#${message.author.discriminator}`, iconURL:message.author.displayAvatarURL({dynamic:true})})]});
};


exports.conf = {
    enabled: true,
    dm:false,
    name: "sandıklar",
    aliases: [],
};

