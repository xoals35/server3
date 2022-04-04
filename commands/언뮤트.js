const { Permissions , MessageEmbed } = require("discord.js")

const permissionsembed = new MessageEmbed()
.setTitle("❌오류❌")
.setDescription(`해당 명령어는 MANAGE_CHANNELS 또는 MANAGE_ROLES 권한이 있어야합니다!`)
.setColor('RED')

module.exports = {
    name: "언뮤트",
    async execute(client,message,args) {
        if (!message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS) || !message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_ROLES))
            return message.reply({embeds : [permissionsembed]})
        

        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if(!target){
            const targetnull = new MessageEmbed()
            .setTitle("❌오류❌")
            .setDescription(`유저를 맨션해주세요!\nt.언ㄴ뮤트 <맨션|유저ID> <사유>`)
            .setColor('RED')

            return message.reply({embeds : [targetnull]})
        }

        let reason = args.slice(1).join(" ");
        if (!reason) reason = "사유 없음"
        
        const muterole = message.channel.guild.roles.cache.find(r => r.name == "뮤트")

       

        target.roles.remove(muterole.id).then(() => {
            const embed = new MessageEmbed()
                .setColor(0xFF90FF)
                .setTitle(`🔈언뮤트🔈`)
                .setDescription(`유저: ${target.user.username} \n처리자: ${message.author} \n사유: ${reason}`)
                .setTimestamp()
            message.reply({embeds : [embed]})
        })
        
    }
}
