const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "example",
    description: "An example slash command",
    type: "CHAT_INPUT",

    /**
     * 
     * @param { Client } client 
     * @param { CommandInteraction } interaction 
     * @param { any[] } args 
     */
    run: async (client, interaction, args) => {
        interaction.reply({ content: "This is an example reply for slash commands!" });
    }
}