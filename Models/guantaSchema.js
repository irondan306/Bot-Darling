// En guantaSchema.js
const { model, Schema } = require('mongoose');

let guantaSchema = new Schema({
    guildId: String,
    userId: String,
    guantaCount: Number,  // Cambiado a "guantaCount" en lugar de "kissCount"
});

module.exports = model("guanta", guantaSchema);
