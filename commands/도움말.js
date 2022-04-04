const { MessageEmbed } = require('discord.js')

module.exports = {
    name:"help",
    async execute(client,message,args) {
        const help = new MessageEmbed()
        .setTitle('봇 명령어')
        .setColor("GREEN")
        .addField('t.help', '도움말을 불러옵니다!')
        .addField('t.밴', '관리자가 유저를 밴합니다!')
        .addField('t.킥', '관리자가 유저를 킥합니다!')
        .addField('t.뮤트', '관리자가 유저를 뮤트합니다!')
        .addField('t.언뮤트', '관리자가 유저에 뮤트를 풉니다!')
        .addField('t.문의', '문의 채널이 만들어지고 언제나 지울수있어요!')
        .addField('t.경고', '경고를 줍니다 **경고 줄때는 직접 넣어줘야 합니다**')
        .addField('t.패치노트', '패치노트를 보여줍니다!')
        .addField('t.청소', '메세지를 청소 할수있습니다!')
        .addField('t.재생', '음악을 재생해요!')
        .addField('t.스킵', '음악을 스킵해요!')
        .addField('t.현재재생', '음악이 얼마나 재생됐는지 확인 가능!')
        .addField('t.볼륨', '음악에 소리를 조절해요!')
        message.channel.send({embeds:[help]})
    }
}
