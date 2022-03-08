const discord = require('discord.js');
const global = require('../global');
const relayNovel = require('../components/relayNovel.js');

module.exports = {
    name: '시작',
    /**
     * 
     * @param {discord.Message} message 
     * @param {*} args 
     */
    async execute(message, args, content = "") {
        if (message.deletable)
            await message.delete();

        if (content == "") {
            content = message.content.slice(5).trim();
        }

        if (content == "") {
            message.channel.send({
                content: `<@${message.author.id}> 소설의 시작을 입력해 주세요`
            });
            return;
        }

        const messages = await message.channel.messages.fetch({ limit: 100 });

        if (messages.size > 0) {
            const row = new discord.MessageActionRow()
            row.addComponents(
                global.button.add('네', 'SUCCESS',
                    /**
                     * @param {discord.ButtonInteraction} interaction 
                     */
                    async interaction => {
                        interaction.message.delete();
                        if (messages.size >= 100) {
                            const channel = await interaction.channel.clone({
                                reason: '메시지 삭제를 위한 채널 재생성'
                            });
                            await interaction.channel.delete({
                                reason: '메시지 삭제를 위한 채널 재생성'
                            });

                            const dmChannel = await interaction.user.createDM();
                            dmChannel.send(`메시지 삭제를 위해 채널이 새로 생성되었습니다.\n채널: <#${channel.id}>`);
                        }
                        else
                        {
                            await interaction.channel.bulkDelete(messages);
                        }

                        this.execute(message, args);
                    }, false, message.author.id),
            );
            row.addComponents(
                global.button.add('아니요', 'DANGER',
                    /**
                     * @param {discord.ButtonInteraction} interaction 
                     */
                    async interaction => {
                        interaction.message.delete();
                        interaction.reply({
                            content: '취소되었습니다',
                            ephemeral: true
                        });
                    }, false, message.author.id),
            );
            
            message.channel.send({
                content: `<@${message.author.id}> 아무것도 없는 빈 채널에서만 시작할 수 있습니다.\n` +
                    `메시지를 모두 지울까요?`,
                components: [row]
            });
            return;
        }

        const row = new discord.MessageActionRow()
        row.addComponents(
            global.button.add('네', 'SUCCESS',
                /**
                 * @param {discord.ButtonInteraction} interaction 
                 */
                async interaction => {
                    interaction.message.delete();
                    interaction.channel.send({
                        content: `<@${interaction.user.id}>님의 릴레이 소설이 시작됩니다!`
                    });
                    interaction.channel.send({
                        content: content,
                        components: relayNovel.start.getComponents()
                    });
                }, false, message.author.id),
        );
        row.addComponents(
            global.button.add('아니요', 'DANGER',
                /**
                 * @param {discord.ButtonInteraction} interaction 
                 */
                async interaction => {
                    interaction.message.delete();
                    interaction.reply({
                        content: '취소되었습니다',
                        ephemeral: true
                    });
                }, false, message.author.id),
        );

        message.channel.send({
            content: `<@${message.author.id}>\n이 채널을 릴레이 소설 채널로 설정하시겠습니까?`,
            components: [row]
        });
        global.message.delete(message);
    }
}
