const Discord = require("discord.js");
const veriler = require("../../veriler.json");
const config = require("../../vezalan.json");
const data = require("all.db");
const db = new data();


exports.run = async(client,message,args) =>{
    if (!config.owners.includes(message.author.id) && !message.member.roles.cache.has(`${config.yetkili.kurucu}`) && !message.member.roles.cache.has(`${config.yetkili.yönetici}`) && !message.member.roles.cache.has(`${config.yetkili.moderatör}`) && !message.member.roles.cache.has(`${config.yetkili.rm}`) && !message.member.roles.cache.has(`${config.yetkili.kılavuz}`)) return message.reply({content: "Bu komutu kullanacak yetkin bulunmamakta.",allowedMentions: {repliedUser: false}});
    let user;
    if (args[0] && isNaN(args[0])) user = message.mentions.users.first()
    if (args[0] && !isNaN(args[0])) {
        user = client.users.cache.get(args[0])
        if (!message.guild.members.cache.has(args[0])) return message.reply({content: "Kullanıcı bulunamadı.",allowedMentions: {repliedUser: false}});
    }
    if (!user) return message.reply({content: "Birini etiketle.",allowedMentions: {repliedUser: false}});
    function extension(attachment) {
        let imageLink = attachment.split('.');
        let typeOfImage = imageLink[imageLink.length - 1];
        let image = /(jpg|jpeg|png|gif)/gi.test(typeOfImage);
        if (!image) return '';
        return attachment;
    }
    let image = message.attachments.size > 0 ? await extension(message.attachments.map(a => a)[0].url) : '';
    if(!image) return message.reply('**+** butonuna tıklayarak bir resim seç, açıklama kısmındayken bu komutu kullan.');
    db.set(`görünüm.${message.guild.id}.${user.id}`, {url: image, ekleyen: message.author.id})
    const embed = new Discord.MessageEmbed()
    .setFooter({text: `Daha İyi Bir Roleplay Adına Sizler İçin`, iconURL: `${message.author.avatarURL({dynamic: true})}`})
    .setAuthor({name: `The Walking Dead Roleplay`, iconURL: `${message.guild.iconURL({dynamic: true})}`})
    .setColor("000001")
    .setDescription(`<@!${user.id}> adlı kullanıcının görüntüsü <@${message.author.id}> tarafından eklendi.`)
    .setImage(`${image}`)
    message.reply({embeds: [embed],allowedMentions: {repliedUser: false}});
};


exports.conf = {
    enabled: true,
    dm:false,
    name: "ge",
    aliases: [],
};