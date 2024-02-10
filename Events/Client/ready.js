const mongoose = require('mongoose')
const config = require('./../../config.json')
require('colors')
module.exports = {
    name:'ready',
    once:true,
    async execute(client){
        await mongoose.connect(config.dataBaseURL || ''),{
            keepAlive:true,
        }

        if(mongoose.connect){
            console.log('[MONGO DB] Esta conectado'.red);
        }
        console.log(`El ${client.user.username} esta online`);
    }
};