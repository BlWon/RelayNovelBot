const discord = require('discord.js');
const global = require('../global');

module.exports = {
    name: '시작',
    execute(message, args) {
        message.delete();

        const row = new discord.MessageActionRow()
        row.addComponents(
            global.button.add(
                new discord.MessageButton()
                    .setLabel('네')
                    .setStyle('SUCCESS'),
                /**
                 * @param {discord.Interaction} interaction 
                 */
                (interaction) => {
                    console.log(interaction.customId)
                }, false)
        );
        row.addComponents(
            global.button.add(
                new discord.MessageButton()
                    .setLabel('아니요')
                    .setStyle('DANGER'),
                /**
                 * @param {discord.Interaction} interaction 
                 */
                (interaction) => {
                    console.log(interaction.customId)
                }, false)
        );

        message.channel.send({
            content: `<@${message.author.id}>\n이 채널을 릴레이 소설 채널로 설정하시겠습니까?`,
            components: [row]
        });
        global.message.delete(message);
    }
}