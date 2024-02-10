const config = require('../../config.json')
module.exports = {
    name:'interactionCreate',
    execute(interaction, client){
        if(!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName);

        if(!command){
            return interaction.reply({content:"Comando Deshabilitado"});
        }

        if(command.developer && interaction.user.id !== config.developer){
            return interaction.reply({content:"Comando solamente para Admins"});
        }

        command.execute(interaction, client)
    }
};