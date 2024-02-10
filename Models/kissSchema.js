const { model, Schema } = require('mongoose');

let kissSchema = new Schema({
    guildId: String,
    userId: String,  // Cambiado a "userId" con minúscula "d"
    kissCount: Number,
});

module.exports = model("kiss", kissSchema);
