const { Collection } = require('discord.js');
const { Client } = require('discord.js');
const { readdirSync } = require('fs');
const { join } = require('path'); // fix fs path
require('dotenv').config(); // using .env files

const client = new Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] });
module.exports = client;

client.messageCommands = new Collection();
client.slashCommands = new Collection();

// requiring handlers
readdirSync(join(__dirname, './handlers'))
    .filter(file => file.endsWith('.js'))
    .forEach(handler => require(`./handlers/${handler}`)(client));

client.login(process.env.TOKEN);