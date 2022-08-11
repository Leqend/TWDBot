const Discord = require("discord.js");

const data = require("all.db");
const db = new data();

exports.run = async(client,message,args) =>{
    function sayfaa1() {
        let sayfa1 = [
            {ulke: "Amerikan", rolId: "953963617219395634"},
            {ulke: "Afro-Amerikan", rolId: "953967197171113984"},
            {ulke: "Latin Amerikan", rolId: "953963648940904458"},
            {ulke: "Kanadalı", rolId: "953967794972663848"}
        ]
        let sayfas1 = ["amerikan", "afro-amerikan", "latin-amerikan", "kanadalı"]
        const sa1row = new Discord.MessageActionRow();
        let sa1a = 0;
        let sa1msg = "";
        let sa1aa = -1;
        sayfas1.forEach(z => {
            sa1a++;
            sa1aa++;
            sa1msg += `\`${sa1a})\` **${sayfa1[sa1aa].ulke}**\n`
            sa1row.addComponents(new Discord.MessageButton().setCustomId(`${z}`).setLabel(`${sa1a}`).setStyle("PRIMARY"))
        })
        sa1row.addComponents(new Discord.MessageButton().setCustomId(`sayfa2`).setLabel("➡️").setStyle("PRIMARY"))
        const saaa1 = new Discord.MessageEmbed()
            .setFooter({text: `Daha İyi Bir Roleplay Adına Sizler İçin`, iconURL: `${message.author.avatarURL({dynamic: true})}`})
            .setAuthor({name: `The Walking Dead Roleplay`, iconURL: `${message.guild.iconURL({dynamic: true})}`})
            .setColor("000001")
            .setImage("https://i.pinimg.com/originals/b0/e6/0b/b0e60baf810e44c753d0d595f0168874.gif")
            .addField("✨ Karakter Yaratma Ekranındasın! ✨", `◽ | ${message.author} Karakter yaratma ekranına hoş geldin! Burada karakterinin bazı özelliklerini seçeceksin. Tercihini yapmak için belirlediğin şıkkın başında yer alan sayıya tıkla!\n\n◽ | Seçimini yaparken acele et çünkü bu paneldeki butonların geçerliliğinin bir süresi var! Butonlar geçerliliğini yitirirse telaşlanma! Komutu tekrardan gir!\n\n\n[𝐒𝐨𝐫𝐮 𝟏/𝟒]\n📝 | Karakterinizin ırkı hangi ülkeye dayanıyor?\n\n${sa1msg}\n\n\`❓ | İstediğin köken burada yok mu? Korkma, lütfen diğer sayfadaki ülkelere de bak! Diğer sayfalara geçiş sağlamak için yön tuşu butonuna basabilirsin.\``)
        message.reply({embeds:[saaa1], components: [sa1row],allowedMentions: {repliedUser: false}});
        const filter = (i) => {return i.user.id === message.author.id;};
        const collector = message.channel.createMessageComponentCollector({ filter:filter, time: 10000 });
        collector.on('collect', async z => {
            if (z.customId === "amerikan") {
                message.member.roles.add("953963617219395634")
                cinsiyet()
                db.set(`ülke.${message.guild.id}.${message.author.id}`, {tur:"Amerika", rol: "953963617219395634"})
                db.set(`seçimler.${message.guild.id}.${message.author.id}`, "ülke")
                z.message.delete();
                collector.stop();
                z.deferUpdate(); 
            } else if (z.customId === "afro-amerikan") {
                message.member.roles.add("953967197171113984")
                cinsiyet()
                db.set(`ülke.${message.guild.id}.${message.author.id}`, {tur:"Afro-Amerika", rol: "953967197171113984"})
                db.set(`seçimler.${message.guild.id}.${message.author.id}`, "ülke")
                z.message.delete();
                collector.stop();
                z.deferUpdate(); 
            } else if (z.customId === "latin-amerikan") {
                message.member.roles.add("953963648940904458")
                cinsiyet()
                db.set(`ülke.${message.guild.id}.${message.author.id}`, {tur:"Latin Amerika", rol: "953963648940904458"})
                db.set(`seçimler.${message.guild.id}.${message.author.id}`, "ülke")
                z.message.delete();
                collector.stop();
                z.deferUpdate(); 
            } else if (z.customId === "kanadalı") {
                message.member.roles.add("953967794972663848")
                cinsiyet()
                db.set(`ülke.${message.guild.id}.${message.author.id}`, {tur:"Kanadalı", rol: "953967794972663848"})
                db.set(`seçimler.${message.guild.id}.${message.author.id}`, "ülke")
                z.message.delete();
                collector.stop();
                z.deferUpdate(); 
            } else if (z.customId === "sayfa2") {
                sayfaa2();
                z.message.delete();
                collector.stop();
                z.deferUpdate(); 
            } else return;
        });
    }
    function sayfaa2() {
        let sayfa2 = [
            {ulke: "Rus", rolId: "953963632792834069"},
            {ulke: "İngiliz", rolId: "953963636160860211"},
            {ulke: "Fransız", rolId: "953963639189172225"},
            {ulke: "İtalyan", rolId: "953963642443931748"}
        ]
        let sayfas2 = ["rus", "ingiliz", "fransız", "italyan"]
        const sa2row = new Discord.MessageActionRow();
        let sa2a = 0;
        let sa2msg = "";
        let sa2aa = -1;
        sayfas2.forEach(z => {
            sa2a++;
            sa2aa++;
            sa2msg += `\`${sa2a})\` **${sayfa2[sa2aa].ulke}**\n`
            sa2row.addComponents(new Discord.MessageButton().setCustomId(`${z}`).setLabel(`${sa2a}`).setStyle("PRIMARY"))
        })
        sa2row.addComponents(new Discord.MessageButton().setCustomId(`sayfa3`).setLabel("➡️").setStyle("PRIMARY"))
        const saaa2 = new Discord.MessageEmbed()
        .setFooter({text: `Daha İyi Bir Roleplay Adına Sizler İçin`, iconURL: `${message.author.avatarURL({dynamic: true})}`})
        .setAuthor({name: `The Walking Dead Roleplay`, iconURL: `${message.guild.iconURL({dynamic: true})}`})
        .setColor("000001")
        .setImage("https://i.pinimg.com/originals/b0/e6/0b/b0e60baf810e44c753d0d595f0168874.gif")
        .addField("✨ Karakter Yaratma Ekranındasın! ✨", `◽ | ${message.author} Karakter yaratma ekranına hoş geldin! Burada karakterinin bazı özelliklerini seçeceksin. Tercihini yapmak için belirlediğin şıkkın başında yer alan sayıya tıkla!\n\n◽ | Seçimini yaparken acele et çünkü bu paneldeki butonların geçerliliğinin bir süresi var! Butonlar geçerliliğini yitirirse telaşlanma! Komutu tekrardan gir!\n\n\n[𝐒𝐨𝐫𝐮 𝟏/𝟒]\n📝 | Karakterinizin ırkı hangi ülkeye dayanıyor?\n\n${sa2msg}\n\n\`❓ | İstediğin köken burada yok mu? Korkma, lütfen diğer sayfadaki ülkelere de bak! Diğer sayfalara geçiş sağlamak için yön tuşu butonuna basabilirsin.\``)
        message.reply({embeds:[saaa2], components: [sa2row],allowedMentions: {repliedUser: false}});
        const filter = (i) => {return i.user.id === message.author.id;};
        const collector = message.channel.createMessageComponentCollector({ filter:filter, time: 10000 });
        collector.on('collect', async z => {
            if (z.customId === "rus") {
                message.member.roles.add("953963632792834069")
                cinsiyet()
                db.set(`ülke.${message.guild.id}.${message.author.id}`, {tur:"Rus", rol: "953963632792834069"})
                db.set(`seçimler.${message.guild.id}.${message.author.id}`, "ülke")
                z.message.delete();
                collector.stop();
                z.deferUpdate(); 
            } else if (z.customId === "ingiliz") {
                message.member.roles.add("953963636160860211")
                cinsiyet()
                db.set(`ülke.${message.guild.id}.${message.author.id}`, {tur:"İngiliz", rol: "953963636160860211"})
                db.set(`seçimler.${message.guild.id}.${message.author.id}`, "ülke")
                z.message.delete();
                collector.stop();
                z.deferUpdate(); 
            } else if (z.customId === "fransız") {
                message.member.roles.add("953963639189172225")
                cinsiyet()
                db.set(`ülke.${message.guild.id}.${message.author.id}`, {tur:"Fransız", rol: "953963639189172225"})
                db.set(`seçimler.${message.guild.id}.${message.author.id}`, "ülke")
                z.message.delete();
                collector.stop();
                z.deferUpdate(); 
            } else if (z.customId === "italyan") {
                message.member.roles.add("953963642443931748")
                cinsiyet()
                db.set(`ülke.${message.guild.id}.${message.author.id}`, {tur:"İtalyan", rol: "953963642443931748"})
                db.set(`seçimler.${message.guild.id}.${message.author.id}`, "ülke")
                z.message.delete();
                collector.stop();
                z.deferUpdate(); 
            } else if (z.customId === "sayfa3") {
                sayfaa3();
                z.message.delete();
                collector.stop();
                z.deferUpdate(); 
            } else return;
        });
    }
    function sayfaa3() {
        let sayfa3 = [
            {ulke: "İspanyol", rolId: "953963646625660989"},
            {ulke: "Çinli", rolId: "953963651063218217"},
            {ulke: "Japon", rolId: "953963653059706900"},
            {ulke: "Koreli", rolId: "953963654473216031"}
        ]
        let sayfas3 = ["ispanyol", "çinli", "japon", "koreli"]
        const sa3row = new Discord.MessageActionRow();
        let sa3a = 0;
        let sa3msg = "";
        let sa3aa = -1;
        sayfas3.forEach(z => {
            sa3a++;
            sa3aa++;
            sa3msg += `\`${sa3a})\` **${sayfa3[sa3aa].ulke}**\n`
            sa3row.addComponents(new Discord.MessageButton().setCustomId(`${z}`).setLabel(`${sa3a}`).setStyle("PRIMARY"))
        })
        sa3row.addComponents(new Discord.MessageButton().setCustomId(`sayfa4`).setLabel("➡️").setStyle("PRIMARY"))
        const saaa3 = new Discord.MessageEmbed()
        .setFooter({text: `Daha İyi Bir Roleplay Adına Sizler İçin`, iconURL: `${message.author.avatarURL({dynamic: true})}`})
        .setAuthor({name: `The Walking Dead Roleplay`, iconURL: `${message.guild.iconURL({dynamic: true})}`})
        .setColor("000001")
        .setImage("https://i.pinimg.com/originals/b0/e6/0b/b0e60baf810e44c753d0d595f0168874.gif")
        .addField("✨ Karakter Yaratma Ekranındasın! ✨", `◽ | ${message.author} Karakter yaratma ekranına hoş geldin! Burada karakterinin bazı özelliklerini seçeceksin. Tercihini yapmak için belirlediğin şıkkın başında yer alan sayıya tıkla!\n\n◽ | Seçimini yaparken acele et çünkü bu paneldeki butonların geçerliliğinin bir süresi var! Butonlar geçerliliğini yitirirse telaşlanma! Komutu tekrardan gir!\n\n\n[𝐒𝐨𝐫𝐮 𝟏/𝟒]\n📝 | Karakterinizin ırkı hangi ülkeye dayanıyor?\n\n${sa3msg}\n\n\`❓ | İstediğin köken burada yok mu? Korkma, lütfen diğer sayfadaki ülkelere de bak! Diğer sayfalara geçiş sağlamak için yön tuşu butonuna basabilirsin.\``)
        message.reply({embeds:[saaa3], components: [sa3row],allowedMentions: {repliedUser: false}});
        const filter = (i) => {return i.user.id === message.author.id;};
        const collector = message.channel.createMessageComponentCollector({ filter:filter, time: 10000 });
        collector.on('collect', async z => {
            if (z.customId === "ispanyol") {
                message.member.roles.add("953963646625660989")
                cinsiyet()
                db.set(`ülke.${message.guild.id}.${message.author.id}`, {tur:"İspanyol", rol: "953963646625660989"})
                db.set(`seçimler.${message.guild.id}.${message.author.id}`, "ülke")
                z.message.delete();
                collector.stop();
                z.deferUpdate(); 
            } else if (z.customId === "çinli") {
                message.member.roles.add("953963651063218217")
                cinsiyet()
                db.set(`ülke.${message.guild.id}.${message.author.id}`, {tur:"Çinli", rol: "953963651063218217"})
                db.set(`seçimler.${message.guild.id}.${message.author.id}`, "ülke")
                z.message.delete();
                collector.stop();
                z.deferUpdate(); 
            } else if (z.customId === "japon") {
                message.member.roles.add("953963653059706900")
                cinsiyet()
                db.set(`ülke.${message.guild.id}.${message.author.id}`, {tur:"Japon", rol: "953963653059706900"})
                db.set(`seçimler.${message.guild.id}.${message.author.id}`, "ülke")
                z.message.delete();
                collector.stop();
                z.deferUpdate(); 
            } else if (z.customId === "koreli") {
                message.member.roles.add("953963654473216031")
                cinsiyet()
                db.set(`ülke.${message.guild.id}.${message.author.id}`, {tur:"Koreli", rol: "953963654473216031"})
                db.set(`seçimler.${message.guild.id}.${message.author.id}`, "ülke")
                z.message.delete();
                collector.stop();
                z.deferUpdate(); 
            } else if (z.customId === "sayfa4") {
                sayfaa4();
                z.message.delete();
                collector.stop();
                z.deferUpdate(); 
            } else return;
        });
    }
    function sayfaa4() {
        let sayfa4 = [
            {ulke: "Arap", rolId: "953966495870877766"},
            {ulke: "Alman", rolId: "953966504402092092"}
        ]
        let sayfas4 = ["arap", "alman"]
        const sa4row = new Discord.MessageActionRow();
        let sa4a = 0;
        let sa4msg = "";
        let sa4aa = -1;
        sayfas4.forEach(z => {
            sa4a++;
            sa4aa++;
            sa4msg += `\`${sa4a})\` **${sayfa4[sa4aa].ulke}**\n`
            sa4row.addComponents(new Discord.MessageButton().setCustomId(`${z}`).setLabel(`${sa4a}`).setStyle("PRIMARY"))
        })
        sa4row.addComponents(new Discord.MessageButton().setCustomId(`sayfa1`).setLabel("➡️").setStyle("PRIMARY"))
        const saaa4 = new Discord.MessageEmbed()
        .setFooter({text: `Daha İyi Bir Roleplay Adına Sizler İçin`, iconURL: `${message.author.avatarURL({dynamic: true})}`})
        .setAuthor({name: `The Walking Dead Roleplay`, iconURL: `${message.guild.iconURL({dynamic: true})}`})
        .setColor("000001")
        .setImage("https://i.pinimg.com/originals/b0/e6/0b/b0e60baf810e44c753d0d595f0168874.gif")
        .addField("✨ Karakter Yaratma Ekranındasın! ✨", `◽ | ${message.author} Karakter yaratma ekranına hoş geldin! Burada karakterinin bazı özelliklerini seçeceksin. Tercihini yapmak için belirlediğin şıkkın başında yer alan sayıya tıkla!\n\n◽ | Seçimini yaparken acele et çünkü bu paneldeki butonların geçerliliğinin bir süresi var! Butonlar geçerliliğini yitirirse telaşlanma! Komutu tekrardan gir!\n\n\n[𝐒𝐨𝐫𝐮 𝟏/𝟒]\n📝 | Karakterinizin ırkı hangi ülkeye dayanıyor?\n\n${sa4msg}\n\n\`❓ | İstediğin köken burada yok mu? Korkma, lütfen diğer sayfadaki ülkelere de bak! Diğer sayfalara geçiş sağlamak için yön tuşu butonuna basabilirsin.\``)
        message.reply({embeds:[saaa4], components: [sa4row],allowedMentions: {repliedUser: false}});
        const filter = (i) => {return i.user.id === message.author.id;};
        const collector = message.channel.createMessageComponentCollector({ filter:filter, time: 10000 });
        collector.on('collect', async z => {
            if (z.customId === "arap") {
                message.member.roles.add("953966495870877766")
                cinsiyet()
                db.set(`ülke.${message.guild.id}.${message.author.id}`, {tur:"Arap", rol: "953966495870877766"})
                db.set(`seçimler.${message.guild.id}.${message.author.id}`, "ülke")
                z.message.delete();
                collector.stop();
                z.deferUpdate(); 
            } else if (z.customId === "alman") {
                message.member.roles.add("953966504402092092")
                cinsiyet()
                db.set(`ülke.${message.guild.id}.${message.author.id}`, {tur:"Alman", rol: "953966504402092092"})
                db.set(`seçimler.${message.guild.id}.${message.author.id}`, "ülke")
                z.message.delete();
                collector.stop();
                z.deferUpdate(); 
            } else if (z.customId === "sayfa1") {
                sayfaa1();
                z.message.delete();
                collector.stop();
                z.deferUpdate(); 
            } else return;
        });
    }
    function cinsiyet() {
        let sayfa4 = [
            {ulke: "Erkek", rolId: "954436461623652374"},
            {ulke: "Kadın", rolId: "954436462500282499"}
        ]
        let sayfas4 = ["adam", "karı"]
        const sa4row = new Discord.MessageActionRow();
        let sa4a = 0;
        let sa4msg = "";
        let sa4aa = -1;
        sayfas4.forEach(z => {
            sa4a++;
            sa4aa++;
            sa4msg += `\`${sa4a})\` **${sayfa4[sa4aa].ulke}**\n`
            sa4row.addComponents(new Discord.MessageButton().setCustomId(`${z}`).setLabel(`${sa4a}`).setStyle("PRIMARY"))
        })
        const saaa4 = new Discord.MessageEmbed()
            .setFooter({text: `Daha İyi Bir Roleplay Adına Sizler İçin`, iconURL: `${message.author.avatarURL({dynamic: true})}`})
            .setAuthor({name: `The Walking Dead Roleplay`, iconURL: `${message.guild.iconURL({dynamic: true})}`})
            .setColor("000001")
            .setImage("https://pa1.narvii.com/6491/b4ca6b37aedb745bd36de844d1dcb661f5c6d976_hq.gif")
            .addField("✨ Karakter Yaratma Ekranındasın! ✨", `🔸 | ${message.author} başarıyla karakterinin kökenini seçtin. Şimdiyse sırada karakterinin cinsiyetini belirlemek var. Alta yazdığımız tüyoları okuyorsun, değil mi?\n\n\n[𝐒𝐨𝐫𝐮 𝟐/𝟒]\n📝 | Karakterinizin cinsiyeti nedir?\n\n${sa4msg}\n\n\`❗ | Fikrini değiştirdin ve seçimlerini baştan mı yapmak istiyorsun? Tüm seçimlerini yaptıktan sonra komutu tekrardan girerek kaydın tamamlanmadığı sürece tercihlerini baştan yapabilirsin.\``)
        message.reply({embeds:[saaa4], components: [sa4row],allowedMentions: {repliedUser: false}});
        const filter = (i) => {return i.user.id === message.author.id;};
        const collector = message.channel.createMessageComponentCollector({ filter:filter, time: 10000 });
        collector.on('collect', async z => {
            if (z.customId === "adam") {
                message.member.roles.add("954436461623652374")
                inanc1()
                db.set(`cinsiyet.${message.guild.id}.${message.author.id}`, {tur:"Erkek", rol: "954436461623652374"})
                db.set(`seçimler.${message.guild.id}.${message.author.id}`, "cinsiyet")
                z.message.delete();
                collector.stop();
                z.deferUpdate(); 
            } else if (z.customId === "karı") {
                message.member.roles.add("954436462500282499")
                inanc1()
                db.set(`cinsiyet.${message.guild.id}.${message.author.id}`, {tur:"Kadın", rol: "954436462500282499"})
                db.set(`seçimler.${message.guild.id}.${message.author.id}`, "cinsiyet")
                z.message.delete();
                collector.stop();
                z.deferUpdate(); 
            } else return;
        });
    }
    function inanc1() {
        let sayfa3 = [
            {ulke: "Müslüman", rolId: "954436464878432326"},
            {ulke: "Hristiyan", rolId: "954436465046216705"},
            {ulke: "Budist", rolId: "954437354725187584"},
            {ulke: "Yahudi", rolId: "954437358311321600"}
        ]
        let sayfas3 = ["müslüman", "hristiyan", "budist", "yahudi"]
        const sa3row = new Discord.MessageActionRow();
        let sa3a = 0;
        let sa3msg = "";
        let sa3aa = -1;
        sayfas3.forEach(z => {
            sa3a++;
            sa3aa++;
            sa3msg += `\`${sa3a})\` **${sayfa3[sa3aa].ulke}**\n`
            sa3row.addComponents(new Discord.MessageButton().setCustomId(`${z}`).setLabel(`${sa3a}`).setStyle("PRIMARY"))
        })
        sa3row.addComponents(new Discord.MessageButton().setCustomId(`sayfa4`).setLabel("➡️").setStyle("PRIMARY"))
        const saaa3 = new Discord.MessageEmbed()
            .setFooter({text: `Daha İyi Bir Roleplay Adına Sizler İçin`, iconURL: `${message.author.avatarURL({dynamic: true})}`})
            .setAuthor({name: `The Walking Dead Roleplay`, iconURL: `${message.guild.iconURL({dynamic: true})}`})
            .setColor("000001")
            .addField("✨ Karakter Yaratma Ekranındasın! ✨", `🟡 | ${message.author} başarıyla karakterinin cinsiyetini belirledin. Şu anki adımımızsa karakterinin dini inancını belirlemek olacak. Özellikle her kullanıcının gerçekleştirmek istediği rolü rahatlıkla yapabilmesi adına yelpazemizi geniş tuttuk.\n\n🟡 | Karakterinin inancı ne olursa olsun, bu inanca ölümüne bağlı olmak zorunda olmadığını bilmeni isteriz.\n\n\n[𝐒𝐨𝐫𝐮 𝟑/𝟒]\n📝 | Karakterinizin kabul gördüğü dini görüş nedir?\n\n${sa3msg}\n\n\`❓ | İstediğin din burada yok mu? Korkma, lütfen diğer sayfadaki inançlara da bak! Diğer sayfalara geçiş sağlamak için yön tuşu butonuna basabilirsin.\``)
            .setImage("https://31.media.tumblr.com/4e52ac3c11ee6a3c63d84c10db35f5b9/tumblr_n9e1b1eAsW1tv5ikso2_500.gif")
        message.reply({embeds:[saaa3], components: [sa3row],allowedMentions: {repliedUser: false}});
        const filter = (i) => {return i.user.id === message.author.id;};
        const collector = message.channel.createMessageComponentCollector({ filter:filter, time: 10000 });
        collector.on('collect', async z => {
            if (z.customId === "müslüman") {
                message.member.roles.add("954436464878432326")
                db.set(`inanc.${message.guild.id}.${message.author.id}`, {tur:"Müslüman", rol: "954436464878432326"})
                db.set(`seçimler.${message.guild.id}.${message.author.id}`, "yönelim")
                yönelim();
                z.message.delete();
                collector.stop();
                z.deferUpdate(); 
            } else if (z.customId === "hristiyan") {
                message.member.roles.add("954436465046216705")
                db.set(`inanc.${message.guild.id}.${message.author.id}`, {tur:"Hristiyan", rol: "954436465046216705"})
                db.set(`seçimler.${message.guild.id}.${message.author.id}`, "yönelim")
                yönelim();
                z.message.delete();
                collector.stop();
                z.deferUpdate(); 
            } else if (z.customId === "budist") {
                message.member.roles.add("954437354725187584")
                db.set(`inanc.${message.guild.id}.${message.author.id}`, {tur:"Budist", rol: "954437354725187584"})
                db.set(`seçimler.${message.guild.id}.${message.author.id}`, "yönelim")
                yönelim();
                z.message.delete();
                collector.stop();
                z.deferUpdate(); 
            } else if (z.customId === "yahudi") {
                message.member.roles.add("954437358311321600")
                db.set(`inanc.${message.guild.id}.${message.author.id}`, {tur:"Yahudi", rol: "954437358311321600"})
                db.set(`seçimler.${message.guild.id}.${message.author.id}`, "yönelim")
                yönelim();
                z.message.delete();
                collector.stop();
                z.deferUpdate(); 
            } else if (z.customId === "sayfa4") {
                inanc2();
                z.message.delete();
                collector.stop();
                z.deferUpdate(); 
            } else return;
        });
    }
    function inanc2() {
        let sayfa3 = [
            {ulke: "Şintoist", rolId: "954437356860084235"},
            {ulke: "Ateist", rolId: "954436464035373117"},
            {ulke: "Deist", rolId: "954439034954981426"},
            {ulke: "Agnostik", rolId: "954439031851188294"}
        ]
        let sayfas3 = ["şintoist", "ateist", "deist", "agnostik"]
        const sa3row = new Discord.MessageActionRow();
        let sa3a = 0;
        let sa3msg = "";
        let sa3aa = -1;
        sayfas3.forEach(z => {
            sa3a++;
            sa3aa++;
            sa3msg += `\`${sa3a})\` **${sayfa3[sa3aa].ulke}**\n`
            sa3row.addComponents(new Discord.MessageButton().setCustomId(`${z}`).setLabel(`${sa3a}`).setStyle("PRIMARY"))
        })
        sa3row.addComponents(new Discord.MessageButton().setCustomId(`sayfa4`).setLabel("➡️").setStyle("PRIMARY"))
        const saaa3 = new Discord.MessageEmbed()
        .setFooter({text: `Daha İyi Bir Roleplay Adına Sizler İçin`, iconURL: `${message.author.avatarURL({dynamic: true})}`})
        .setAuthor({name: `The Walking Dead Roleplay`, iconURL: `${message.guild.iconURL({dynamic: true})}`})
        .setColor("000001")
        .addField("✨ Karakter Yaratma Ekranındasın! ✨", `🟡 | ${message.author} başarıyla karakterinin cinsiyetini belirledin. Şu anki adımımızsa karakterinin dini inancını belirlemek olacak. Özellikle her kullanıcının gerçekleştirmek istediği rolü rahatlıkla yapabilmesi adına yelpazemizi geniş tuttuk.\n\n🟡 | Karakterinin inancı ne olursa olsun, bu inanca ölümüne bağlı olmak zorunda olmadığını bilmeni isteriz.\n\n\n[𝐒𝐨𝐫𝐮 𝟑/𝟒]\n📝 | Karakterinizin kabul gördüğü dini görüş nedir?\n\n${sa3msg}\n\n\`❓ | İstediğin din burada yok mu? Korkma, lütfen diğer sayfadaki inançlara da bak! Diğer sayfalara geçiş sağlamak için yön tuşu butonuna basabilirsin.\``)
        .setImage("https://31.media.tumblr.com/4e52ac3c11ee6a3c63d84c10db35f5b9/tumblr_n9e1b1eAsW1tv5ikso2_500.gif")
        message.reply({embeds:[saaa3], components: [sa3row],allowedMentions: {repliedUser: false}});
        const filter = (i) => {return i.user.id === message.author.id;};
        const collector = message.channel.createMessageComponentCollector({ filter:filter, time: 10000 });
        collector.on('collect', async z => {
            if (z.customId === "şintoist") {
                message.member.roles.add("954437356860084235")
                db.set(`inanc.${message.guild.id}.${message.author.id}`, {tur:"Şintoist", rol: "954437356860084235"})
                db.set(`seçimler.${message.guild.id}.${message.author.id}`, "yönelim")
                yönelim();
                z.message.delete();
                collector.stop();
                z.deferUpdate(); 
            } else if (z.customId === "ateist") {
                message.member.roles.add("954436464035373117")
                db.set(`inanc.${message.guild.id}.${message.author.id}`, {tur:"Ateist", rol: "954436464035373117"})
                db.set(`seçimler.${message.guild.id}.${message.author.id}`, "yönelim")
                yönelim();
                z.message.delete();
                collector.stop();
                z.deferUpdate(); 
            } else if (z.customId === "deist") {
                message.member.roles.add("954439034954981426")
                db.set(`inanc.${message.guild.id}.${message.author.id}`, {tur:"Deist", rol: "954439034954981426"})
                db.set(`seçimler.${message.guild.id}.${message.author.id}`, "yönelim")
                yönelim();
                z.message.delete();
                collector.stop();
                z.deferUpdate(); 
            } else if (z.customId === "agnostik") {
                message.member.roles.add("954439031851188294")
                db.set(`inanc.${message.guild.id}.${message.author.id}`, {tur:"Agnostik", rol: "954439031851188294"})
                db.set(`seçimler.${message.guild.id}.${message.author.id}`, "yönelim")
                yönelim();
                z.message.delete();
                collector.stop();
                z.deferUpdate(); 
            } else if (z.customId === "sayfa4") {
                inanc1();
                z.message.delete();
                collector.stop();
                z.deferUpdate(); 
            } else return;
        });
    }
    function yönelim() {
        let sayfa3 = [
            {ulke: "Heteroseksüel", rolId: "954489522048094278"},
            {ulke: "Homoseksüel", rolId: "954489537072091237"},
            {ulke: "Aseksüel", rolId: "954489542738599957"},
            {ulke: "Biseksüel", rolId: "954489540280717342"}
        ]
        let sayfas3 = ["heteroseksüel", "homoseksüel", "aseksüel", "biseksüel"]
        const sa3row = new Discord.MessageActionRow();
        let sa3a = 0;
        let sa3msg = "";
        let sa3aa = -1;
        sayfas3.forEach(z => {
            sa3a++;
            sa3aa++;
            sa3msg += `\`${sa3a})\` **${sayfa3[sa3aa].ulke}**\n`
            sa3row.addComponents(new Discord.MessageButton().setCustomId(`${z}`).setLabel(`${sa3a}`).setStyle("PRIMARY"))
        })
        const saaa3 = new Discord.MessageEmbed()
            .setFooter({text: `Daha İyi Bir Roleplay Adına Sizler İçin`, iconURL: `${message.author.avatarURL({dynamic: true})}`})
            .setAuthor({name: `The Walking Dead Roleplay`, iconURL: `${message.guild.iconURL({dynamic: true})}`})
            .setColor("000001")
            .setImage("https://i.pinimg.com/originals/75/01/f5/7501f51d607be99f9cc2c863bc08191f.gif")
            .addField("✨ Karakter Yaratma Ekranındasın! ✨", `◽ | ${message.author} başarıyla karakterinin inancını belirledin. En son adıma geldik. Şimdi karakterinin cinsel tercihini belirlemen gerekiyor. Aşk, kıyametin ortasında da filizlenir.\n\n◽ | Kullanıcıların karakterlerinin cinsel görüşleri üzerinden oyuncularımıza hakaretlerde bulunmanın yasak olduğunu aklından çıkartmamalısın.\n[𝐒𝐨𝐫𝐮 𝟒/𝟒]\n📝 | Karakteriniz cinsel tercihini ne yönde kullandı?\n\n${sa3msg}\n\n\`⚪ | Bu soruyu yanıtlamanla beraber kayıt olmak için büyük bir adamı arkanda bırakmış olacaksın! Hız kaybetmeden bir sonraki adıma geçmeni öneririz.\``)
            .setDescription(`Seçebileceğin dinleri sıraladım:\n\n${sa3msg}\n\n*\`Not:\` Devamı yan sayfadadır.*`)
        message.reply({embeds:[saaa3], components: [sa3row],allowedMentions: {repliedUser: false}});
        const filter = (i) => {return i.user.id === message.author.id;};
        const collector = message.channel.createMessageComponentCollector({ filter:filter, time: 10000 });
        collector.on('collect', async z => {
            if (z.customId === "heteroseksüel") {
                message.member.roles.add("954489522048094278")
                db.set(`yönelim.${message.guild.id}.${message.author.id}`, {tur:"Heteroseksüel", rol: "954489522048094278"})
                db.set(`seçimler.${message.guild.id}.${message.author.id}`, "bitti")
                bitti();
                z.message.delete();
                collector.stop();
                z.deferUpdate(); 
            } else if (z.customId === "homoseksüel") {
                message.member.roles.add("954489537072091237")
                db.set(`yönelim.${message.guild.id}.${message.author.id}`, {tur:"Homoseksüel", rol: "954489537072091237"})
                db.set(`seçimler.${message.guild.id}.${message.author.id}`, "bitti")
                bitti();
                z.message.delete();
                collector.stop();
                z.deferUpdate(); 
            } else if (z.customId === "aseksüel") {
                message.member.roles.add("954489542738599957")
                db.set(`yönelim.${message.guild.id}.${message.author.id}`, {tur:"Aseksüel", rol: "954489542738599957"})
                db.set(`seçimler.${message.guild.id}.${message.author.id}`, "bitti")
                bitti();
                z.message.delete();
                collector.stop();
                z.deferUpdate(); 
            } else if (z.customId === "biseksüel") {
                message.member.roles.add("954489540280717342")
                db.set(`yönelim.${message.guild.id}.${message.author.id}`, {tur:"Biseksüel", rol: "954489540280717342"})
                db.set(`seçimler.${message.guild.id}.${message.author.id}`, "bitti")
                bitti();
                z.message.delete();
                collector.stop();
                z.deferUpdate(); 
            } else return;
        });
    }
    function bitti() {
        message.reply({content: "Bitti",allowedMentions: {repliedUser: false}});
    }
    if (!message.member.roles.cache.has("726609797591334982")) return message.reply({content: "Bu komutu sadece kayıtsızlar kullanabilir.",allowedMentions: {repliedUser: false}});
    let durum = db.fetch(`seçimler.${message.guild.id}.${message.author.id}`)
    if (!durum) {
        sayfaa1()
    } else if (durum === "ülke") {
        cinsiyet()
    } else if (durum === "cinsiyet") {
        inanc1()
    } else if (durum === "yönelim") {
        yönelim()
    } else if (durum === "bitti") {
        let aas1 = db.fetch(`ülke.${message.guild.id}.${message.author.id}`)
        let aas2 = db.fetch(`cinsiyet.${message.guild.id}.${message.author.id}`)
        let aas3 = db.fetch(`inanc.${message.guild.id}.${message.author.id}`)
        let aas4 = db.fetch(`yönelim.${message.guild.id}.${message.author.id}`)
        message.member.roles.remove(aas1.rol)
        await message.member.roles.remove(aas2.rol)
        await message.member.roles.remove(aas3.rol)
        await message.member.roles.remove(aas4.rol)
        db.delete(`seçimler.${message.guild.id}.${message.author.id}`)
        db.delete(`ülke.${message.guild.id}.${message.author.id}`)
        db.delete(`cinsiyet.${message.guild.id}.${message.author.id}`)
        db.delete(`inanc.${message.guild.id}.${message.author.id}`)
        db.delete(`yönelim.${message.guild.id}.${message.author.id}`)
        sayfaa1()
    } else {
        return message.reply({content: "Bu komutu hata oluştu.",allowedMentions: {repliedUser: false}});
    }
};

exports.conf = {
    enabled: true,
    dm:false,
    name: "seçimler",
    aliases: [],
};