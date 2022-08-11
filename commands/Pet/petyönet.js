const Discord = require("discord.js");
const veriler = require("../../veriler.json");
const config = require("../../vezalan.json");
const data = require("all.db");
const db = new data();


exports.run = async(client,message,args) =>{
    if(!config.owners.includes(message.author.id)) return message.channel.send("Bu komutu sadece bot sahibi kullanabilir!");
    let petisim = db.get(`petisim`) || [];

    let user = message.mentions.users.first();
    if(!user) return message.channel.send("Kullanıcıyı Etiketlemelisin!");

    let pet = args[1];
    if(!pet) return message.channel.send("Vereceğin Pet'i girmelisin!");

    let isim = args.slice(2).join(" ");
    if(!isim) return message.channel.send("Özel Pet ismini girmelisin!");
    if(petisim.includes(isim.toLowerCase())) return message.channel.send("Bu Pet ismi zaten var!");

    let veri = veriler.petler[pet.toLowerCase()]
    if(!veri) return message.channel.send("Böyle bir Pet yok!");

    db.push(`pet.${message.guild.id}.${user.id}`,{isim:isim, id:veri.id,tür:pet.toLowerCase(), level:1, yemek:0, enerji:veri.seviye[0].enerji, hasar:veri.seviye[0].hasar,takılı:false});
    db.push(`petisim`,isim.toLowerCase());

    message.channel.send(`${user.username} adlı kullanıcıya pet verildi!`);
};


exports.conf = {
    enabled: true,
    dm:false,
    name: "petyönet",
    aliases: [],
};

