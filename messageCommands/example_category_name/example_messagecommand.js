const { Client, Message } = require("discord.js");

module.exports = {
    name: "example",
    description: "An example command",

    /**
     * 
     * @param { Client } client 
     * @param { Message } message 
     * @param { String[] } args 
     */
    run: async (client, message, args) => {
        message.channel.send({ content: "This is an example reply for message commands!" });
    }
};