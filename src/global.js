const { v1: uuidV1 } = require('uuid');
const buttonHandles = {};
const discord = require('discord.js');
const zwc = require('./utils/zwc.js');

module.exports = {
    client: null,
    button: {
        /**
         * 
         * @param {string} buttonId 
         * @param {discord.ButtonInteraction} interaction 
         */
        handle(buttonId, interaction) {
            if (!buttonHandles[buttonId]) {
                this.errorMessage(interaction, `잘못된 요청입니다.`);
            }

            if (zwc.zwcToBytes(interaction.message.content).length <= 0) {
                this.errorMessage(interaction, `잘못된 요청입니다.`);
            }

            if (buttonHandles[buttonId].owner == 0 ||
                buttonHandles[buttonId].owner == interaction.user.id) {
                interaction.deferUpdate();
                buttonHandles[buttonId](interaction);
                if (buttonHandles[buttonId].isOnce) {
                    delete buttonHandles[buttonId];
                }
            }
            else {
                interaction.reply({
                    content: '권한이 없습니다',
                    ephemeral: true
                });
            }
        },
        add(label, style, handle, isOnce = true, owner = 0) {
            const button = new discord.MessageButton();
            button.setLabel(label);
            button.setStyle(style);
            button.setCustomId(uuidV1());
            buttonHandles[button.customId] = handle;
            buttonHandles[button.customId].isOnce = isOnce;
            buttonHandles[button.customId].owner = owner;
            setTimeout(() => {
                delete buttonHandles[button.customId];
            }, 300000);
            return button;
        }
    },
    message: {
        /**
         * 
         * @param {discord.Message} message 
         */
        delete(message) {
            setTimeout(() => {
                if (message.deletable) message.delete();
            }, 300000);
        }
    },
    errorMessage(interaction, error) {
        interaction.reply({
            content: error,
            ephemeral: true
        });
        interaction.message.edit({ components: [] });
    }
}
