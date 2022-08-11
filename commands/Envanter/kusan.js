const Discord = require("discord.js");
const veriler = require("../../veriler.json");
const data = require("all.db");
const db = new data();

function randomSayi(min,max){
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
exports.run = async(client,message,args) =>{
    let inv = db.get(`envanter.${message.guild.id}.${message.author.id}`) || [];
    let gıdalar = inv.filter(a => a.tür == "zırh" || a.tür == "silah");
    if(gıdalar.length == 0) return message.channel.send("Hiç Zırhın veya Silahın Yok!");

    let ürün = args.slice(0).join(" ").replaceAll(" ","-");
    if(!ürün){
        let liste = "Bir Zırh veya Silah Belirtmelisin! \n";
        gıdalar.forEach((item) => {
            if(item.adet == 0) return db.pull(`envanter.${message.guild.id}.${message.author.id}`,item.id,"id");
            liste += `İsim: **${item.isim}**, Adet: **${item.adet}**\n`;
        });
        const emb = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${message.author.username} Envanteri`)
        .setDescription(liste);
        message.channel.send({embeds:[emb]});
    }else{
        let veri = veriler.itemler[ürün.toLowerCase()];
        if(!veri) return message.channel.send("Zırh veya Silah yok!");
        let urun = inv.find(a => a.id == veri.id);
        if(!urun) return message.channel.send("Zırh veya Silah yok!");
        if(veri.tür == "zırh"){
            if(urun.adet <= 0) return message.channel.send("Zırhın yok!");
            let old = db.get(`ekipman.zırh.${message.guild.id}.${message.author.id}`) || [];
            if(old.isim == veri.isim) return message.channel.send("Zaten O Zırhı Giyiyorsun!");
            let msg = "İşlem Başarıyla Tamamlandı.\n";
            if(old.length == 0){
                db.pull(`envanter.${message.guild.id}.${message.author.id}`,veri.id,"id");
                db.push(`envanter.${message.guild.id}.${message.author.id}`,{isim:veri.isim, id:veri.id,tür:veri.tür, adet:parseInt(urun.adet)-1});

                msg += `Giyilen Zırh: **${veri.isim}**\n`;
                db.set(`ekipman.zırh.${message.guild.id}.${message.author.id}`,{isim:veri.isim, id:veri.id, tür:veri.tür, özellik:veri.özellik});
            }else{
                db.pull(`envanter.${message.guild.id}.${message.author.id}`,veri.id,"id");
                db.push(`envanter.${message.guild.id}.${message.author.id}`,{isim:veri.isim, id:veri.id,tür:veri.tür, adet:parseInt(urun.adet)-1});

                let adet = inv.find(a => a.id == old.id);
                if(!adet) adet = {adet:0};

                db.pull(`envanter.${message.guild.id}.${message.author.id}`,old.id,"id");
                db.push(`envanter.${message.guild.id}.${message.author.id}`,{isim:old.isim, id:old.id,tür:old.tür, adet:parseInt(adet.adet)+1});

                msg += `Giyilen Zırh: **${veri.isim}**\nÇıkarılan Zırh: **${old.isim}**`;
                db.set(`ekipman.zırh.${message.guild.id}.${message.author.id}`,{isim:veri.isim, id:veri.id, tür:veri.tür, özellik:veri.özellik});
            }
            return message.channel.send(msg);
        }else if(veri.tür == "silah"){
            if(urun.adet <= 0) return message.channel.send("Silahın yok!");
            let old = db.get(`ekipman.silah.${message.guild.id}.${message.author.id}`) || [];
            if(old.isim == veri.isim) return message.channel.send("Zaten O Silahı Kuşanıyorsun!");
            let msg = "İşlem Başarıyla Tamamlandı.\n";
            if(old.length == 0){
                db.pull(`envanter.${message.guild.id}.${message.author.id}`,veri.id,"id");
                db.push(`envanter.${message.guild.id}.${message.author.id}`,{isim:veri.isim, id:veri.id,tür:veri.tür, adet:parseInt(urun.adet)-1});

                msg += `Alınan Silah: **${veri.isim}**\n`;
                db.set(`ekipman.silah.${message.guild.id}.${message.author.id}`,{isim:veri.isim, id:veri.id, tür:veri.tür, özellik:veri.özellik});
            }else{
                db.pull(`envanter.${message.guild.id}.${message.author.id}`,veri.id,"id");
                db.push(`envanter.${message.guild.id}.${message.author.id}`,{isim:veri.isim, id:veri.id,tür:veri.tür, adet:parseInt(urun.adet)-1});

                let adet = inv.find(a => a.id == old.id);
                if(!adet) adet = {adet:0};

                db.pull(`envanter.${message.guild.id}.${message.author.id}`,old.id,"id");
                db.push(`envanter.${message.guild.id}.${message.author.id}`,{isim:old.isim, id:old.id,tür:old.tür, adet:parseInt(adet.adet)+1});
                msg += `Alınan Silah: **${veri.isim}**\nÇıkarılan Silah: **${old.isim}**`;

                db.set(`ekipman.silah.${message.guild.id}.${message.author.id}`,{isim:veri.isim, id:veri.id, tür:veri.tür, özellik:veri.özellik});
            }
            return message.channel.send(msg);
        }
    }
};


exports.conf = {
    enabled: true,
    dm:false,
    name: "kuşan",
    aliases: [],
};

