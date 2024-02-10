
function errReply(interaction, message, ephemeral = false) {
    return interaction.reply({
        content: message,
        ephemeral: ephemeral
    });
}

const { SlashCommandBuilder, Client, ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
const kissData = require('../../Models/kissSchema');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kiss')
        .setDescription('Besa a su Darling')
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
            return interaction.reply({ content: "No puedes besarte a ti mismo", ephemeral: true });
        }

        let links = ["https://i.pinimg.com/originals/34/ee/7d/34ee7d3380a0a2b81e7e7660ddb027a7.gif", "https://media.giphy.com/media/MQVpBqASxSlFu/giphy.gif", "https://media.giphy.com/media/gTLfgIRwAiWOc/giphy.gif", "https://media.giphy.com/media/Ka2NAhphLdqXC/giphy.gif", "https://media.giphy.com/media/nyGFcsP0kAobm/giphy.gif", "https://media.giphy.com/media/QGc8RgRvMonFm/giphy.gif", "https://media.giphy.com/media/WynnqxhdFEPYY/giphy.gif", "https://media.giphy.com/media/G3va31oEEnIkM/giphy.gif", "https://media.giphy.com/media/FqBTvSNjNzeZG/giphy.gif", "https://media.giphy.com/media/11rWoZNpAKw8w/giphy.gif", "https://media.giphy.com/media/zkppEMFvRX5FC/giphy.gif", "https://media.giphy.com/media/bm2O3nXTcKJeU/giphy.gif", "https://media.giphy.com/media/zRJBX9WYl9JAW0LAP5/giphy.gif", "https://media.giphy.com/media/nA2ZyB2qByO2pacHZI/giphy.gif", "https://i.pinimg.com/originals/6f/3c/3c/6f3c3c46d748327e47a431b125943f7b.gif", "https://i.pinimg.com/originals/9a/a8/7e/9aa87eb823b8c571fa14c75fc2576241.gif", "https://i.pinimg.com/originals/79/65/2f/79652fcb0b607135dd85573866bb427f.gif", "https://i.pinimg.com/originals/c0/aa/03/c0aa038091b778c5f22f82e6245c8e43.gif", "https://i.pinimg.com/originals/17/1a/a9/171aa98250f53b7c7b1e7eb0afb7814d.gif", "https://cdn.nekotina.com/images/QpQCXyh1.gif", "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/3663e444-4c76-4941-840e-997e40870d22/dee6pgw-3ea47fa7-1518-4266-9c65-2580e7ac9de8.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzM2NjNlNDQ0LTRjNzYtNDk0MS04NDBlLTk5N2U0MDg3MGQyMlwvZGVlNnBndy0zZWE0N2ZhNy0xNTE4LTQyNjYtOWM2NS0yNTgwZTdhYzlkZTguZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.9dYRtM2SHpNCat97Tn8RbIRRRRsoYq_ZSz29N7BnVaI", "https://cdn.discordapp.com/attachments/1197252762266783908/11982637061366", "https://64.media.tumblr.com/33fe1547f85de725071ef2ffbf0c8445/f6519881eefbb272-c0/s500x750/756c1798192746958cecd268eb7393f6645b2adb.gif", "https://cdn.nekotina.com/images/OlAxsqR6.gif", "https://cdn.nekotina.com/images/zBgH65RO.gif", "https://cdn.nekotina.com/images/rPHrigeea.gif", "https://cdn.nekotina.com/images/gthWb-zt.gif", "https://cdn.nekotina.com/images/35AQ97Af.gif"];
        let index = Math.floor(Math.random() * links.length);

        try {
            const result = await kissData.findOneAndUpdate(
                { guildId: interaction.guild.id, userId: user.id },
                { $inc: { kissCount: 1 } },
                { upsert: true, new: true }
            );

            const kissEmbed = new EmbedBuilder()
                .setColor('Random')
                .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.avatarURL({ dynamic: true }) })
                .setTitle('Nuevo Beso')
                .setDescription(`<@${interaction.user.id}> acaba de besar a <@${user.id}>\n\n> <@${user.id}> tiene ${result.kissCount} besos en total`)
                .setImage(`${links[index]}`)
                .setFooter({ text: `${interaction.guild.name}`, iconURL: client.user.avatarURL({ dynamic: true }) })
                .setTimestamp();

            return interaction.reply({ content: `Te dieron un beso <@${user.id}>`, embeds: [kissEmbed] });
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: "Se produjo un error al besar", ephemeral: true });
        }
    }
};
