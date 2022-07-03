const { Client } = require("discord.js");
const { readdirSync } = require("fs");
const { join } = require("path");

/**
 * @param { Client } client 
 */

module.exports = (client) => {
    readdirSync(join(__dirname, '../events'))
        .filter(file => file.endsWith('.js'))
        .forEach(file => require(`../events/${file}`));
};