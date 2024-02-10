const {SlashCommandBuilder, PermissionFlagsBits, Client, chatInputApplicationCommandMention, ChatInputCommandInteraction} = require('discord.js')

module.exports = {
    developer:true,
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDescription('Ping Pong'),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction,client){
        interaction.reply({content:"Pong"});
    }
};