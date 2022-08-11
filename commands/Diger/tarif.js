const Discord = require("discord.js");
const veriler = require("../../veriler.json");

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

exports.run = async(client,message,args) =>{
    let kateler = ["aletler","bileşenler","araçlar","silah","zırh","gıda","sağlık","mermiler"];
    let ürün = args.splice(0).join(" ").replaceAll(" ","-");
    if(!ürün) return message.channel.send("Lütfen geçerli bir kategori veya item girin. \nKategoriler: "+kateler.join(", "));
    if(kateler.includes(ürün.toLowerCase())){
        msg = "";
        kateler.filter(a => a == ürün.toLowerCase()).forEach(a =>{
            let veri = [];
            if(ürün.toLowerCase() == "gıda") veri = Object.keys(veriler.itemler).filter(a => (["içecek","gıda"].includes(veriler.itemler[a].tür)) && veriler.itemler[a].yapılış.length >= 1);
                else veri = Object.keys(veriler.itemler).filter(a => veriler.itemler[a].tür == ürün.toLowerCase() && veriler.itemler[a].yapılış.length >= 1);
            
            veri.forEach(a =>{
                msg += `İsim: **${veriler.itemler[a].isim}**\n`;
            });
        });
        if(!msg) return message.channel.send("Bu kategori için yapılabilen ürün bulunamadı.");
        message.channel.send(msg);
    }else{
        msg = "1)";
        let veri = veriler.itemler[ürün.toLowerCase()];
        if(!veri) return message.channel.send("Bu ürün bulunamadı.");
        let i = 0;
        veri.yapılış.forEach(a =>{
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
            msg += `\n${i == veri.yapılış.length ? "" : `${i+1})`}`;
        });
        if(msg == "1)") return message.channel.send("Bu ürün yapılmıyor.");
        message.channel.send(msg);

    }

    
};


exports.conf = {
    enabled: true,
    dm:false,
    name: "tarif",
    aliases: [],
};