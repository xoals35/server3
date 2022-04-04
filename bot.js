const { Client , Intents , Collection, MessageEmbed, User}  = require('discord.js')
const fs = require('fs')
const mongoose = require("mongoose")
const client = new Client({intents:32767})
const { Player } = require("discord-player");
const player = new Player(client);
const { token, prefix } = require('./Config/Config')
mongoose.connect("mongodb+srv://peuti:20492049ki@cluster0.oqc2t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
useNewUrlParser: true ,  useUnifiedTopology: true 
}).then(console.log("데이터베이스 연결 완료"))
module.exports = client;

client.player = new Player(client, {
    ytdlOptions: {
      quality: 'highestaudio',
      highWaterMark: 32 * 1024 * 1024
    }
  })

client.on("guildMemberAdd", async member => {
  
  const welcome = new MessageEmbed()
  .setTitle("멤버가 들어왔어요!")
  .setColor('GREEN')
  .addField('멤버이름', `${member}`)
  .addField('입장메세지', `${member}님이 ${member.guild}에 들어오셨어요!`)
  
  member.guild.channels.cache.get("952832505336172594").send({embeds:[welcome]})
})

client.on("guildMemberRemove", async member => {
  
  const welcome2 = new MessageEmbed()
  .setTitle("멤버가 퇴장했어요...")
  .setColor('RED')
  .addField('멤버이름', `${member}`)
  .addField('퇴장메세지', `${member}님이 ${member.guild}에서 나가셨어요...`)
  
  member.guild.channels.cache.get("952832505336172594").send({embeds:[welcome2]})
})

const logChannelID2 = "952832505336172594";

client.on('guildBanAdd', async ban => {
	const embed = new MessageEmbed()
	.setTitle("유저가 밴당했어요!")
	.setDescription(`${ban.user.tag}님이 ${ban.guild.name}서버에서 밴당했습니다..`)
	client.channels.cache.get(logChannelID2).send({embeds:[embed]});
});

const logChannelID3 = "952832505336172594";


client.once('ready', async ()=>{
    console.log("봇이 준비되었습니다")
    client.user.setActivity("AC서버 관리중ㅣt.help")
    
})


client.commands = new Collection()

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
} // music이라는 폴더를 만들어 주시고 그 안에 뮤직 코드들을 넣어주세여
client.on('messageCreate', (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return
  
      const args = message.content.slice(prefix.length).trim().split(/[ ]+/)
      const command = args.shift().toLowerCase()
      
  
      if (!client.commands.has(command)) return
  
      try {
          client.commands.get(command).execute(message, args, client)
      } catch (error) {
          console.error(error)
          message.reply('해당 명령을 실행하는 동안 오류가 발생했습니다!')
      }
  })


client.on('messageCreate', async message => {
    let blacklisted = ['https://'];
    let foundInText = false;
    for (var i in blacklisted) {
        if (message.content.toLowerCase().includes(blacklisted[i].toLowerCase()))
            foundInText = true;
    }


    if (foundInText) { 
        let embeds = new MessageEmbed()
        .setTitle('시스템 메시지')
        .setDescription('❌ 확실한 링크가 아닐 경우 접속 하지 말아주세요.')
        .setColor("#ff0000");
        message.reply({ embeds: [embeds]}).then(msg => {
        });
    }
});


const logChannelID = "952832505336172594";

client.on('messageDelete', async message => {
    if(message.author.bot) return
    let img = message.author.avatar ? `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.webp?size=256` : undefined;
    try{
        if(message.content === ('')) {
            let embed = new MessageEmbed()
            .setTitle(`메시지삭제 로그`)
            .setDescription(`<@${message.author.id}>님이 <#${message.channel.id}>에서 사진을 삭제했습니다.`)
            .setColor('#FFFF')
            .setFooter(message.author.tag, img)
            .setTimestamp()
        client.channels.cache.get(logChannelID).send({embeds:[embed]})
        }else {
            const embed = new MessageEmbed() 
        .setTitle(`메시지삭제 로그`)
        .setDescription(`<@${message.author.id}> 님이 <#${message.channel.id}>에서 메시지를 삭제했습니다.`)
        .setColor('#FFFF')
        .addField('삭제된 메시지:', message.content)
        .setFooter(message.author.tag, img)
        .setTimestamp()
        client.channels.cache.get(logChannelID).send({embeds:[embed]})
        }
    }catch(error){console.log(error);};
});

client.on('messageUpdate', async(oldMessage, newMessage) => {
    try{
        if(oldMessage.content === newMessage.content) return;
        if(oldMessage.author.bot) return;
        let img = oldMessage.author.avatar ? `https://cdn.discordapp.com/avatars/${oldMessage.author.id}/${oldMessage.author.avatar}.webp?size=256` : undefined;
        let embed = new MessageEmbed()
        .setTitle(`메시지수정 로그`)
        .setDescription(`<@${oldMessage.author.id}>님이 <#${newMessage.channel.id}>에서 메시지를 수정했습니다.`)
        .setColor('#FFFF')
        .addField('수정 전 메시지:', oldMessage.content)
        .addField('수정 후 메시지:', newMessage.content)
        .setFooter(oldMessage.author.tag, img)
        .setTimestamp();
        client.channels.cache.get(logChannelID).send({embeds:[embed]});
    }catch(error){console.log(error);};
});

client.login(token)
