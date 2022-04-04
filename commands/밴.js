const { Permissions , MessageEmbed} = require('discord.js')
module.exports = {
    name:"밴",
    async execute(client,message,args){
        if(!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return message.reply("권한이 없습니다")
        const member = message.mentions.members.first()
        if(!member) return message.reply("유저를 멘션해주세요")
        const reason = args.slice(1).join(" ");
            if (!reason) reason = '사유 없음';

        await member.ban()
        const embed1 = new MessageEmbed()
        .setTitle("유저가 밴당했습니다!")
        .setDescription(`밴당한 유저 : ${member}\n처리자 : ${message.author}`)
        .setTimestamp()
        .setColor("RED")
        .addField('사유', `\`${reason}\``)
        message.delete()
        message.channel.send({embeds:[embed1]})

            }
        }
