const { QueryType } = require('discord-player')
const Discord = require('discord.js')


module.exports = {
  name: '재생',
  description: '노래를 재생해요.',
  async execute(message, args, client, track) {
    console.log(`${message.author.tag}명령어 호출 - 재생`)
    const query = args.join(' ')
    const yts = require('yt-search')
    const r = await yts (args.join(' '))
    
    client.player.on("trackAdd", (queue, track) => {
      let playgo = new Discord.MessageEmbed()
                .setColor("BLUE")
                .setTitle("🎶 노래를 재생목록에 추가합니다! 🎶")
                .setURL(`${track.url}`)
                .setDescription(`<a:o_:941623085788975206>`+ `\`${ track.title }\`` + `(이)가 재생목록에 추가되었습니다!`)
                .addField("요청자", `${message.author}`, true)
                queue.metadata.send({ embeds: [playgo] })
    })
    client.player.on("trackStart", (queue, track) => {
      let playl = new Discord.MessageEmbed()
                .setColor("BLUE")
                .setTitle("🎶 노래를 재생합니다! 🎶")
                 .setURL(`${track.url}`)
                .setDescription(`<a:o_:941623085788975206>`+ `\`${ track.title }\`` + `(이)가 지금 재생되고 있습니다!`)
                .addField("요청자", `${message.author}`, true)
                queue.metadata.send({ embeds: [playl] })
    })
        client.player.on("queueEnd", (queue, track) => {
      let playl = new Discord.MessageEmbed()
                .setColor("BLUE")
                .setTitle("끝!")
                .setDescription(`노래가 끝났어요!`)
                queue.metadata.send({ embeds: [playl] })
    })
    if (!args[0]) return message.reply('<a:x_:941623055703236639> 음악 이름을 알려주세요')

    if (!message.member || !message.member.voice.channel) return message.reply('<a:x_:941623055703236639> 먼저 음성 채널에 가입하세요')
    
    if (message.guild.me.voice.channel) {
      if (message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply('<a:x_:941623055703236639> 봇이 다른 채널에서 사용되고 있습니다')
    }

    const searchResult = await client.player.search(query, {
      requestedBy: message.author,
      searchEngine: QueryType.AUTO
    }).catch(() => {})

    if (!searchResult || !searchResult.tracks.length) return message.reply('<a:x_:941623055703236639> 검색된 결과가 없습니다')

    const queue = await client.player.createQueue(message.guild, {
      metadata: message.channel
    })

    try {
      if (!queue.connection) await queue.connect(message.member.voice.channel)
    } catch (error) {
      console.log(error)
      client.player.deleteQueue(message.guild.id)
      return message.reply('음성 채널에 참여할 수 없습니다')
    }
          searchResult.playlist ? queue.addTracks(searchResult.tracks) : queue.addTrack(searchResult.tracks[0])
    if (!queue.playing) await queue.play()
          let playembed = new Discord.MessageEmbed()
                .setColor("BLUE")
                .setTitle("로딩중..")
                .setDescription(`track..🎧`)
                .setTimestamp()
                message.channel.send({ embeds: [playembed] })
    
          }
      }