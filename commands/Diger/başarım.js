const Discord = require("discord.js");

const data = require("all.db");
const db = new data();
function randomSayi(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
exports.run = async(client,message,args) =>{
    let basarimlar = db.get(`user.${message.guild.id}.${message.author.id}.basarim`) || [];
    if(basarimlar.length == 0) return message.reply("Hiç Başarım Kazanmamışsın!");
    let liste = {"1":""}; 
    let txt = "";
    let sayfalar = 1;
    basarimlar.forEach(a => {
        if(liste[sayfalar].length < 700){
            txt += `**İsim:** \`${a.isim}\` / **Tarih:** \`${a.tarih}\`\n`;
        }else {
            txt = "";
            sayfalar++;
        }
        liste[sayfalar] = txt;
    });
    const row = new Discord.MessageActionRow();
    let rndm = randomSayi(1,1000000000);
    let sayfa = 1;
    const embed = new Discord.MessageEmbed()
        .setFooter({text: `Başarımlar senin için güzelce gösterildi.`, iconURL: `${message.author.avatarURL({dynamic: true})}`})
        .setAuthor({name: `The Walking Dead Roleplay`, iconURL: `${message.guild.iconURL({dynamic: true})}`})
        .setColor("00ff00")
        .setDescription(`**Kazanılan Başarımlar**\n⠀⠀⠀⠀⠀⠀⠀\n${liste["1"]}`)
        .setThumbnail("https://cdn.discordapp.com/attachments/954100889675776080/954106319579799572/basarm.gif")
        .setTimestamp()

    const filter = (i) => {return i.user.id === message.author.id;};
    const collector = message.channel.createMessageComponentCollector({ filter:filter, time: 20000 });
    collector.on('collect', async i => {
        if(i.customId == `right-${rndm}`){
            if(liste[sayfa] && sayfa < sayfalar){
                sayfa++;
                embed.setDescription(`**Kazanılan Başarımlar**\n⠀⠀⠀⠀⠀⠀⠀\n${liste[sayfa]}`)
                i.update({embeds:[embed], allowedMentions: {repliedUser: false},components:[row]}).catch(err =>{});
            }
        }
        if(i.customId == `left-${rndm}`){
            if(liste[sayfa] && sayfa > 1){
                sayfa--;
                embed.setDescription(`**Kazanılan Başarımlar**\n⠀⠀⠀⠀⠀⠀⠀\n${liste[sayfa]}`)
                i.update({embeds:[embed], allowedMentions: {repliedUser: false},components:[row]}).catch(err =>{});
            }
        }
    });
    if(liste[sayfa+1]){
        row.addComponents(new Discord.MessageButton().setCustomId(`left-${rndm}`).setLabel(`⬅️`).setStyle('PRIMARY'));
        row.addComponents(new Discord.MessageButton().setCustomId(`right-${rndm}`).setLabel(`➡️`).setStyle('PRIMARY'));
        return message.reply({embeds:[embed], allowedMentions: {repliedUser: false},components:[row]});
    }else{
        return message.reply({embeds:[embed], allowedMentions: {repliedUser: false},components:[]});
    }
};


exports.conf = {
    enabled: true,
    dm:false,
    name: "başarımlar",
    aliases: [],
};

