const { SlashCommandBuilder, Client, ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
const guantaData = require('../../Models/guantaSchema');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('guanta')
        .setDescription('Le Pega')
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

        let links = ["https://media.giphy.com/media/QAIrrUgDAW4atEv7Zq/giphy.gif?cid=790b7611t7z5z62c5no4vrsw4mr0mu3npgjj5izfoak2l6pv&ep=v1_gifs_search&rid=giphy.gif&ct=g"];
        let index = Math.floor(Math.random() * links.length);

        try {
            const result = await guantaData.findOneAndUpdate(
                { guildId: interaction.guild.id, userId: user.id },
                { $inc: { guantaCount: 1 } },
                { upsert: true, new: true }
            );

            if (!result) {
                // Si no hay resultado, algo salió mal
                console.error("No se pudo actualizar o crear el documento de guanta");
                return interaction.reply({ content: "Se produjo un error al pegar", ephemeral: true });
            }

            const guantaEmbed = new EmbedBuilder()
                .setColor('Random')
                .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.avatarURL({ dynamic: true }) })
                .setTitle('Nueva guanta')
                .setDescription(`<@${interaction.user.id}> acaba de reventar a <@${user.id}>\n\n> <@${user.id}> tiene ${result.guantaCount} guantaes en total`)
                .setImage(`${links[index]}`)
                .setFooter({ text: `${interaction.guild.name}`, iconURL: client.user.avatarURL({ dynamic: true }) })
                .setTimestamp();

            return interaction.reply({ content: `Te dieron una guanta <@${user.id}>`, embeds: [guantaEmbed] });
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: "Se produjo un error al pegar", ephemeral: true });
        }
    }
};
