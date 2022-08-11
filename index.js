const Discord = require("discord.js");
const client = new Discord.Client({intents:32767});
const fs = require("fs");
const moment = require("moment-timezone");
const alldb = require("all.db");
const db = new alldb("./database.json");

const config = require("./vezalan.json");
const veriler = require("./veriler.json");

function yuvarla(sayi,basamak) {
    basamak=Math.pow(10,basamak);
    return (Math.round(sayi*basamak)/basamak);  
};

client.on("ready", ()=>{
    console.log("┃━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┃");
    console.log("┃ Vezalan Yazılım Gururla Sunar! ┃");
    console.log("┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛");
    db.delete(`savaş`);
    db.delete(`süre`);

});


setInterval(async() =>{
    let guild = await client.guilds.cache.get("726070221806501939");
    let yolculuk = db.get(`yolculuk.${guild.id}`);
    let mekan = [{isim:"atlanta",rol:"953727150916263957"},{isim:"nashville",rol:"953727147233644659"},{isim:"ulusal orman",rol:"953727125532319754"},{isim:"safezone",rol:"953379652041322526"}]
    for(let i of Object.keys(yolculuk)){
        let data = db.get(`yolculuk.${guild.id}.${i}`);
        let member = await guild.members.cache.get(i);
        let mkn = mekan.find(a => a.isim == data.isim);
        if(!mkn) { 
            db.delete(`yolculuk.${guild.id}.${i}`); 
        }else{
            let date = Date.now();
            if(date > data.süre){
                let alin = mekan.filter(a => a.isim != data.isim);
                let ch = guild.channels.cache.get(data.kanal);
                alin.forEach(e => member.roles.remove(e.rol).catch(e =>{}));
                member.roles.add([mkn.rol]).catch(e =>{});
                db.add(`basarimlar.${guild.id}.${i}.seyahat`,1);
                ch.send(`Yolculuğun Bitmiş! \n<@${i}>`).catch(err =>{});
                db.delete(`yolculuk.${guild.id}.${i}`); 
            }
        }
    }
},3000);


