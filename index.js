const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const config = require('./config.json');

const { loadEvents } = require('./Handlers/eventHandler');
const { loadCommands } = require('./Handlers/commandHandler');
const { loadPCommands } = require('./Handlers/PcommandHandler');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        // Agrega otros intents necesarios aquí
    ],
    partials: [Partials.Message],
});

client.commands = new Collection();
client.pcommands = new Collection();  // Corregir el nombre

client.login(config.token)
    .then(() => {
        loadEvents(client);
        loadCommands(client);
        loadPCommands(client);
    })
    .catch(error => {
        console.error('Error durante el inicio de sesión:', error);
    });

client.on('messageCreate', message => {
    const prefix = config.prefix;

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) || client.pcommands.get(commandName);

    if (!command) return;

    try {
        command.execute(message, args, client);
    } catch (error) {
        console.error(`Error al ejecutar el comando ${commandName}:`, error);
        message.reply('Hubo un error al ejecutar el comando.');
    }
});

