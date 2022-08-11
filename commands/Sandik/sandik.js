const Discord = require("discord.js");
const veriler = require("../../veriler.json");
const moment = require("moment-timezone");
const data = require("all.db");
const db = new data();
function hesaplama(array){
    return array[Math.floor(Math.random()*array.length)];;
}

function findItem(where,id){
    let item = Object.keys(veriler[where]);
    let items = [];
    item.forEach(item => {
        if(veriler[where][item].id == id) return items.push(veriler[where][item]);
    });
    return items[0];
}

exports.run = async(client,message,args) =>{
    let urun = args.slice(0).join(" ");
    if(!urun) return message.channel.send("Bir sandık ismi girmelisin!");
    let sandik = veriler.sandik[urun.toLowerCase().replaceAll(" ","-")];
    if(!sandik) return message.channel.send("Böyle bir sandık yok!");
    let san = db.get(`sandik.${message.guild.id}.${message.author.id}.${urun.toLowerCase().replaceAll(" ","-")}`);
    if(urun.toLowerCase().replaceAll(" ","-") == "yardım-sandığı"){
        let date = Date.now();
        if(san > date) {
            return message.channel.send("Sandığınız zamanı geçmemiş! \nAçılacak Süre: " + moment(san).tz("Europe/Istanbul").format("DD.MM.YYYY HH:mm:ss"));
        }
    }else {
        if(san < sandik.kelime) return message.channel.send("Yeterli Kelime Yok!");
    }

    let msg = "";
    for(let uwu=0; uwu < 5; uwu++){
        let envanter = db.get(`envanter.${message.guild.id}.${message.author.id}`) || [];
        let ürün = hesaplama(sandik.esyalar);
        ürün = findItem(ürün.tür,ürün.id);
        let uruna = envanter.find(a => a.id == ürün.id);
        if(!uruna) uruna = {adet:0};
        let veri = veriler.itemler[ürün.isim.toLowerCase().replaceAll(" ","-")];        
        if(!veri) return;
        if(envanter.length != 0) db.pull(`envanter.${message.guild.id}.${message.author.id}`,ürün.id,"id");
        db.push(`envanter.${message.guild.id}.${message.author.id}`,{...veri,yapılış:undefined,fiyat:undefined, adet:parseInt(uruna.adet)+1});
    
        if(sandik.isim.toLowerCase().replaceAll(" ","-") === "yardım-sandığı") 
        {
            db.set(`sandik.${message.guild.id}.${message.author.id}.${sandik.isim.toLowerCase().replaceAll(" ","-")}`,(Date.now()+86400000));
        }else db.set(`sandik.${message.guild.id}.${message.author.id}.${urun.toLowerCase().replaceAll(" ","-")}`,1);
        
        if(veri) msg+=`${uwu+1}) İsim: **${(veri.isim)}**\n`;
    }

    message.channel.send(`Çıkardıkların:\n ${msg}`)
    
};


exports.conf = {
    enabled: true,
    dm:false,
    name: "sandık",
    aliases: [],
};

