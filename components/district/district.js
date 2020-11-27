const mongoose = require('mongoose');

const DistrictSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        short_name: {
            type: String,
        },
        state: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'state',
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('district', DistrictSchema);
