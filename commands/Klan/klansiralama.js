const Discord = require("discord.js");

const data = require("all.db");
const db = new data();


exports.run = async(client,message,args) =>{
    let kl = db.get(`klanlar`);
    let kla = db.get(`klan.${message.guild.id}`);
    let klan = Object.keys(kl);
    if(!klan) return;
    let klans = [];
    klan.forEach(a =>{
        if(kl[a].kelime > 0) klans.push({id:a,kelime:kl[a].kelime})
    })
    let klanlar = klans.sort((a, b) => b.kelime - a.kelime);
    console.log(klanlar)
    if(!klanlar) return;
    let liste = "";
     for (let i = 0; i < 10; i++) {
        if(klanlar[i]){
            let filt = kla.find(a => a.id == klanlar[i].id);
            let kelime = db.get(`klanlar.${klanlar[i].id}.kelime`) || 0;
            liste += `${i+1}. İsim: **${(filt ? filt.isim :"Bulunamadı")}**, Kelime: **${kelime}**. \n`
        }
    }
    return message.channel.send({embeds:[new Discord.MessageEmbed().setAuthor({name:message.guild.name, iconURL:message.guild.iconURL({dynamic:true})}).setDescription(liste).setFooter({text:`${message.author.username}#${message.author.discriminator}`, iconURL:message.author.displayAvatarURL({dynamic:true})})]});
    
};


exports.conf = {
    enabled: true,
    dm:false,
    name: "klansıralama",
    aliases: ["klantop"],
};

