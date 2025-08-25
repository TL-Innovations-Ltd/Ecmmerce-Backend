const mongoose = require('mongoose');

const contactLimiaiSchema = new mongoose.Schema(
    {
        name: { type: String},
        email: { type: String },
        company: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model('ContactLimiai', contactLimiaiSchema);
