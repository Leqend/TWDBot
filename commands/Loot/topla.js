const Discord = require("discord.js");
const olasılık = require("../../olasılık.json");
const veriler = require("../../veriler.json");
const moment = require("moment-timezone");
const data = require("all.db");
const db = new data();

function hesaplama(zorluk){
    var sayilar = [];
    let olacak = olasılık.zombi[zorluk].ihtimal;
    olacak.forEach(element => sayilar.push(element));

    const random = Math.floor(Math.random()*(100+1));;

    const sonuc = sayilar.reduce((a, c) => {
        return (Math.abs(c.olasılık - random) < Math.abs(a.olasılık - random) ? c : a);
    });
    return sonuc;
}
function findItem(id){
    let item = Object.keys(veriler.itemler);
    let items = [];
    item.forEach(item => {
        if(veriler.itemler[item].id == id) return items.push(veriler.itemler[item]);
    });
    return items[0];
}
function hHesap(ihtimal,hasar){
    var sayilar = [];
    for(var i = 0; i < ihtimal; i++){
        sayilar.push("a");
    }
    for(var i = 0; i < 100-ihtimal; i++){
        sayilar.push("b");
    }
    var sonuc = sayilar[Math.floor(Math.random()*sayilar.length)];
    let hasare = randomSayi(hasar[0],(hasar[1]));
    if(sonuc == "a") return {hasar:hasare};
        else return {hasar:0};
}

