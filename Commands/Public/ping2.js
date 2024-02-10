const {SlashCommandBuilder} = require('discord.js')

module.exports = {
    developer:false,
    data: new SlashCommandBuilder()
    .setName('ping-prueba')
    .setDescription('Ping Pong'),
    execute(interaction){
        interaction.reply({content:"Pong"});
    }
};