client.on("messageCreate", async message =>{
    if(message.author.bot) return;
    if(message.channel.type == "dm") return;

    let data = db.get(`basarimlar.${message.guild.id}.${message.author.id}`) || {};
    let basarim = db.get(`user.${message.guild.id}.${message.author.id}.basarim`) || [];
    let basarimlar = basarim.map(a => a.isim);

    if(data.üretim){
        if(data.üretim >= 5){
            if(!basarimlar.includes("Yeni Üretimci")) {
                db.push(`user.${message.guild.id}.${message.author.id}.basarim`,{isim:"Yeni Üretimci",tarih:moment().tz('Europe/Istanbul').format('DD.MM.YYYY, HH:mm:ss')});
            }
        }
        if(data.üretim >= 25){
            if(!basarimlar.includes("Mahallemizin Üretimcisi")) {
                db.push(`user.${message.guild.id}.${message.author.id}.basarim`,{isim:"Mahallemizin Üretimcisi",tarih:moment().tz('Europe/Istanbul').format('DD.MM.YYYY, HH:mm:ss')});
            }
        }
        if(data.üretim >= 70){
            if(!basarimlar.includes("Adeta Fabrika")) {
                db.push(`user.${message.guild.id}.${message.author.id}.basarim`,{isim:"Adeta Fabrika",tarih:moment().tz('Europe/Istanbul').format('DD.MM.YYYY, HH:mm:ss')});
            }
        }
    }
    if(data.topla){
        if(data.topla >= 5){
            if(!basarimlar.includes("Avcı Toplayıcı Yaşam")) {
                db.push(`user.${message.guild.id}.${message.author.id}.basarim`,{isim:"Avcı Toplayıcı Yaşam",tarih:moment().tz('Europe/Istanbul').format('DD.MM.YYYY, HH:mm:ss')});
            }
        }
        if(data.topla >= 35){
            if(!basarimlar.includes("Biraz Ondan Biraz Bundan")) {
                db.push(`user.${message.guild.id}.${message.author.id}.basarim`,{isim:"Biraz Ondan Biraz Bundan",tarih:moment().tz('Europe/Istanbul').format('DD.MM.YYYY, HH:mm:ss')});
            }
        }
        if(data.topla >= 150){
            if(!basarimlar.includes("Senin Çöpün Benim Hazinem")) {
                db.push(`user.${message.guild.id}.${message.author.id}.basarim`,{isim:"Senin Çöpün Benim Hazinem",tarih:moment().tz('Europe/Istanbul').format('DD.MM.YYYY, HH:mm:ss')});
            }
        }
    }
    if(data.zombi){
        if(data.zombi >= 10){
            if(!basarimlar.includes("Hâlâ Ayaktayım")) {
                db.push(`user.${message.guild.id}.${message.author.id}.basarim`,{isim:"Hâlâ Ayaktayım",tarih:moment().tz('Europe/Istanbul').format('DD.MM.YYYY, HH:mm:ss')});
            }
        }
        if(data.zombi >= 50){
            if(!basarimlar.includes("Tecrübeli Avcı")) {
                db.push(`user.${message.guild.id}.${message.author.id}.basarim`,{isim:"Tecrübeli Avcı",tarih:moment().tz('Europe/Istanbul').format('DD.MM.YYYY, HH:mm:ss')});
            }
        }
        if(data.zombi >= 100){
            if(!basarimlar.includes("Zombilerin Kabusu")) {
                db.push(`user.${message.guild.id}.${message.author.id}.basarim`,{isim:"Zombilerin Kabusu",tarih:moment().tz('Europe/Istanbul').format('DD.MM.YYYY, HH:mm:ss')});
            }
        }
    }
    if(data.pvp){
        if(data.pvp >= 5){
            if(!basarimlar.includes("Tek Düşmanım Zombiler Değil")) {
                db.push(`user.${message.guild.id}.${message.author.id}.basarim`,{isim:"Tek Düşmanım Zombiler Değil",tarih:moment().tz('Europe/Istanbul').format('DD.MM.YYYY, HH:mm:ss')});
            }
        }
        if(data.pvp >= 20){
            if(!basarimlar.includes("Ölüm Saçar")) {
                db.push(`user.${message.guild.id}.${message.author.id}.basarim`,{isim:"Ölüm Saçar",tarih:moment().tz('Europe/Istanbul').format('DD.MM.YYYY, HH:mm:ss')});
            }
        }
        if(data.pvp >= 50){
            if(!basarimlar.includes("Soğukkanlı Katil")) {
                db.push(`user.${message.guild.id}.${message.author.id}.basarim`,{isim:"Soğukkanlı Katil",tarih:moment().tz('Europe/Istanbul').format('DD.MM.YYYY, HH:mm:ss')});
            }
        }
    }
    if(data.seyahat){
        if(data.seyahat >= 20){
            if(!basarimlar.includes("Göçebe")) {
                db.push(`user.${message.guild.id}.${message.author.id}.basarim`,{isim:"Göçebe",tarih:moment().tz('Europe/Istanbul').format('DD.MM.YYYY, HH:mm:ss')});
            }
        }
    }
    let altin = db.get(`altin.${message.guild.id}.${message.author.id}`) || 0;
    if(altin >= 2500){
        if(!basarimlar.includes("Cüzdanım Kabardı")) {
            db.push(`user.${message.guild.id}.${message.author.id}.basarim`,{isim:"Cüzdanım Kabardı",tarih:moment().tz('Europe/Istanbul').format('DD.MM.YYYY, HH:mm:ss')});
        }
    }
    if(altin >= 7500){
        if(!basarimlar.includes("Bana Bir Kasa Lazım")) {
            db.push(`user.${message.guild.id}.${message.author.id}.basarim`,{isim:"Bana Bir Kasa Lazım",tarih:moment().tz('Europe/Istanbul').format('DD.MM.YYYY, HH:mm:ss')});
        }
    }
    if(altin >= 15000){
        if(!basarimlar.includes("Kapitalist Düzen")) {
            db.push(`user.${message.guild.id}.${message.author.id}.basarim`,{isim:"Kapitalist Düzen",tarih:moment().tz('Europe/Istanbul').format('DD.MM.YYYY, HH:mm:ss')});
        }
    }
    
});


