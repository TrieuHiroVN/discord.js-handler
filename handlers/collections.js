const { Client, Collection } = require("discord.js");

/**
 * @param { Client } client
 */

module.exports = (client) => {
    client.commands = new Collection();
    client.slashCommands = new Collection();
};