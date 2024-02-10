// En bite.js
const { model, Schema } = require('mongoose');

let ñamSchema = new Schema({
    guildId: String,
    userId: String,
    ñamCount: Number,  // Cambiado a "biteCount" en lugar de "kissCount"
});

module.exports = model("ñam", ñamSchema);