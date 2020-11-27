const mongoose = require('mongoose');

const StateSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        short_name: {
            type: String,
            required: true,
            unique: true,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('state', StateSchema);
