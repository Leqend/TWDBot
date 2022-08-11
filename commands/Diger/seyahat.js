const Discord = require("discord.js");
const data = require("all.db");
const db = new data();
function randomSayi(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
exports.run = async(client,message,args) =>{
    let inv = db.get(`envanter.${message.guild.id}.${message.author.id}`) || [];
    let yolculuk = db.get(`yolculuk.${message.guild.id}.${message.author.id}`);
    
    if(yolculuk) {
        let dat = Date.now();
        
        if(yolculuk.süre < dat) {
            db.delete(`yolculuk.${message.guild.id}.${message.author.id}`);
        }else{
            let seconds = (Math.floor((yolculuk.süre - Date.now())/1000) + 1) % 60;
            let normalSeconds = (Math.floor((yolculuk.süre - Date.now())/1000) + 1);
            let min =  Math.floor(Math.floor(normalSeconds / 60) % 60)
            if (min === 60) min = 0;
            const hata1 = new Discord.MessageEmbed()
                .setFooter({text: `Seyahatını bitirde gel.`, iconURL: `${message.author.avatarURL({dynamic: true})}`})
                .setAuthor({name: `The Walking Dead Roleplay`, iconURL: `${message.guild.iconURL({dynamic: true})}`})
                .setColor("ff0000")
                .setDescription(`Zaten yolculuktasın! \nKalan Süre: ${min} dakika ${seconds} saniye`)
                .setTimestamp()
            return message.reply({embeds:[hata1], allowedMentions: {repliedUser: false}});
        }
    }
    if(client.seyahatPic.has(message.author.id)){
        let süre = client.seyahatPic.get(message.author.id);
        let date = Date.now();
        let seconds = (Math.floor((süre - Date.now())/1000) + 1) % 60;
        let normalSeconds = (Math.floor((süre - Date.now())/1000) + 1);
        let min =  Math.floor(Math.floor(normalSeconds / 60) % 60)
        if (min === 60) min = 0;
        const hata2 = new Discord.MessageEmbed()
            .setFooter({text: `Lütfen beklemeyi öğren.`, iconURL: `${message.author.avatarURL({dynamic: true})}`})
            .setAuthor({name: `The Walking Dead Roleplay`, iconURL: `${message.guild.iconURL({dynamic: true})}`})
            .setColor("ff0000")
            .setDescription(`Seyahatın bitmesine ${min} dakika ${seconds} saniye kaldı.`)
            .setTimestamp()
        if(date < süre) return message.reply({embeds:[hata2], allowedMentions: {repliedUser: false}});
    }else client.seyahatPic.set(message.author.id,(Date.now()+11000));

    let rndm = randomSayi(1,100000000);
    let araba = inv.filter(a => a.tür == "araçlar");
    araba.push({isim: "Yürü",id:989898, süre:420000});

    const row = new Discord.MessageActionRow();
    let msg = "";
    let i=0;
    araba.forEach(e => {
        i++;
        msg += `\`${i})\` **${e.isim}** *${(parseInt(e.süre) / 1000 / 60)}dakika*\n`;
        row.addComponents(new Discord.MessageButton().setCustomId(`${e.id}-${rndm}`).setLabel(`${i}`).setStyle('PRIMARY'));
    });
    const araç = new Discord.MessageEmbed()
        .setFooter({text: `Butonlardan arabanı seç!.`, iconURL: `${message.author.avatarURL({dynamic: true})}`})
        .setAuthor({name: `The Walking Dead Roleplay`, iconURL: `${message.guild.iconURL({dynamic: true})}`})
        .setColor("000001")
        .setDescription(`Senin arabalarını aşşağıda sergiledim. Hangisi ile seyahat yapacaksan seç lütfen.\n\n${msg}`)
        .setTimestamp()
    message.reply({embeds:[araç], components: [row],allowedMentions: {repliedUser: false}});
    const filter = (i) => {
        return i.user.id === message.author.id;
    };
    const collector = message.channel.createMessageComponentCollector({ filter:filter, time: 10000 });
    collector.on('collect', async i => {
        if(i.customId.endsWith(rndm)) {
            yolculukSec(parseInt(i.customId.split("-")[0]));
            i.message.delete();
            collector.stop();
            i.deferUpdate();
        }
    });

    function yolculukSec(arabaisim){
        let mekan = [{isim:"atlanta",rol:"953727150916263957"},{isim:"nashville",rol:"953727147233644659"},{isim:"ulusal orman",rol:"953727125532319754"},{isim:"safezone",rol:"953379652041322526"}]
        let mekanlar = ["Atlanta", "Nashville", "Ulusal Orman", "Safezone"]
        const yrow = new Discord.MessageActionRow();
        let a = 0;
        let emsg = "";
        mekanlar.forEach(e => {
            a++;
            emsg += `\`${a})\` **${e}**\n`;
            yrow.addComponents(new Discord.MessageButton().setCustomId(`${e}`).setLabel(`${a}`).setStyle('PRIMARY'));
        })
        let arb = araba.filter(a => a.id == arabaisim);
        const bölge = new Discord.MessageEmbed()
            .setFooter({text: `Butonlardan gideceğin bölgeyi seç!.`, iconURL: `${message.author.avatarURL({dynamic: true})}`})
            .setAuthor({name: `The Walking Dead Roleplay`, iconURL: `${message.guild.iconURL({dynamic: true})}`})
            .setColor("000001")
            .setDescription(`Senin gidebileceğin bölgeleri aşşağıda sergiledim. Hangi bölgeye gideceksin lütfen seç.\n\n${emsg}`)
            .setTimestamp()
        message.reply({embeds:[bölge], components: [yrow],allowedMentions: {repliedUser: false}});
        const filt = i => i.user.id === message.author.id;
        const collector = message.channel.createMessageComponentCollector({ filt, time: 10000 });
        collector.on('collect', async i => {
            let yer = mekan.filter(a => a.isim == i.customId.toLowerCase());
            const hata3 = new Discord.MessageEmbed()
                .setFooter({text: `Güzel şakaydı beni güldürdü.`, iconURL: `${message.author.avatarURL({dynamic: true})}`})
                .setAuthor({name: `The Walking Dead Roleplay`, iconURL: `${message.guild.iconURL({dynamic: true})}`})
                .setColor("ff0000")
                .setDescription(`Zaten seçtiğin bölgedesin lütfen düzgün seçim yap.`)
                .setTimestamp()
            if(yer.length > 0) if(message.member._roles.includes(yer[0].rol)) return await i.update({ embeds: [hata3], components: [] }).catch(err =>{});
            db.set(`yolculuk.${message.guild.id}.${message.author.id}`,{isim:i.customId.toLowerCase(),süre:(Date.now()+arb[0].süre),kanal:message.channel.id});
            const son = new Discord.MessageEmbed()
                .setFooter({text: `İyi yolculuklar dilerim.`, iconURL: `${message.author.avatarURL({dynamic: true})}`})
                .setAuthor({name: `The Walking Dead Roleplay`, iconURL: `${message.guild.iconURL({dynamic: true})}`})
                .setColor("00ff00")
                .setDescription(`Seçtiğin bölgeye doğru güzel yolculuğun başladı.`)
                .setTimestamp()
            await i.update({ embeds: [son], components: [] }).catch(err =>{});
        });
    }

};


exports.conf = {
    enabled: true,
    dm:false,
    name: "seyahat",
    aliases: [],
};

