module.exports = {
    name:'messageCreate',
    execute(message, client){
        let prefix = '+'
        if(!message.content.startsWith(prefix) || message.author.bot) return;
        const args = message.content.slice(prefix.length).trim().split(/ +/)
        const commandName = args.shift().toLowerCase()
        const command = client.pcomands.get(commandName) || client.pcomands.find(cmd => cmd.aliases.includes(commandName))
        if(!command) return;
        try{
            command.execute(message,args)
        }catch(err){
            message.reply({content:"Ocurrio un error"})
            console.log(err);
        }
    }
};