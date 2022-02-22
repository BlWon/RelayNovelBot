const { v1: uuidV1 } = require('uuid');
const buttonHandles = {};
const discord = require('discord.js');

module.exports = {
    client: null,
    button: {
        /**
         * 
         * @param {string} buttonId 
         * @param {discord.Interaction} interaction 
         */
        handle(buttonId, interaction) {
            if (buttonHandles[buttonId]) {
                if (buttonHandles[buttonId].owner != 0 &&
                    buttonHandles[buttonId].owner == interaction.user.id) {
                    interaction.deferUpdate();
                    buttonHandles[buttonId](interaction);
                    if (buttonHandles[buttonId].isOnce)
                    {
                        delete buttonHandles[buttonId];
                    }
                }
                else {
                    interaction.reply({
                        content: '권한이 없습니다.',
                        ephemeral: true
                    });
                }
            }
            else {
                interaction.reply({
                    content: '잘못된 요청입니다.',
                    ephemeral: true
                });
                interaction.message.edit({components: []});
            }
        },
        add(button, handle, isOnce = true, owner = 0) {
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
        delete(message) {
            setTimeout(() => {
                message.delete();
            }, 300000);
        }
    }
}