const client = require("../index");

client.on("interactionCreate", async (interaction) => {
    if(interaction.isCommand()) {
        const command = client.slashCommands.get(interaction.commandName);
        if(!command) return interaction.reply({ content: "An error has occurred!" });

        const args = [];

        for(option of interaction.options.data) {
            if(["SUB_COMMAND", "SUB_COMMAND_GROUP"].includes(option.type)) {
                if(option.name) args.push(option.name);

                option.options?.forEach(x => {
                    if(x.value) args.push(x.value);
                });
            } else if(option.value) args.push(option.value);
        };

        interaction.member = interaction.guild.members.cache.get(interaction.user.id);

        try {
            command.run(client, interaction, args);
        } catch (err) {
            console.log(err);
        };
    };

    if(interaction.isContextMenu()) {
        const command = client.slashCommands.get(interaction.commandName);
        if(command) command.run(client, interaction);
    };
});