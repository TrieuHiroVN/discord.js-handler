const client = require("../index");

client.on("interactionCreate", async (interaction) => {
    if(interaction.isCommand()) {
        const command = client.slashCommands.get(interaction.commandName);
        if(!command) return interaction.followUp({ content: "An error has occurred!" });

        if(command.ephemeral) interaction.deferReply({ ephemeral: true });
        else interaction.deferReply({ ephemeral: false });

        const args = [];

        for(option of interaction.options.data) {
            if(option.type === "SUB_COMMAND") {
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
        await interaction.deferReply({ ephemeral: false });
        const command = client.slashCommands.get(interaction.commandName);
        if(command) command.run(client, interaction);
    };
});