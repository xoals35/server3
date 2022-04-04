module.exports ={
    name: "현재재생",
    description: "현재 재생중인 곡을 표시해요.",
    async execute(message, args, client){
        const queue = client.player.getQueue(message.guild.id);
        if (!message.member || !message.member.voice.channel) return message.reply({ content: '<a:x_:941623055703236639> 먼저 음성 채널에 들어가주세요.' })

        if (!queue || !queue.playing) return message.reply({ content: '<a:x_:941623055703236639> 현재 재생되고 있는 음악이 없습니다.' })

        if (message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply({ content: '<a:x_:941623055703236639> 봇이 있는 음성 채널에 들어가 주십시오.' })

        console.log(`${message.author.tag} 명령어 호출 - 현재재생`)

        const progress = queue.createProgressBar();
        const perc = queue.getPlayerTimestamp();

        return void message.channel.send({
            embeds: [
                {
                    title: `지금 재생중 \`${message.guild.name}\``,
                    description: `🎶 | **${queue.current.title}**! (\`${perc.progress}%\`)`,
                    fields: [
                        {
                            name: "\u200b",
                            value: progress
                        }
                    ],
                    color: 0x00e1ff
                }
            ]
        });
    }
}