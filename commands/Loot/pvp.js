const Discord = require("discord.js");
const olasılık = require("../../olasılık.json");
const veriler = require("../../veriler.json");
const moment = require("moment-timezone");
const data = require("all.db");
const db = new data();

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
    let kanal = db.get(`kanallar`);
    if(!kanal.includes(message.channel.id)) return message.channel.send("Doğru kanalda değilsin!");
    
    let user = message.mentions.users.first();
    if(!user || user.id == message.author.id ) return message.channel.send("Kullanıcı etiketlemelisin!");

    let rndm = Math.floor(Math.random()*(100000000));

    const row = new Discord.MessageActionRow();
    row.addComponents(new Discord.MessageButton().setCustomId('kabulet-'+(rndm-1)).setLabel('Teklifi Kabul Et').setStyle('PRIMARY'));
    row.addComponents(new Discord.MessageButton().setCustomId('reddet-'+(rndm-1)).setLabel('Teklifi Reddet').setStyle('PRIMARY'));
    row.addComponents(new Discord.MessageButton().setCustomId('teklifiptal-'+(rndm+1)).setLabel('Teklifi İptal Et').setStyle('PRIMARY'));


    if(kanal.tür == "safezone") return message.channel.send("Safezone'da PvP olmaz!")

    var embed = new Discord.MessageEmbed()
    .setTitle("PvP Savaş")
    .setDescription(`Karşında ${message.author.username} Var. \nButonlara basarak kabul edebilir yada etmeyebilirsin.`)


    let savaşA = db.get(`savaş.${message.guild.id}.${message.author.id}`) || false;
    if(savaşA) return message.channel.send("Savaşınız bittikten sonra tekrar deneyin.");
    let savaşU = db.get(`savaş.${message.guild.id}.${user.id}`) || false;
    if(savaşU) return message.channel.send("Kişinin bir savaşı var.");


    let zırhA = db.get(`ekipman.zırh.${message.guild.id}.${message.author.id}`) || false;
    if(zırhA != false) zırhA = veriler.itemler[zırh.isim.toLowerCase().replaceAll(" ","-")];
    let dsilahA = db.get(`ekipman.silah.${message.guild.id}.${message.author.id}`) || {isim:"yumruk"};
    let silahA = veriler.itemler[dsilahA.isim.toLowerCase().replaceAll(" ","-")];
    let canA = db.get(`user.${message.guild.id}.${message.author.id}.can`) || 100;
    let güçA = db.get(`user.${message.guild.id}.${message.author.id}.güç`) || 0;
    let petA = db.get(`pet.${message.guild.id}.${message.author.id}`) || [];
    petA = petA.find(a => a.takılı == true);

    let zırhU = db.get(`ekipman.zırh.${message.guild.id}.${user.id}`) || false;
    if(zırhU != false) zırhU = veriler.itemler[zırh.isim.toLowerCase().replaceAll(" ","-")];
    let dsilahU = db.get(`ekipman.silah.${message.guild.id}.${user.id}`) || {isim:"yumruk"};
    let silahU = veriler.itemler[dsilahU.isim.toLowerCase().replaceAll(" ","-")];
    let canU = db.get(`user.${message.guild.id}.${user.id}.can`) || 100;
    let güçU = db.get(`user.${message.guild.id}.${user.id}.güç`) || 0;
    let petU = db.get(`pet.${message.guild.id}.${user.id}`) || [];
    petU = petU.find(a => a.takılı == true);
    message.channel.send({embeds:[embed],components:[row]});

    const filterA = (i) => {
        return i.customId.endsWith((rndm+1)) && i.user.id === message.author.id;
    };
    let tekrarA = 0;
    let tekrarU = 0;
    const collectorAuthor = message.channel.createMessageComponentCollector({ filter:filterA, time: 120000 });
    collectorAuthor.on('collect', async i => {
        if(i.customId == "teklifiptal-"+(rndm+1)){
            db.delete(`savaş.${message.guild.id}.${message.author.id}`);
            db.delete(`savaş.${message.guild.id}.${user.id}`);
            await i.update({content:"Savaşınız iptal edildi.",embeds:[], components:[]}).catch(err => {});
            collectorAuthor.stop();
            collectorUser.stop();
            return;
        }     
        if(i.customId == "kaç-"+(rndm+1)){
            let durum = hHesap(40,[10,11]);
            if(durum.hasar == 0){ 
                tekrarU = 0;
                row.setComponents(new Discord.MessageButton().setCustomId('saldırAuthor-'+(rndm+1)).setLabel('Kuşandığın Silahla Vur').setStyle('PRIMARY'))
                if(tekrarU >= 2){
                    row.addComponents(new Discord.MessageButton().setCustomId('kaç-'+(rndm-1)).setLabel(user.username+' Kaçmayı Dene').setStyle('PRIMARY'));
                }
                await i.update({content:`Kaçamadın`,components:[row]}).catch(err => {});
            }else{
                await i.update({content:`Kaçmayı Başardın!`,embeds:[],components:[]}).catch(err => {});
                db.set(`savaş.${message.guild.id}.${message.author.id}`,false);
                db.set(`savaş.${message.guild.id}.${user.id}`,false);
                collectorUser.stop();
                collectorAuthor.stop();
            }
        }
        if(i.customId == "saldırAuthor-"+(rndm+1)){
            tekrarA++;
            row.setComponents(new Discord.MessageButton().setCustomId('saldırUser-'+(rndm-1)).setLabel('Kuşandığın Silahla Vur').setStyle('PRIMARY'));
            let hasar = hHesap(silahA.özellik.tutturma,silahA.özellik.hasar);
            if(zırhU) hasar = {hasar:hasar.hasar-((hasar.hasar/100)*zırh.özellik.hasar)}; 
            if(hasar.hasar == 0) hasar = {hasar: "Tutmadı"};
            if(tekrarA >= 2){
                row.setComponents(new Discord.MessageButton().setCustomId('saldırUser-'+(rndm-1)).setLabel('Kuşandığın Silahla Vur').setStyle('PRIMARY'));
                row.addComponents(new Discord.MessageButton().setCustomId('kaç-'+(rndm-1)).setLabel(user.username+' Kaçmayı Dene').setStyle('PRIMARY'));
            }
            let pets = db.get(`pet.${message.guild.id}.${message.author.id}`) || [];
            pets = pets.findIndex(a => a.takılı == true);
            pets = db.get(`pet.${message.guild.id}.${message.author.id}.${pets}`) || false;
            if(hasar.hasar != 0 && hasar.hasar != "Tutmadı"){
                if(pets) { 
                    if(pets.enerji > 0){
                        if(petA) hasar = {hasar:(hasar.hasar+(randomSayi(petA.hasar[0],petA.hasar[1])))};
                        db.set(`pet.${message.guild.id}.${message.author.id}.${pets}`,{...pets,enerki:(pets.enerji-1)}); 
                    }
                }
            }
            if(hasar.hasar != 0 && hasar.hasar != "Tutmadı") canU = db.set(`user.${message.guild.id}.${user.id}.can`,canU-(hasar.hasar+güçU));
            if(canU <= 0){
                db.set(`user.${message.guild.id}.${user.id}.can`,1);
                embed.setDescription(`${message.author.username} Kazandı!`);
                await i.update({embeds:[embed],components:[]}).catch(err =>{});
                db.set(`savaş.${message.guild.id}.${message.author.id}`,false);
                db.set(`savaş.${message.guild.id}.${user.id}`,false);
                db.add(`basarimlar.${message.guild.id}.${message.author.id}.pvp`,1);

                collectorUser.stop();
                collectorAuthor.stop();
            }else{
                embed.setDescription(`${message.author.username}; \nVerdiği Hasar: ${hasar.hasar} \n\n${user.username} Kalan Can: ${canU.toFixed(1)} \n\nSıra ${user.username}'a Geçti`);
                await i.update({embeds:[embed],components:[row]}).catch(err =>{});
            }

        }
    });

    const filterU = (i) => {
        return i.customId.endsWith((rndm-1)) && i.user.id === user.id;
    };    
    const collectorUser = message.channel.createMessageComponentCollector({ filter:filterU, time: 640000 });
    collectorUser.on('collect', async i => {
        if(i.customId == "kaç-"+(rndm-1)){
            let durum = hHesap(40,[10,11]);
            if(durum.hasar == 0){ 
                row.setComponents(new Discord.MessageButton().setCustomId('saldırUser-'+(rndm-1)).setLabel('Kuşandığın Silahla Vur').setStyle('PRIMARY'))
                tekrarA = 0;
                if(tekrarA >= 2){
                    row.addComponents(new Discord.MessageButton().setCustomId('kaç-'+(rndm+1)).setLabel(message.author.username+' Kaçmayı Dene').setStyle('PRIMARY'));
                }
                await i.update({content:`Kaçamadın`,components:[row]}).catch(err => {});
            }else{
                await i.update({content:`Kaçmayı Başardın!`,embeds:[],components:[]}).catch(err => {});
                db.delete(`savaş.${message.guild.id}.${message.author.id}`);
                db.delete(`savaş.${message.guild.id}.${user.id}`);
                collectorUser.stop();
                collectorAuthor.stop();
            }
        }
        if(i.customId == "kabulet-"+(rndm-1)){
            let savaşA = db.get(`savaş.${message.guild.id}.${message.author.id}`) || false;
            if(savaşA) return await i.update({content:"Savaşınız bittikten sonra tekrar deneyin. \n"+savaşA,embeds:[],components:[]}).catch(err => {});
            let savaşU = db.get(`savaş.${message.guild.id}.${user.id}`) || false;
            if(savaşU) return await i.update({content:"Kişinin bir savaşı var. \n"+savaşU,embeds:[],components:[]}).catch(err => {});
            let sv = db.get(`savaş.${message.guild.id}.${message.author.id}`) || false;
            let sv2 = db.get(`savaş.${message.guild.id}.${message.author.id}`) || false;

            if(sv == false || sv2 == false) {
                db.set(`savaş.${message.guild.id}.${user.id}`,`https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`);
                db.set(`savaş.${message.guild.id}.${message.author.id}`,`https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`);
            }   
            if(silahA.özellik.mermi){
                let en = db.get(`envanter.${message.guild.id}.${message.author.id}`) || [];
                let mermi = en.find(a => a.id == silahA.özellik.mermi);
                if(!mermi || mermi.adet <= 0) {
                    db.delete(`savaş.${message.guild.id}.${message.author.id}`);
                    db.delete(`savaş.${message.guild.id}.${user.id}`);
                    return await i.update({content:message.author.username+" Mermin Yok!",embeds:[],components:[]}).catch(err =>{});
                }else{
                    db.pull(`envanter.${message.guild.id}.${message.author.id}`,mermi.id,"id");
                    db.push(`envanter.${message.guild.id}.${message.author.id}`,{...mermi,adet:parseInt(mermi.adet-1)});
                }
            }
            if(silahU.özellik.mermi){
                let en = db.get(`envanter.${message.guild.id}.${user.id}`) || [];
                let mermi = en.find(a => a.id == silahU.özellik.mermi);
                if(!mermi || mermi.adet <= 0) {
                    db.delete(`savaş.${message.guild.id}.${message.author.id}`);
                    db.delete(`savaş.${message.guild.id}.${user.id}`);
                    return await i.update({content:user.username+" Kullanıcısının Mermisi Yok!",embeds:[],components:[]}).catch(err =>{});
                }else{
                    db.pull(`envanter.${message.guild.id}.${user.id}`,mermi.id,"id");
                    db.push(`envanter.${message.guild.id}.${user.id}`,{...mermi,adet:parseInt(mermi.adet-1)});
                }
                
            }
                
            row.setComponents(new Discord.MessageButton().setCustomId('saldırUser-'+(rndm-1)).setLabel('Kuşandığın Silahla Vur').setStyle('PRIMARY'));
            
            embed.setDescription(`Sıra ${user.username}'da. \nButonlara basarak saldırabilir yada kaçabilirsin.`);
            await i.update({embeds:[embed],components:[row]}).catch(err =>{});

        }
        if(i.customId == "reddet-"+(rndm-1)){         
            embed.setDescription(`Teklif Reddedildi`)   
            await i.update({embeds:[embed],components:[]}).catch(err =>{});
            db.delete(`savaş.${message.guild.id}.${message.author.id}`);
            db.delete(`savaş.${message.guild.id}.${user.id}`);
            collectorUser.stop();
            collectorAuthor.stop();
        }
        if(i.customId == "saldırUser-"+(rndm-1)){
            tekrarU++;
            row.setComponents(new Discord.MessageButton().setCustomId('saldırAuthor-'+(rndm+1)).setLabel('Kuşandığın Silahla Vur').setStyle('PRIMARY'));
            if(tekrarU >= 2){
                row.setComponents(new Discord.MessageButton().setCustomId('saldırAuthor-'+(rndm+1)).setLabel('Kuşandığın Silahla Vur').setStyle('PRIMARY'))
                row.addComponents(new Discord.MessageButton().setCustomId('kaç-'+(rndm+1)).setLabel(message.author.username+' Kaçmayı Dene').setStyle('PRIMARY'));
            }
            let hasar = hHesap(silahU.özellik.tutturma,silahU.özellik.hasar);
            if(zırhA) hasar = {hasar:hasar.hasar-((hasar.hasar/100)*zırh.özellik.hasar)}; 
            if(hasar.hasar == 0) hasar = {hasar: "Tutmadı"};

            let pets = db.get(`pet.${message.guild.id}.${user.id}`) || [];
            pets = pets.findIndex(a => a.takılı == true);
            pets = db.get(`pet.${message.guild.id}.${user.id}.${pets}`) || false;
            if(hasar.hasar != 0 && hasar.hasar != "Tutmadı"){
                if(pets) { 
                    if(pets.enerji > 0){
                        if(petU) hasar = {hasar:(hasar.hasar+(randomSayi(petU.hasar[0],petU.hasar[1])))};
                        db.set(`pet.${message.guild.id}.${user.id}.${pets}`,{...pets,enerki:(pets.enerji-1)}); 
                    }
                }
            }

            if(hasar.hasar != 0 && hasar.hasar != "Tutmadı") canA = db.set(`user.${message.guild.id}.${message.author.id}.can`,canA-(hasar.hasar+güçA));
            if(canA <= 0){
                db.set(`user.${message.guild.id}.${message.author.id}.can`,1);
                embed.setDescription(`${user.username} Kazandı!`);
                db.delete(`savaş.${message.guild.id}.${message.author.id}`);
                db.delete(`savaş.${message.guild.id}.${user.id}`);
                db.add(`basarimlar.${message.guild.id}.${user.id}.pvp`,1);

                await i.update({embeds:[embed],components:[]}).catch(err =>{});
                collectorUser.stop();
                collectorAuthor.stop();
            }else{
                embed.setDescription(`${user.username}; \nVerdiği Hasar: ${hasar.hasar} \n\n${message.author.username} Kalan Can: ${canA.toFixed(1)} \n\nSıra ${message.author.username}'a Geçti`);
                
                await i.update({embeds:[embed],components:[row]}).catch(err =>{});
            }

        }
    });
    collectorAuthor.on("end", async (i) =>{
        db.delete(`savaş.${message.guild.id}.${message.author.id}`);
        db.delete(`savaş.${message.guild.id}.${user.id}`);
    });
    collectorUser.on("end", async (i) =>{
        db.delete(`savaş.${message.guild.id}.${message.author.id}`);
        db.delete(`savaş.${message.guild.id}.${user.id}`);
    });

};


exports.conf = {
    enabled: true,
    dm:false,
    name: "saldır",
    aliases: ["pvp"],
};