function randomSayi(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


exports.run = async(client,message,args) =>{
    let kanal = olasılık.kanallar.find(kanal => kanal.id == message.channel.id);
    if(!kanal) return message.channel.send("Doğru kanalda değilsin!");
    
    let zorluk = kanal.zorluk;
    let chn = olasılık.zombi[zorluk].zombi;
    let rndm = Math.floor(Math.random()*(100000000));

    let savaş = db.get(`savaş.${message.guild.id}.${message.author.id}`) || false;
    if(savaş) return message.channel.send("Savaşınız bittikten sonra tekrar deneyin. \n"+savaş);


    let babci = db.get(`süre.${message.guild.id}.${message.channel.id}.${message.author.id}`);
    if(babci){
        let date = Date.now();
        if(babci > date) {
            return message.channel.send("Kanalın zamanı geçmemiş! \nAçılacak Süre: " + moment(babci).tz("Europe/Istanbul").format("DD.MM.YYYY HH:mm:ss"));
        }
    }
    
    const row = new Discord.MessageActionRow();
    row.addComponents(new Discord.MessageButton().setCustomId('saldır-'+rndm).setLabel('Kuşandığın Silahla Vur').setStyle('PRIMARY'));
    row.addComponents(new Discord.MessageButton().setCustomId('kaç-'+rndm).setLabel('Kaçmayı Dene').setStyle('PRIMARY'));
    if(kanal.tür == "safezone") return message.channel.send("Safezone'da Loot olmaz!")
    if(kanal.tür == "zombi"){
        const filter = i => i.customId.endsWith(rndm) && i.user.id === message.author.id;
        const collector = message.channel.createMessageComponentCollector({ filter, time: 120000 });
        let kaçtane = randomSayi(chn.min,chn.max);
        let maxtane = kaçtane;
        let zo = veriler.npc[chn.isim.toLowerCase().replaceAll(" ","-")];
                
        let can = db.get(`user.${message.guild.id}.${message.author.id}.can`) || 100;
        if(can <= 25) return message.channel.send("Ağır yaralı olduğunuz için bu hareketi yapmaya cesaret edemiyorsunuz. Kendinizi iyileştirin!"); 

        let enfek = db.get(`user.${message.guild.id}.${message.author.id}.enfeksiyon`) || 0;
        if(enfek >= 75) return message.channel.send("Ağır enfeksiyonlu olduğunuz için bu hareketi yapmaya cesaret edemiyorsunuz. Kendinizi iyileştirin!"); 

        let zırh = db.get(`ekipman.zırh.${message.guild.id}.${message.author.id}`) || false;
        if(zırh != false) zırh = veriler.itemler[zırh.isim.toLowerCase().replaceAll(" ","-")];
        let dsilah = db.get(`ekipman.silah.${message.guild.id}.${message.author.id}`) || {isim:"yumruk"};
        let silah = veriler.itemler[dsilah.isim.toLowerCase().replaceAll(" ","-")];
        if(silah.özellik.mermi){
            let en = db.get(`envanter.${message.guild.id}.${message.author.id}`) || [];
            let mermi = en.find(a => a.id == silah.özellik.mermi);
            if(!mermi || mermi.adet <= 0) {
                return message.channel.send("Silahınızda mermi yok!");
            }else{
                let mermi = en.find(a => a.id == silah.özellik.mermi);
                db.pull(`envanter.${message.guild.id}.${message.author.id}`,mermi.id,"id");
                db.push(`envanter.${message.guild.id}.${message.author.id}`,{...mermi,adet:parseInt(mermi.adet-1)});
            }
            
        }
        let sv = db.get(`savaş.${message.guild.id}.${message.author.id}`) || false;
        if(sv == false) db.set(`savaş.${message.guild.id}.${message.author.id}`,`https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`);
        let güç = db.get(`user.${message.guild.id}.${message.author.id}.güç`) || 0;
        let pet = db.get(`pet.${message.guild.id}.${message.author.id}`) || [];
        pet = pet.find(a => a.takılı == true);
        let zcan = zo.can;
        let ısırık = false;
        let pençe = true;
        let tekrar = 2;

        var embed = new Discord.MessageEmbed()
        .setTitle("Zombilerle Savaş")
        .setDescription(`Karşında ${kaçtane} Zombi Var. \nTürleri: ${chn.isim} \nButonlara basarak saldırabilir yada kaçabilirsin eğer kazanırsan lootları alacaksın.`)

        message.channel.send({embeds:[embed],components:[row]});
        collector.on('collect', async i => {
            let sv = db.get(`savaş.${message.guild.id}.${message.author.id}`) || false;
            if(sv == false) db.set(`savaş.${message.guild.id}.${message.author.id}`,`https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`);
            if(i.customId == "kaç-"+rndm){
                let durum = hHesap(40,[10,11]);
                if(durum.hasar == 0){ 
                    row.setComponents(new Discord.MessageButton().setCustomId('saldır-'+rndm).setLabel('Kuşandığın Silahla Vur').setStyle('PRIMARY'))
                    tekrar = 0;
                    await i.update({content:`Kaçamadın`,components:[row]}).catch(err => {});
                }else{
                    await i.update({content:`Kaçmayı Başardın!`,embeds:[],components:[]}).catch(err => {});
                    db.set(`savaş.${message.guild.id}.${message.author.id}`,false);
                    collector.stop();
                }
            }else if(i.customId == "saldır-"+rndm){
                tekrar++;
                if(tekrar >= 2){
                    row.setComponents(new Discord.MessageButton().setCustomId('saldır-'+rndm).setLabel('Kuşandığın Silahla Vur').setStyle('PRIMARY'))
                    row.addComponents(new Discord.MessageButton().setCustomId('kaç-'+rndm).setLabel('Kaçmayı Dene').setStyle('PRIMARY'));
                }
                let durum = hHesap(silah.özellik.tutturma,silah.özellik.hasar);
                let zombi;
                let enfeksiyon;
                if(ısırık == false && pençe == true) {
                    zombi = hHesap(zo.ısırık.ihtimal,zo.ısırık.hasar);
                    if(zırh != false) zombi = {hasar:zombi.hasar-((zombi.hasar/100)*zırh.özellik.hasar)}; 
                    ısırık = true;
                    pençe = false;
                }else if(ısırık == true && pençe == false){
                    zombi = hHesap(zo.pençe.ihtimal,zo.pençe.hasar);
                    if(zırh != false) zombi = {hasar:zombi.hasar-((zombi.hasar/100)*zırh.özellik.hasar)}; 
                    ısırık = false;
                    pençe = true;
                }

                if(zombi.hasar != 0) {
                    if(ısırık == true) enfeksiyon = hHesap(zo.ısırık.enfeksiyon.ihtimal,zo.ısırık.enfeksiyon.hasar);
                    if(pençe == true) enfeksiyon = hHesap(zo.pençe.enfeksiyon.ihtimal,zo.pençe.enfeksiyon.hasar);

                    if(zırh != false) enfeksiyon = {hasar:enfeksiyon.hasar-((enfeksiyon.hasar/100)*zırh.özellik.enfeksiyon)}; 
                }

                if(durum.hasar == 0) durum = {hasar: "Tutmadı"};
                if(zombi.hasar == 0) zombi = {hasar: "Tutmadı"};

                let pets = db.get(`pet.${message.guild.id}.${message.author.id}`) || [];
                let petd = pets.findIndex(a => a.takılı == true);
                let peta = db.get(`pet.${message.guild.id}.${message.author.id}.${petd}`) || false;
                if(durum.hasar != 0 && durum.hasar != "Tutmadı"){
                    durum = {hasar:durum.hasar+parseInt(güç)};
                    if(peta) { 
                        if(peta.enerji > 0){
                            if(pet) durum = {hasar:(durum.hasar+(randomSayi(pet.hasar[0],pet.hasar[1])))};
                            db.set(`pet.${message.guild.id}.${message.author.id}.${petd}`,{...peta,enerji:(peta.enerji-1)}); 
                        }
                    }
                }

                if(durum.hasar != 0 && durum.hasar != "Tutmadı") zcan = zcan-(durum.hasar);
                if(zombi.hasar != 0 && zombi.hasar != "Tutmadı") can = db.set(`user.${message.guild.id}.${message.author.id}.can`,can-zombi.hasar);

                if(zombi.hasar != 0 && zombi.hasar != "Tutmadı") enfek = db.set(`user.${message.guild.id}.${message.author.id}.enfeksiyon`,enfek+enfeksiyon.hasar);
                if(enfek >= 100) db.set(`user.${message.guild.id}.${message.author.id}.enfeksiyon`,100);

                if(can <= 0){
                    db.set(`user.${message.guild.id}.${message.author.id}.can`,1);
                    embed.setDescription(`Kaybettin! \nHiç Canın Kalmadı ve Kenardaki Sokak Arasından Koşarak Kaçtın!`);
                    db.set(`savaş.${message.guild.id}.${message.author.id}`,false)
                    await i.update({embeds:[embed], components:[]}).catch(err => {});
                    collector.stop();
                }
                if(enfek >= 100){
                    embed.setDescription(`Kaybettin! \nEnfeksiyon %100 Oldu ve Bir Şekilde Oradan Uzaklaşmayı Becerdin!`);
                    db.set(`savaş.${message.guild.id}.${message.author.id}`,false);
                    await i.update({embeds:[embed], components:[]}).catch(err => {});
                    collector.stop();
                }

                if(zcan <= 0){
                    kaçtane = kaçtane-1;
                    if(kaçtane <= 0){
                        let maxitem = randomSayi(1,5);
                        let dustum = {};
                        let msg = "";

                        for(let uwu=0; uwu < maxitem; uwu++){
                            let envanter = db.get(`envanter.${message.guild.id}.${message.author.id}`) || [];
                            let item = hesaplama(zorluk);
                            let urun = envanter.find(a => a.id == item.itemId);
                            if(!urun) urun = {adet:0};
                            let ürün = findItem(item.itemId);
                            let veri = veriler.itemler[ürün.isim.toLowerCase().replaceAll(" ","-")];
                            let miktar = randomSayi(1,2);
                            if(envanter.length != 0) db.pull(`envanter.${message.guild.id}.${message.author.id}`,veri.id,"id");
                            db.push(`envanter.${message.guild.id}.${message.author.id}`,{...veri,yapılış: undefined,fiyat: undefined, adet:parseInt(miktar)+parseInt(urun.adet)});
                            if(dustum[veri.isim]){
                                dustum[veri.isim] = {isim:`${veri.isim}`,miktar:(dustum[veri.isim].miktar)+miktar};
                            }else{
                                dustum[veri.isim] = {isim:`${veri.isim}`,miktar:miktar};
                            }
                            
                        }

                        let asd = 0;
                        Object.keys(dustum).forEach(a =>{
                            asd++;
                            let ad = dustum[a];
                            msg+=`${asd}) İsim: **${ad.isim}**, Miktar: **${ad.miktar}**\n`;
                        })
                        embed.setDescription(`Kazandın! \n${msg}`);
                        db.set(`savaş.${message.guild.id}.${message.author.id}`,false);
                        db.add(`basarimlar.${message.guild.id}.${message.author.id}.zombi`,1);
                        db.add(`basarimlar.${message.guild.id}.${message.author.id}.topla`,1);
                        await i.update({embeds:[embed], components:[]}).catch(err => {});
                        collector.stop();
                    }else{
                        db.add(`basarimlar.${message.guild.id}.${message.author.id}.zombi`,1);
                        embed.setDescription(`Diğer Zombi Geliyor!`);
                        zcan = zo.can;
                        await i.update({embeds:[embed], components:[row]}).catch(err => {});
                    }
                }
                let stip = "";
                if(ısırık == true) stip = "Isırık";
                if(pençe == true) stip = "Pençe";
                let zombhasar;
                if(zombi.hasar == "Tutmadı") zombhasar = zombi.hasar;
                    else zombhasar = zombi.hasar.toFixed(1);
                embed.setDescription(`**Senin;**\nVerilen Hasar: ${durum.hasar}\nGüncel Canın: ${can.toFixed(1)} \n**Zombinin;**\nVerilen Hasar: ${zombhasar} \nGüncel Can: ${zcan.toFixed(0)} \nSaldırı Tipi: ${stip}\n\nZombi: ${kaçtane}/${maxtane}`);
                await i.update({embeds:[embed], components:[row]}).catch(err => {});
            }
        });
        collector.on("end",async (collected) => {
            db.set(`savaş.${message.guild.id}.${message.author.id}`,false);
            db.set(`süre.${message.guild.id}.${message.channel.id}.${message.author.id}`, (Date.now()+300000));
        });
    }


};


exports.conf = {
    enabled: true,
    dm:false,
    name: "topla",
    aliases: [],
};

