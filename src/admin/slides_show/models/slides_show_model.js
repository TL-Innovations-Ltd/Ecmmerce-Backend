const mongoose = require('mongoose');

const SlideSchema = new mongoose.Schema({
    id: { type: String, required: true },
    layout: { type: String, required: true },
    media: {
        type: { type: String },
        urls: [String],
        position: String
    },
    text: {
        heading: String,
        subheading: String,
        description: String,
        bullets: [String],
        alignment: String,
        verticalPosition: String,
        showHeading: Boolean,
        showSubheading: Boolean,
        showDescription: Boolean,
        showBullets: Boolean
    },
    appearance: {
        theme: String,
        backgroundColor: String,
        overlayDarken: Boolean,
        padding: String
    },
    meta: {
        index: Number,
        status: String
    }
});

const SlideshowSchema = new mongoose.Schema({
    customerId: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: String,
    slides: [SlideSchema],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Slideshow', SlideshowSchema);