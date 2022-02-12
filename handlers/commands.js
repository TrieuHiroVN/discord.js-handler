const { Client } = require("discord.js");
const { readdirSync } = require("fs");
const { join } = require("path");

/**
 * @param { Client } client 
 */

module.exports = (client) => {
    const path = join(__dirname, "../commands");
    readdirSync(path).forEach((dir) => {
        if(dir.endsWith(".js")) {
            const command = require(`../commands/${dir}`);
            if(!command.name) command.name = dir.split(".")[0];
            command.directory = "command";

            client.commands.set(command.name, command);
        } else {
            const path2 = join(__dirname, `../commands/${dir}`);
            const commands = readdirSync(path2).filter(file => file.endsWith(".js"));

            for(file of commands) {
                const command = require(`../commands/${dir}/${file}`);
                if(!command.name) command.name = file.split(".")[0];
                command.directory = dir;

                client.commands.set(command.name, command);
            };
        };
    });
};