client.on("messageCreate", async message =>{
    if(message.author.bot) return;
    let wlkanal = db.get(`kanallar`) || [];
    if(!wlkanal.includes(message.channel.id)) return;
    let klanId = db.get(`klan.${message.author.id}.id`) || false;
    let kelime = message.content.split(" ").length || 1;
    if(klanId){
        let klan = db.get(`klan.${message.guild.id}`).filter(a => a.id == klanId) || [];
        if(klan != []){ 
            db.add(`klanlar.${klan[0].id}.kelime`,parseInt(kelime));
        }
    }

    db.add(`altinBanka.${message.guild.id}.${message.author.id}`,kelime/4);
    db.add(`taltinBanka.${message.guild.id}.${message.author.id}`,kelime/4);

    db.add(`user.${message.guild.id}.${message.author.id}.kelime`,kelime);

    let xp = await db.add(`user.${message.guild.id}.${message.author.id}.xp`,kelime);

    let level = db.get(`user.${message.guild.id}.${message.author.id}.seviye`) || 0;
    let xpveri = veriler.seviye.filter(a => a.xp <= xp).reverse();
    let lastlevel = veriler.seviye.filter(a => a.level == level);
    let lastlevele = veriler.seviye.filter(a => a.level == (level-1));

    if(xpveri.length != 0){
        if(level <= xpveri[0].level) {
            if(lastlevele[0].rol != lastlevel[0].rol){
                if(lastlevele[0]) message.member.roles.remove(lastlevele[0].rol).catch(e =>{});
                if(lastlevel[0]) message.member.roles.add(lastlevel[0].rol).catch(e =>{});
            }
            db.add(`user.${message.guild.id}.${message.author.id}.seviye`,1);
            db.set(`user.${message.guild.id}.${message.author.id}.xp`,1);
            db.add(`user.${message.guild.id}.${message.author.id}.puan.level`,1);
        }
    }

    let aclik = db.get(`user.${message.guild.id}.${message.author.id}.aclik`) || 100;
    let su = db.get(`user.${message.guild.id}.${message.author.id}.su`) || 100;
    let yenilenme = db.get(`user.${message.guild.id}.${message.author.id}.yenilenme`) || 0.1;
    let savaş = db.get(`user.${message.guild.id}.${message.author.id}.savaş`) || false;

    let yaclik = db.set(`user.${message.guild.id}.${message.author.id}.aclik`,(aclik-0.15).toFixed(1));
    let ysu = db.set(`user.${message.guild.id}.${message.author.id}.su`,(su-0.20).toFixed(1));
    let canss = 0;
    if(savaş == false){
        canss = db.add(`user.${message.guild.id}.${message.author.id}.can`,yuvarla((yenilenme*kelime),1));
    }
    let maxcan = db.get(`user.${message.guild.id}.${message.author.id}.maxcan`) || 100;
    if(canss >= maxcan) db.set(`user.${message.guild.id}.${message.author.id}.can`,maxcan);
    let enfek = db.get(`user.${message.guild.id}.${message.author.id}.enfeksiyon`) || 0;
    if(yaclik <= 0){
        db.set(`user.${message.guild.id}.${message.author.id}.aclik`,0.1);
    }
    if(ysu <= 0){
        db.set(`user.${message.guild.id}.${message.author.id}.su`,0.1);
    }
    let cana = [{can:25,rol:"953752071910342666"},{can:60,rol:"953752065610510457"},{can:80,rol:"953752060917071902"},{can:100,rol:"953752052373291058"}];
    if(canss < 25){
        let filt = cana.filter(a => a.can == 25);
        if(message.member._roles.includes(filt[0].rol)) return;
        cana.forEach(a => message.member.roles.remove(a.rol).catch(e =>{}));
        message.member.roles.add(filt[0].rol).catch(e =>{});
    }else if(canss < 60){
        let filt = cana.filter(a => a.can == 60);
        if(message.member._roles.includes(filt[0].rol)) return;
        cana.forEach(a => message.member.roles.remove(a.rol).catch(e =>{}));
        message.member.roles.add(filt[0].rol).catch(e =>{});
    }else if(canss < 80){
        let filt = cana.filter(a => a.can == 80);
        if(message.member._roles.includes(filt[0].rol)) return;
        cana.forEach(a => message.member.roles.remove(a.rol).catch(e =>{}));
        message.member.roles.add(filt[0].rol).catch(e =>{});
    }else if(canss <= (maxcan+1)){
        let filt = cana.filter(a => a.can == 100);
        if(message.member._roles.includes(filt[0].rol)) return;
        cana.forEach(a => message.member.roles.remove(a.rol).catch(e =>{}));
        message.member.roles.add(filt[0].rol).catch(e =>{});
    }
    let enfeke = [{enfek:25,rol:"953755652512165908"},{enfek:50,rol:"953755649748135956"},{enfek:75,rol:"953755646619189338"},{enfek:100,rol:"953755638691921950"}];

    if(enfek < 25){
        let filt = enfeke.filter(a => a.enfek == 25);
        if(message.member._roles.includes(filt[0].rol)) return;
        enfeke.forEach(a => message.member.roles.remove(a.rol).catch(e =>{}));
        message.member.roles.add(filt[0].rol).catch(e =>{});
    }else if(enfek < 50){
        let filt = enfeke.filter(a => a.enfek == 50);
        if(message.member._roles.includes(filt[0].rol)) return;
        enfeke.forEach(a => message.member.roles.remove(a.rol).catch(e =>{}));
        message.member.roles.add(filt[0].rol).catch(e =>{});
    }else if(enfek < 75){
        let filt = enfeke.filter(a => a.enfek == 75);
        if(message.member._roles.includes(filt[0].rol)) return;
        enfeke.forEach(a => message.member.roles.remove(a.rol).catch(e =>{}));
        message.member.roles.add(filt[0].rol).catch(e =>{});
    }else if(enfek < 101){
        let filt = enfeke.filter(a => a.enfek == 100);
        if(message.member._roles.includes(filt[0].rol)) return;
        enfeke.forEach(a => message.member.roles.remove(a.rol).catch(e =>{}));
        message.member.roles.add(filt[0].rol).catch(e =>{});
    }

    let sandiklar = Object.keys(veriler.sandik);
    sandiklar.forEach(UwU => {
        if(UwU == "yardım-sandığı") return;
        let sandik = db.get(`sandik.${message.guild.id}.${message.author.id}.${UwU}`) || 0;
        if(sandik >= veriler.sandik[UwU].kelime) return db.set(`sandik.${message.guild.id}.${message.author.id}.${UwU}`,veriler.sandik[UwU].kelime);
            else db.add(`sandik.${message.guild.id}.${message.author.id}.${UwU}`,kelime);
    });
});

