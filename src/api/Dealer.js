const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Bayi (Dealer) şeması
const DealerSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.models.Dealer || mongoose.model('Dealer', DealerSchema); 