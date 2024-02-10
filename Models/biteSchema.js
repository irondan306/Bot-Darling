// En bite.js
const { model, Schema } = require('mongoose');

let biteSchema = new Schema({
    guildId: String,
    userId: String,
    biteCount: Number,  // Cambiado a "biteCount" en lugar de "kissCount"
});

module.exports = model("bite", biteSchema);