const aktifSuresi = new Map();
client.on("voiceStateUpdate", async (oldState, newState) =>{
    if((oldState.member && oldState.member.user.bot) || (newState.member && newState.member.user.bot)) return;
    if(!oldState.channelId && newState.channelId){
        aktifSuresi.set(oldState.id, Date.now());
    }
    let data;
    if(!aktifSuresi.has(oldState.id)){
        data = Date.now();
        aktifSuresi.set(oldState.id, data);
    }
    else data = aktifSuresi.get(oldState.id);
    let duration = Date.now() - data;
    if(oldState.channelId && !newState.channelId) {
        aktifSuresi.delete(oldState.id);
        db.add(`ses.${oldState.guild.id}.${oldState.member.id}`, duration);
        let gelenpara = Math.round((duration / 60000) * 0.50);
        db.add(`altinBanka.${oldState.guild.id}.${oldState.member.id}`, gelenpara);
        db.add(`taltinBanka.${oldState.guild.id}.${oldState.member.id}`, gelenpara)
    }
    else if(oldState.channelId && newState.channelId){
        aktifSuresi.set(oldState.id, Date.now());
        db.add(`ses.${oldState.guild.id}.${oldState.member.id}`, duration);
        let gelenpara = Math.round((duration / 60000) * 0.50);
        db.add(`altinBanka.${oldState.guild.id}.${oldState.member.id}`, gelenpara)
        db.add(`taltinBanka.${oldState.guild.id}.${oldState.member.id}`, gelenpara)
    }

});
client.seyahatPic = new Map();
client.on("messageCreate", async (message) =>{
    if(message.author.bot) return;
    if(message.channel.type == "dm") return;
    let basarim = db.get(`user.${message.guild.id}.${message.author.id}.basarim`) || [];
    let basarimlar = basarim.map(a => a.isim);
    if(!basarimlar.includes("İlk Mesaj")) {
        db.set(`user.${message.guild.id}.${message.author.id}.can`,100);
        db.set(`user.${message.guild.id}.${message.author.id}.maxcan`,100);
        return db.push(`user.${message.guild.id}.${message.author.id}.basarim`,{isim:"İlk Mesaj",tarih:moment().tz('Europe/Istanbul').format('DD.MM.YYYY, HH:mm:ss')});
    }
});

client.on("messageCreate", (message) =>{
    if (message.author.bot) return;
    if (!message.content.startsWith(config.prefix)) return;
    if(!config.owners.includes(message.author.id)) return message.channel.send("Bu komutu sadece bot sahibi kullanabilir!");
    let command = message.content.split(" ")[0].slice(config.prefix.length);
    let params = message.content.split(" ").slice(1);
    let cmd;
    if (client.commands.has(command)) {
        if(command == "seyahat"){
        }
        cmd = client.commands.get(command);
    } else if (client.aliases.has(command)) {
        cmd = client.commands.get(client.aliases.get(command));
    }
    if (cmd) {
        if(cmd.conf.enabled == false) return;
        cmd.run(client, message, params);
    }
})

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {
   if (err) console.error(err);
   console.log("┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓");
   files.forEach(fse => {
    fs.readdir(`./commands/${fse}/`, (err, filess) => {
        filess.forEach(fsss => {
            let props = require(`./commands/${fse}/${fsss}`);
            let bosluk = "";
            let msg = `${fsss.replace(".js", "").slice(0, 15)} // Yüklendi`
            for (let i=msg.length; i< 27; i++){
                bosluk += " ";
            }
            console.log(`┃ ${fsss.replace(".js", "").slice(0, 15)}.js // Yüklendi ${bosluk}┃`);
            client.commands.set(props.conf.name, props);
            props.conf.aliases.forEach(alias => {
                client.aliases.set(alias, props.conf.name);
            });
        });
    });
    });
});

client.login(config.token);

