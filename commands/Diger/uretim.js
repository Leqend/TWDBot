const Discord = require("discord.js");
const veriler = require("../../veriler.json");
const moment = require("moment-timezone");

const data = require("all.db");
const db = new data();

function findItem(id){
    let item = Object.keys(veriler.itemler);
    let items = [];
    item.forEach(item => {
        if(veriler.itemler[item].id == id) return items.push(veriler.itemler[item]);
    });
    return items[0];
}
function randomSayi(min,max){
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}



exports.run = async(client,message,args) =>{
    let inv = db.get(`envanter.${message.guild.id}.${message.author.id}`) || [];
    let ürün = args.slice(0).join(" ").replaceAll(" ","-");
    if(!ürün) return message.channel.send("Üretmek istediğin şeyi yaz.");
    let urun = veriler.itemler[ürün.toLowerCase()];
    if(!urun) return message.channel.send("Böyle bir ürün yok.");
    if(urun.yapılış.length == 0){
        return message.channel.send("Bü ürün yapılmıyor!")
    }else{
        let msg = "1)";
        const row = new Discord.MessageActionRow();
        let i = 0;
        let alet = [];
        urun.yapılış.forEach(a =>{
            i++;
            a.forEach(item => {
                if(item.id == "alet"){
                    item.miktar.forEach(iteme => {
                        msg += ` Gerekli Alet: **${findItem(iteme).isim}**,`;
                    });
                }else if(item.id == "adet"){
                    msg += ` Alacağın: **${item.miktar}**,`;
                }else msg += ` Gerekli Eşya: **${findItem(item.id).isim} (${item.miktar})**,`;
            });
            msg += `\n${i == urun.yapılış.length ? "" : `${i+1})`}`;
            row.addComponents(new Discord.MessageButton().setCustomId(`${i}`).setLabel(`${i}`).setStyle('PRIMARY'));
        });
        message.channel.send({content:"Üretimi Seç;\n"+msg,components:[row]});
        const filter = i => i.user.id === message.author.id;
        const collector = message.channel.createMessageComponentCollector({ filter, time: 10000 });
        collector.on('collect', async i => {
            if(i.customId == (parseInt(i.customId))){
                üret(parseInt(i.customId)-1);
                i.deferUpdate();
            }
        })
    }
    function üret(id){
        let rndm = randomSayi(1,100000000);
        const row = new Discord.MessageActionRow().addComponents(new Discord.MessageButton()
            .setCustomId('onayla-'+rndm).setLabel('Onayla').setStyle('PRIMARY'));
        var msg = "";
        let itemler = [];
        let alet = [];
        let adet = 0;
        urun.yapılış[id].forEach(item => {
            if(item.id == "adet") adet = item.miktar;
                else if(item.id == "alet") alet = item.miktar;
                    else itemler.push(item);
        });
        let itemEksik = false;
        itemler.forEach(item => {
            let im = inv.filter(i => i.id == item.id);
            if(!im[0]) im[0] = {adet:0};
            if(im[0].adet < item.miktar){
                itemEksik = true;
                msg += `**${findItem(item.id).isim} (${item.miktar-im[0].adet})** İtemin Eksik.\n`;
            }
        });
        alet.forEach(item => {
            let im = inv.filter(i => i.id == item);
            if(!im[0]) im[0] = {adet:0};
            if(im[0].adet == 0){
                itemEksik = true;
                msg += `**${findItem(item).isim}** İtemin Eksik.\n`;
            }
        });
        if(itemEksik == true){
            return message.channel.send({content:msg});
        }else{
            message.channel.send({content:"Üretimi Onayla",components:[row]});
            const filters = i => i.customId === 'onayla-'+rndm && i.user.id === message.author.id;
            const collector = message.channel.createMessageComponentCollector({ filter:filters, time: 10000 });

            collector.on('collect', async i => {
                if (i.customId === 'onayla-'+rndm) {
                    itemler.forEach(item => {
                        let asd = inv.find(a => a.id == item.id);
                        if(!asd) asd = {adet:0};
                        let veri = findItem(item.id);
                        db.pull(`envanter.${message.guild.id}.${message.author.id}`,item.id,"id");
                        db.push(`envanter.${message.guild.id}.${message.author.id}`,{isim:veri.isim, id:veri.id,tür:veri.tür, adet:(parseInt(asd.adet)-parseInt(item.miktar))});
                    });
                    let dsa = inv.find(a => a.id == urun.id);
                    if(!dsa) dsa = {adet:0};
                    let veri = findItem(urun.id);
                    db.pull(`envanter.${message.guild.id}.${message.author.id}`,urun.id,"id");
                    db.push(`envanter.${message.guild.id}.${message.author.id}`,{isim:veri.isim, id:veri.id,tür:veri.tür, adet:(parseInt(adet)+parseInt(dsa.adet))});
                    await i.update({ content: 'İtem Başarıyla Üretildi!', components: [] });
                    db.add(`basarimlar.${message.guild.id}.${message.author.id}.üretim`,1);
                }
            });
        }
    }

};


exports.conf = {
    enabled: true,
    dm:false,
    name: "üretim",
    aliases: [],
};

