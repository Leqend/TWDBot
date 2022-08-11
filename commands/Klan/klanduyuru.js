const Discord = require("discord.js");
const data = require("all.db");
const db = new data();


exports.run = async (client, message, args) => {
  let klan = db.get(`klan.${message.guild.id}`).filter(a => a.yetkili.includes(message.author.id)) || [];
  if(!klan[0]) return message.channel.send("Bir Klan Sahibi Değilsin");
  let arg = args.slice(0).join(" ").split(/[\/]/);
  if(!arg[0]) return message.channel.send("Başlık Gir. (<Başlık> / <Metin>)");
  if(!arg[1]) return message.channel.send("Bir Yazı Gir. (<Başlık> / <Metin>)");

  const emb = new Discord.MessageEmbed()
  .setAuthor({name:message.guild.name, iconURL:message.guild.iconURL({dynamic:true})})
  .setColor("RED")
  .setTitle(`${klan[0].isim} | ${arg[0]}`)
  .setDescription(`${arg[1]}`);
  if(klan[0].amblem) emb.setThumbnail(klan[0].amblem)
  message.delete();
  let kanal = client.channels.cache.get("953405232237408297");
  kanal.send({embeds:[emb]}).catch(err =>{ message.channel.send("Duyuru Gönderilemedi!")});
} 
exports.conf = {
  enabled: true,
  dm: false,
  name: "klanduyuru",
  aliases: []
};
