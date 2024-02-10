const { SlashCommandBuilder, Client, ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
const ñamData = require('../../Models/ñamSchema');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ñam')
        .setDescription('Le come')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Elige al Usuario')
                .setRequired(true)
        ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const { options } = interaction;
        const user = options.getMember('user');

        if (interaction.user.id === user.id) {
            return interaction.reply({ content: "No puedes pegarte a ti mismo", ephemeral: true });
        }

        let links = ["https://media1.tenor.com/m/38tXQNwIde0AAAAd/rimu-chew.gif", "https://media1.tenor.com/m/8Q9PcM5GL2QAAAAC/anime-ear-ear-bite.gif", "https://media1.tenor.com/m/jQ1anSa1FekAAAAC/bite-me.gif"];
        let index = Math.floor(Math.random() * links.length);

        try {
            const result = await ñamData.findOneAndUpdate(
                { guildId: interaction.guild.id, userId: user.id },
                { $inc: { ñamCount: 1 } },
                { upsert: true, new: true }
            );

            if (!result) {
                // Si no hay resultado, algo salió mal
                console.error("No se pudo actualizar o crear el documento de ñam");
                return interaction.reply({ content: "Se produjo un error al comer", ephemeral: true });
            }

            const ñamEmbed = new EmbedBuilder()
                .setColor('Random')
                .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.avatarURL({ dynamic: true }) })
                .setTitle('Nuevo Ñam')
                .setDescription(`<@${interaction.user.id}> acaba de reventar a <@${user.id}>\n\n> <@${user.id}> tiene ${result.ñamCount} ñams en total`)
                .setImage(`${links[index]}`)
                .setFooter({ text: `${interaction.guild.name}`, iconURL: client.user.avatarURL({ dynamic: true }) })
                .setTimestamp();

            return interaction.reply({ content: `Te dieron una ñam <@${user.id}>`, embeds: [ñamEmbed] });
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: "Se produjo un error al pegar", ephemeral: true });
        }
    }
};