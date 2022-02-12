const client = require("../index");
const prefix = process.env.PREFIX;

client.on("messageCreate", async (message) => {
    if(message.author.bot || !message.guild || !message.content.toLowerCase().startsWith(prefix)) return;

    const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(cmd => cmd.aliases?.includes(cmd.toLowerCase()));

    if(!command) return;

    try {
        command.run(client, message, args);
    } catch (err) {
        console.log(err);
    };
});