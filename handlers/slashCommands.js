const { Client } = require("discord.js");
const { readdirSync } = require("fs");
const { join } = require("path");

/**
 * @param { Client } client 
 */

module.exports = (client) => {
    const path = join(__dirname, "../slashCommands");
    readdirSync(path).forEach((dir) => {
        if(dir.endsWith(".js")) {
            const command = require(`../slashCommands/${dir}`);
            if(!command.name) command.name = dir.split(".")[0];
            command.directory = "slashcommand";

            client.slashCommands.set(command.name, command);
        } else {
            const path2 = join(__dirname, `../slashCommands/${dir}`);
            const commands = readdirSync(path2).filter(file => file.endsWith(".js"));

            for(file of commands) {
                const command = require(`../slashCommands/${dir}/${file}`);
                if(!command.name) command.name = file.split(".")[0];
                command.directory = dir;

                client.slashCommands.set(command.name, command);
            };
        };
    });

    const slashCommands = [];
    client.slashCommands.forEach((command) => slashCommands.push(command));

    client.on("ready", () => {
        // Register for a single guild
        client.guilds.cache.get("your guild id").commands.set(slashCommands);

        // Register for all the guilds bot is in
        // client.application.commands.set(slashCommands);
    });
};