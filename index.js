const { Client } = require("discord.js");
const { readdirSync } = require("fs");
const { join } = require("path"); // fix fs path
require("dotenv").config(); // using .env files

const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
module.exports = client;

// requiring handlers
const path = join(__dirname, "./handlers");
const handlers = readdirSync(path).filter(file => file.endsWith(".js"));

for(handler of handlers) {
    require(`./handlers/${handler}`)(client);
};

client.login(process.env.TOKEN);