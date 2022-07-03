const { Client } = require('discord.js');
const { readdirSync, lstatSync } = require('fs');
const { join } = require('path');

/**
 * @param { Client } client 
 */

module.exports = (client) => {
    readdirSync(join(__dirname, '../messageCommands'))
        .forEach(dir => {
            if (
                lstatSync(join(__dirname, `../messageCommands/${dir}`)).isFile()
                && dir.endsWith('.js')
            ) {
                const command = require(`../messageCommands/${dir}`);
                client.messageCommands.set(command.name, command);
            } else if (
                lstatSync(join(__dirname, `../messageCommands/${dir}`)).isDirectory()
            ) {
                readdirSync(join(__dirname, `../messageCommands/${dir}`))
                    .filter(file => file.endsWith('.js'))
                    .forEach(file => {
                        const command = require(`../messageCommands/${dir}/${file}`);
                        client.messageCommands.set(command.name, command);
                    });
            };
        });
};