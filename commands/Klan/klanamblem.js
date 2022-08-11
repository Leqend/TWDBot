const Discord = require("discord.js");
const data = require("all.db");
const db = new data();


exports.run = async (client, message, args) => {
  let klanlar = db.get(`klan.${message.guild.id}`);
  let klan = klanlar.filter(a => a.yetkili.includes(message.author.id)) || [];
  if(klan.length <= 0) return message.channel.send("Bir Klan Sahibi Değilsin");
  function extension(attachment) {
      let imageLink = attachment.split('.');
      let typeOfImage = imageLink[imageLink.length - 1];
      let image = /(jpg|jpeg|png|gif)/gi.test(typeOfImage);
      if (!image) return '';
      return attachment;
  }
  let image = message.attachments.size > 0 ? await extension(message.attachments.map(a => a)[0].url) : '';
  if(!image) return message.reply('**+** butonuna tıklayarak bir resim seç, açıklama kısmındayken bu komutu kullan.');
  var klanIds = klanlar.findIndex(a => a.id == parseInt(klan[0].id));
  let klans = klanlar[klanIds];
  if(!klans) return;
  db.set(`klan.${message.guild.id}.${klanIds}`, {...klan[0], amblem:image});
  const emb = new Discord.MessageEmbed()
      .setAuthor({name:message.guild.name, iconURL:message.guild.iconURL({dynamic:true})})
      .setDescription(`**Yeni Klan Resimi Ayarlandı:**`)
      .setImage(image)
  message.channel.send({embeds:[emb]})  
} 
exports.conf = {
  enabled: true,
  dm: false,
  name: "klanamblem",
  aliases: []
};
