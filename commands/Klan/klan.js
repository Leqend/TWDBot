const Discord = require("discord.js");

const data = require("all.db");
const db = new data();


exports.run = async(client,message,args) =>{
    let klanisim = args.splice(0).join(" ");
    if(klanisim){
        let klan = db.get(`klan.${message.guild.id}`).filter(a => a.isim.toLowerCase() == klanisim.toLowerCase()) || [];
        if(klan.length <= 0) return message.channel.send("Klanı bulamadım!");
        let klanKelime = db.get(`klanlar.${klan[0].id}.kelime`) || 0;
        const embed = new Discord.MessageEmbed()
        .setAuthor({name:message.guild.name, iconURL:message.guild.iconURL({dynamic:true})})
        .setDescription(`\nID: **${klan[0].id}** \nİsim: **${klan[0].isim}** \nSeviye: **${klan[0].seviye}** \nHazine: **${klan[0].altin}** \nÜye Limit: **${klan[0].limit}** \nKelime: **${klanKelime}** \nYetkili: **<@${klan[0].yetkili.join(">, ")}>** \nÜyeler: **<@${klan[0].uye.join(">, <@")}>**`)
        .setFooter({text:`${message.author.username}#${message.author.discriminator}`, iconURL:message.author.displayAvatarURL({dynamic:true})});
        if(klan[0].amblem != null) embed.setThumbnail(klan[0].amblem);

        message.channel.send({embeds:[embed]});
    }else{
        let klanId = db.get(`klan.${message.author.id}.id`);
        if(!klanId) return message.channel.send("Bir klana üye değilsin!");
        let klan = db.get(`klan.${message.guild.id}`).filter(a => a.id == klanId) || [];
        if(klan == []) return message.channel.send("Üye olduğun klanı bulamadım!");
        let klanKelime = db.get(`klanlar.${klan[0].id}.kelime`) || 0;
        const embed = new Discord.MessageEmbed()
        .setAuthor({name:message.guild.name, iconURL:message.guild.iconURL({dynamic:true})})
        .setDescription(`\nID: **${klanId}** \nİsim: **${klan[0].isim}** \nSeviye: **${klan[0].seviye}** \nHazine: **${klan[0].altin}** \nÜye Limit: **${klan[0].limit}** \nKelime: **${klanKelime}** \nYetkili: **<@${klan[0].yetkili.join(">, ")}>** \nÜyeler: **<@${klan[0].uye.join(">, <@")}>**`)
        .setFooter({text:`${message.author.username}#${message.author.discriminator}`, iconURL:message.author.displayAvatarURL({dynamic:true})});
        if(klan[0].amblem != null) embed.setThumbnail(klan[0].amblem);

        message.channel.send({embeds:[embed]});
    }

    
};


exports.conf = {
    enabled: true,
    dm:false,
    name: "klan",
    aliases: [],
};

