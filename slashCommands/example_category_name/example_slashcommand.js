const { Client, CommandInteraction } = require("discord.js");

/**
 * @param { Client } client
 * @param { CommandInteraction } interaction
 * @param { String[] } args
 */

module.exports = {
    name: "example",
    description: "An example slash command",
    type: "CHAT_INPUT",
    run: async (client, interaction, args) => {
        interaction.followUp({ content: "This is an example reply for slash command!" });
    }
}