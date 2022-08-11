const Discord = require("discord.js");
const data = require("all.db");
const db = new data();


exports.run = async(client,message,args) =>{
    let user = db.get(`user.${message.guild.id}`);
    let se = db.get(`user.${message.guild.id}`);
    let userlar = Object.keys(user || {}).map(md => {return {id: md, Total: (db.get(`user.${message.guild.id}.${md}.kelime`) || 0) }}).sort((a, b) => b.Total - a.Total).map(a => a);
    let ses = Object.keys(se || {}).map(md => {return {id: md, Total: (db.get(`ses.${message.guild.id}.${md}`) || 0) }}).sort((a, b) => b.Total - a.Total).map(a => a);


    let kelimeamk = [];
    let sesamk = [];
    for (let i = 0; i < 10; i++) {
        if(userlar[i]){
            let kelime = db.get(`user.${message.guild.id}.${userlar[i].id}.kelime`) || 0;
            kelimeamk.push({sıra: i+1, name: `**<@${userlar[i].id}>**`, value: `Kelime: **${kelime}**`});
        }
        if(ses[i]){
            let sess = db.get(`ses.${message.guild.id}.${ses[i].id}`) || 0;
            sesamk.push({sıra: i+1, name: `**<@${ses[i].id}>**`, value: `Ses: **${(sess/60000).toFixed(1)}dk**`});
        }
    }
    let kelime_UwU = "";
    let ses_UwU = "";
    kelimeamk.forEach(a =>{
        kelime_UwU += `${a.sıra}) ${a.name} ${a.value}\n`;
    });
    sesamk.forEach(a =>{
        ses_UwU += `${a.sıra}) ${a.name} ${a.value}\n`;
    });
    const emb = new Discord.MessageEmbed()
        .setFooter({text: `Sunucunun sıralamaları başarı ile gösterildi.`, iconURL: `${message.author.avatarURL({dynamic: true})}`})
        .setAuthor({name: `The Walking Dead Roleplay`, iconURL: `${message.guild.iconURL({dynamic: true})}`})
        .setColor("000001")
        .setTimestamp()
        .addFields({name: "**Kelime Sıralaması**", value: kelime_UwU, inline:true}, {name: "**Ses Sıralaması**", value: ses_UwU, inline:true})
    message.reply({embeds:[emb], allowedMentions: {repliedUser: false}});
};


exports.conf = {
    enabled: true,
    dm:false,
    name: "sıralama",
    aliases: ["top"],
};

