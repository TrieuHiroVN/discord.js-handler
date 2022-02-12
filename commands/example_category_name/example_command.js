const { Client, Message } = require("discord.js");

/**
 * @param { Client } client
 * @param { Message } message
 * @param { String[] } args
 */

module.exports = {
    name: "example",
    description: "An example command",
    run: async (client, message, args) => {
        message.channel.send({ content: "This is an example reply for command!" });
    }
}