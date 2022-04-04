module.exports = {
    name: "문의",
    async execute(client,message,args) {
        if (message.channel.type !== "GUILD_TEXT") return
        const channel = await message.guild.channels.create(`문의채널 : ${message.author.tag}`)

        channel.permissionOverwrites.edit(message.guild.id, {
            SEND_MESSAGES: false,
            VIEW_CHANNEL: false
        })

        channel.permissionOverwrites.edit(message.author, {
            VIEW_CHANNEL: true,
            SEND_MESSAGES: true
        })
        const msg = await message.reply(`**아래 채널로 이동해주세요! ${channel}**`)
        const reactionmsg = await channel.send(`**문의 하실거면\n관리자를 맨션해 기달려주세요!**`)

        await reactionmsg.react("❌")

        const collector = reactionmsg.createReactionCollector()

        collector.on("collect", (reaction, user) => {
if(user.bot) return
            switch (reaction.emoji.name) {
                case "❌":
                    channel.send("**채널이 3초뒤에 삭제됩니다**")
                    setTimeout(() => { channel.delete() }, 3000);
                    setTimeout(() => { msg.delete() }, 3000);
                    break;
            }
        })
    }
}
