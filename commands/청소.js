const {
    Client,
    Message,
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: '청소',
    async execute(client, message, args){
        try {
            let delamount = args[0];
            if (isNaN(delamount) || parseInt(delamount <= 0)) return message.reply('에러:')

            if (parseInt(delamount) > 100) return message.reply('100개의 메세지는 삭제 할 수 없습니다.')

            await message.channel.bulkDelete(parseInt(delamount) + 1, true);

            await message.channel.send('메세지를 삭제했습니다!').then(m => {
                setTimeout(() => {
                    m.delete()
                }, 100) // 5 seconds
            })
        } catch (e) {
            console.log(e)
        } //lets try it
    }
}
