function loadPCommands(client) {
    const fs = require('fs');
    const ascii = require('ascii-table');
    const table = new ascii().setHeading('PCommand', 'Status');
    require('colors');

    const commandFiles = fs.readdirSync('../PCommands').filter((file) => file.endsWith('.js'));

    for (const file of commandFiles) {
        try {
            const command = require(`../PCommands/${file}`);
            client.pcommands.set(command.name, command);
            table.addRow(file, 'Loaded');
        } catch (error) {
            console.error(`Error loading PCommand ${file}: ${error.message}`);
            table.addRow(file, 'Error');
        }
    }

    console.log(table.toString(), '\nLoaded PCommands');
}

module.exports = { loadPCommands };

