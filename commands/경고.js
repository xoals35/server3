const { Permissions, MessageEmbed } = require('discord.js')


const permissionsembed = new MessageEmbed()
.setTitle("❌오류❌")
.setDescription(`해당 명령어는 MANAGE_CHANNELS 또는 MANAGE_ROLES 권한이 있어야합니다!`)
.setColor('RED')


module.exports = {
    name:"경고",
    async execute(client,message,args) {
        if (!message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS) || !message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_ROLES))
            return message.reply({embeds : [permissionsembed]})
  
        
        let reason = args.slice(1).join(" ");
        if (!reason) reason = "사유 없음"
        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        const role = message.mentions.roles.first() // roles = mentions
        if(!role) return message.channel.send('경고 역할 선택이 안됐습니다') //when no role is specified or pinged
        const embed = new MessageEmbed()

        .setTitle("경고")
        .setColor("RED")
        .addField('유저', `${target.user.username}`)
        .addField('경고 수', `${role}`)
        .addField('사유', `${reason}`)
        .addField('처리자', `${message.author}`)
        message.channel.send({embeds:[embed]})
        await target.roles.add(role)
    }
}