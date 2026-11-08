const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const analyticsSchema = new Schema({
    path:   { type: String, required: true },
    method: { type: String, required: true },
    userId: { type: Number, required: false },
    productId: { type: Number, required: false },
    timestamp: { type: Date, default: Date.now() },
}, { timestamps: true });

module.exports = mongoose.model('AnalyticsEvent', analyticsSchema);