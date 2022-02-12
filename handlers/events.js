const { Client } = require("discord.js");
const { readdirSync } = require("fs");
const { join } = require("path");

/**
 * @param { Client } client 
 */

module.exports = (client) => {
    const path = join(__dirname, "../events");
    const events = readdirSync(path).filter(file => file.endsWith(".js"));

    for(file of events) {
        require(`../events/${file}`);
    };
};