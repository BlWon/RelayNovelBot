const discord = require('discord.js');
const global = require('./global');
const config = require('../config.json');
const fs = require('fs');

const prefix = config.prefix;
const token = config.token;

global.client = new discord.Client({
    intents: [
        discord.Intents.FLAGS.GUILDS,
        discord.Intents.FLAGS.GUILD_MEMBERS,
        discord.Intents.FLAGS.GUILD_BANS,
        discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        discord.Intents.FLAGS.GUILD_INTEGRATIONS,
        discord.Intents.FLAGS.GUILD_WEBHOOKS,
        discord.Intents.FLAGS.GUILD_INVITES,
        discord.Intents.FLAGS.GUILD_VOICE_STATES,
        discord.Intents.FLAGS.GUILD_PRESENCES,
        discord.Intents.FLAGS.GUILD_MESSAGES,
        discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
        discord.Intents.FLAGS.DIRECT_MESSAGES,
        discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING,
    ]
});

global.client.commands = new discord.Collection();
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    global.client.commands.set(command.name, command);
}

global.client.on('ready', () => {
    console.log(`Logged in as ${global.client.user.tag}!`);
});

global.client.on('messageCreate', async message => {
    if (message.content.split(' ')[0].startsWith(prefix)) {
        const command = message.content.split(' ')[0].slice(prefix.length);
        const args = message.content.split(' ').slice(1);
        RunCommend(message, command, args);
    }
});

global.client.on('interactionCreate', async interaction => {
    if (interaction.isButton()) {
        global.button.handle(interaction.customId, interaction);
    }
});

function RunCommend(message, command, args) {
    if (global.client.commands.has(command)) {
        global.client.commands.get(command).execute(message, args);
    } else {
        console.log(`Command ${command} not found!`);
    }
}

global.client.login(token);