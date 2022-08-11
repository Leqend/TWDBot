const Discord = require("discord.js");
const veriler = require("../../veriler.json");

const data = require("all.db");
const db = new data();

function randomSayi(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
exports.run = async(client,message,args) =>{
    let kateler = ["aletler","bileşenler","araçlar","silah","zırh","gıda","sağlık","mermiler"];
    let ürün = args.splice(0).join(" ");
    if(!ürün) return message.channel.send("Lütfen geçerli bir kategori veya ürün girin. \nKategoriler: " + kateler.join(", "));
    if(kateler.includes(ürün.toLowerCase())){
        msg = "";
        kateler.filter(a => a == ürün.toLowerCase()).forEach(a =>{
            let veri = Object.keys(veriler.itemler).filter(a => veriler.itemler[a].tür == ürün.toLowerCase());
            veri.forEach(a =>{
                if(veriler.itemler[a].isim.toLowerCase() == "yumruk") return;
                let fiyat = veriler.itemler[a].fiyat || "Yok"
                msg += `İsim: **${veriler.itemler[a].isim}**, Fiyat: **${fiyat}**\n`;
            });
        });

        message.channel.send(msg);
    }else{


        let veri = veriler.itemler[ürün.toLowerCase().replaceAll(" ","-")];
        if(!veri) return message.channel.send("Bu ürün bulunamadı.");
        let fiyat = veri.fiyat || "Yok"
        if(fiyat == "Yok") return message.channel.send("Bu ürün satın alınmıyor.");
        let rndm = randomSayi(1,100000000);
        const row = new Discord.MessageActionRow();
        row.setComponents(new Discord.MessageButton().setCustomId(`3xsatinal-${rndm}`).setLabel('3x Satın al').setStyle('PRIMARY'));
        row.addComponents(new Discord.MessageButton().setCustomId(`satinal-${rndm}`).setLabel('Satın al').setStyle('PRIMARY'));


        let envanter = db.get(`envanter.${message.guild.id}.${message.author.id}`) || [];
        let urun = envanter.find(a => a.id == veri.id);
        if(!urun) urun = {adet:0};

        let sat = "";
        if(urun.adet > 0) {
            sat = `, Satış: **${veri.satış}**`;
            row.addComponents(new Discord.MessageButton().setCustomId(`sat-${rndm}`).setLabel('Sat').setStyle('PRIMARY'));
            if(urun.adet >= 3) row.addComponents(new Discord.MessageButton().setCustomId(`3xsat-${rndm}`).setLabel('3x Sat').setStyle('PRIMARY'));
        }

        message.channel.send({content:`İsim: **${veri.isim}**, Fiyat: **${fiyat}**${sat} \nOnaylıyorsanız Butona Basın!`,components:[row]});

        const filter = i => i.customId.endsWith(rndm) && i.user.id === message.author.id;
        const collector = message.channel.createMessageComponentCollector({ filter, time: 15000 });
        collector.on('collect', async i => {
            envanter = db.get(`envanter.${message.guild.id}.${message.author.id}`) || [];
            urun = envanter.find(a => a.id == veri.id);
            if(!urun) urun = {adet:0};

            if(i.customId == "satinal-" + rndm){
                let altin = db.get(`altin.${message.guild.id}.${message.author.id}`);
                if(altin < veri.fiyat) return await i.update({content:"Altınınız yetersiz.",components:[]});
                db.substr(`altin.${message.guild.id}.${message.author.id}`,fiyat);
                if(envanter.length != 0) db.pull(`envanter.${message.guild.id}.${message.author.id}`,veri.id,"id");
                db.push(`envanter.${message.guild.id}.${message.author.id}`,{...veri,yapılış:undefined,fiyat:undefined, adet:(parseInt(urun.adet)+1)});
                await i.update({content:`${veri.isim} adlı ürünü aldın.`,components:[]});
            }
            if(i.customId == "3xsatinal-" + rndm){
                let altin = db.get(`altin.${message.guild.id}.${message.author.id}`);
                if(altin < (veri.fiyat*3)) return await i.update({content:"Altınınız yetersiz.",components:[]});
                db.substr(`altin.${message.guild.id}.${message.author.id}`,(fiyat*3));
                if(envanter.length != 0) db.pull(`envanter.${message.guild.id}.${message.author.id}`,veri.id,"id");
                db.push(`envanter.${message.guild.id}.${message.author.id}`,{...veri,yapılış:undefined,fiyat:undefined, adet:(parseInt(urun.adet)+3)});
                await i.update({content:`${veri.isim} adlı ürünü 3x aldın.`,components:[]});
            }
            if(i.customId == "sat-" + rndm){
                if(urun.adet < 1) return await i.update({content:"Bu ürünü satamazsın.",components:[]});
                db.add(`altin.${message.guild.id}.${message.author.id}`,veri.satış);
                if(envanter.length != 0) db.pull(`envanter.${message.guild.id}.${message.author.id}`,veri.id,"id");
                db.push(`envanter.${message.guild.id}.${message.author.id}`,{...veri,yapılış:undefined,fiyat:undefined, adet:(parseInt(urun.adet)-1)});
                await i.update({content:`${veri.isim} adlı ürünü sattın.`,components:[]});
            }
            if(i.customId == "3xsat-" + rndm){
                if(urun.adet < 3) return await i.update({content:"Bu ürünü 3x satamazsın.",components:[]});
                db.add(`altin.${message.guild.id}.${message.author.id}`,(veri.satış*3));
                if(envanter.length != 0) db.pull(`envanter.${message.guild.id}.${message.author.id}`,veri.id,"id");
                db.push(`envanter.${message.guild.id}.${message.author.id}`,{...veri,yapılış:undefined,fiyat:undefined, adet:(parseInt(urun.adet)-3)});
                await i.update({content:`${veri.isim} adlı ürünü 3x sattın.`,components:[]});
            }
        });

    }

    
};


exports.conf = {
    enabled: true,
    dm:false,
    name: "market",
    aliases: [],
};

