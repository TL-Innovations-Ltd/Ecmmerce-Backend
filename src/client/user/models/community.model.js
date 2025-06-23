const mongoose = require('mongoose');

const communitySubscriptionSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    communityType: {
        type: String,
        required: true,
        enum: ['LIMI_Club', 'The_Luminaries', 'LIMI_Collective']
    }
}, { timestamps: true });

module.exports = mongoose.model('CommunitySubscription', communitySubscriptionSchema);
