const { SlashCommandBuilder, Client, ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
const biteData = require('../../Models/biteSchema');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bite')
        .setDescription('Le Muerde')
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
            return interaction.reply({ content: "No te puede morder a ti mismo", ephemeral: true });
        }

        let links = ["https://i.imgur.com/xKJw3mX.gif"];
        let index = Math.floor(Math.random() * links.length);

        try {
            const result = await biteData.findOneAndUpdate(
                { guildId: interaction.guild.id, userId: user.id },
                { $inc: { biteCount: 1 } },
                { upsert: true, new: true }
            );

            if (!result) {
                // Si no hay resultado, algo salió mal
                console.error("No se pudo actualizar o crear el documento de morder");
                return interaction.reply({ content: "Se produjo un error al morder", ephemeral: true });
            }

            const biteEmbed = new EmbedBuilder()
                .setColor('Random')
                .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.avatarURL({ dynamic: true }) })
                .setTitle('Te Mordieron')
                .setDescription(`<@${interaction.user.id}> acaba de morder a <@${user.id}>\n\n> <@${user.id}> tiene ${result.biteCount} mordidas en total`)
                .setImage(`${links[index]}`)
                .setFooter({ text: `${interaction.guild.name}`, iconURL: client.user.avatarURL({ dynamic: true }) })
                .setTimestamp();

            return interaction.reply({ content: `Te Mordieron <@${user.id}>`, embeds: [biteEmbed] });
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: "Se produjo un error al morder", ephemeral: true });
        }
    }
};
