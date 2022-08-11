const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    const filter = (reaction, user) => {
        return ["🏠", "💵", "🛠️", "💼", "📱"].includes(reaction.emoji.name) && user.id === message.author.id && reaction.users.remove(message.author.id);
      };
      
        const yardım = new Discord.MessageEmbed().setColor("BLUE")
        .setTitle('Yardım Menüsü')
        .setDescription(`**Ana Menü: 🏠 \n Ekonomi Komutları: 💵 \n Kayıt Komutları: 🛠️ \n Klan Komutları: 💼 \n Telefon Sistemi: 📱 **`)
       var menü = await message.channel.send({embeds:[yardım]})
       const collector = menü.createReactionCollector(filter, { time: 200000 });
        let emojiler = ["🏠", "💵", "🛠️", "💼"]
        for (i = 0; i < emojiler.length; i++) {
            await menü.react(emojiler[i])
        }
      collector.on('collect', (reaction, user) => {
        const genels = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Ekonomi Komutları")
        .addField(`!bakiye`, "Bakiyenizi Gösterir.")
        .addField(`!gelir`, "Bu komutla gelir havuzunda birikmiş olan para değerleri gözükecektir.")
        .addField(`!gelirçek`, "Bu komut girildiğinde oyuncu gelir havuzundaki bakiyenin belirlediği kadar kısmını çeker.")
        .addField(`!para-gönder`, "Belirttiğiniz kullanıcıya para gönderirsiniz.")
        .setTimestamp()
        
      if(reaction.emoji.name == "💵") {
        menü.edit({embeds:[genels]})
      }
       if(reaction.emoji.name == "🏠") {
        menü.edit({embeds:[genels]})
        }
      });
      
      
        

collector.on('collect', (reaction, user) => {
      
      
  if(reaction.emoji.name == "🛠️") {
    const denemes1 = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle("Klan Komutları")
    .addField(`!klankur`, "Oyuncunun belirli bir mevla karşılığında istediği isimde bir klan kurmasını sağlar.")
    .addField(`!klan`, "Klan hakkında genel bilgilendirme yapar. Bu bilgilendirmede klanın bilgileri gözükür.")
    .addField(`!kayıt-silme <kişi> <hikaye/özellik>`, "Belirtilen kişinin kimliğini silersiniz.")
    .setTimestamp()
    
    
    menü.edit(denemes1)
  }
  if(reaction.emoji.name == "🏠") {
    menü.edit({embeds:[genels]})
    }
});
      

 collector.on('collect', (reaction, user) => {
      
        
  if(reaction.emoji.name == "💼") {
   const denemes2 = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle("RP Komutları")
    .addField(`!kontrol `, "Envanter Kontrolü.")
    .addField(`!fiyat`, "Fiyat Listesini Gösterir.")
    .addField(`!item`, "Eşya verip almanızı sağlar")
    .addField(`!rplist`, "RP yapılan kanallar listesine bakarsınız!")
    .addField(`!vur <@kişi>`, "Birine saldırırsınız!")
    .addField(`!ye`, "Canınızı doldurursunuz!")
    .addField(`!satınal <ismi>`, "Eşya/Mülk/Hayvan/Silah/Hat/Telefon Alırsınız")
    .addField(`!git <Şehir ismi>`,`İstediğiniz şehre gidersiniz`)
    .addField(`!oylama`,`Oylama açarsınız`)
    .addField(`!başarım <ver/al/kontrol/liste>`, "Başarım komutlarını kullanırsınız!")
    .setTimestamp()
    menü.edit({embeds:[denemes2]})
 }
if(reaction.emoji.name == "🏠") {
    menü.edit({embeds:[denemes]})
 }
});


};

exports.conf = {
    enabled: true,
    dm:false,
    name: "yardım",
    aliases: [],
};
