const discord = require('discord.js');
const global = require('../global.js');

module.exports = {
    start: {
        getComponents() {
            return [
                new discord.MessageActionRow().addComponents(
                    global.button.add('1. 옛날 옛날 아주 먼 옛날', 'PRIMARY', async interaction => {

                    })
                ),
                new discord.MessageActionRow().addComponents(
                    global.button.add('2. 하지만 그랬습니다', 'PRIMARY', async interaction => {

                    })
                ),
                new discord.MessageActionRow().addComponents(
                    global.button.add('3. 아니나 다를까 이게 무슨 일일까요', 'PRIMARY', async interaction => {

                    })
                ),
                new discord.MessageActionRow().addComponents(
                    global.button.add('4. 아 쓸거 없다 ', 'PRIMARY', async interaction => {

                    })
                ),
                new discord.MessageActionRow().addComponents(
                    global.button.add('5. 대충 아무말', 'PRIMARY', async interaction => {

                    })
                )
            ];
        }
    }
}