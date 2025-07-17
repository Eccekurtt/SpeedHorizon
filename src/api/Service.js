const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Servis şeması
const ServiceSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.models.Service || mongoose.model('Service', ServiceSchema); 