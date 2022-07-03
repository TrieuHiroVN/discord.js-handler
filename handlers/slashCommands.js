const { Client } = require('discord.js');
const { readdirSync, lstatSync } = require('fs');
const { join } = require('path');

/**
 * @param { Client } client 
 */

module.exports = (client) => {
    readdirSync(join(__dirname, '../slashCommands'))
        .forEach(dir => {
            if (
                lstatSync(join(__dirname, `../slashCommands/${dir}`)).isFile()
                && dir.endsWith('.js')
            ) {
                const command = require(`../slashCommands/${dir}`);
                client.slashCommands.set(command.name, command);
            } else if (
                lstatSync(join(__dirname, `../slashCommands/${dir}`)).isDirectory()
            ) {
                readdirSync(join(__dirname, `../slashCommands/${dir}`))
                    .filter(file => file.endsWith('.js'))
                    .forEach(file => {
                        const command = require(`../slashCommands/${dir}/${file}`);
                        client.slashCommands.set(command.name, command);
                    });
            };
        });

    const slashCommands = [];
    client.slashCommands.forEach(command => slashCommands.push(command));

    client.on('ready', () => {
        // Register for a single guild
        client.guilds.cache.get('your guild id').commands.set(slashCommands);

        // Register for all the guilds bot is in
        // client.application.commands.set(slashCommands);
    });
};