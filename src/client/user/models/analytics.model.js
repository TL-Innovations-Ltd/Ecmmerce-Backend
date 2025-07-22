const mongoose = require('mongoose');

const SlideSchema = new mongoose.Schema({
  slideId: String,
  slideTitle: String,
  seconds: Number
}, { _id: false });

const EngagementEventSchema = new mongoose.Schema({
  id: String,
  type: String,
  timestamp: Number,
  slideId: String,
  data: mongoose.Schema.Types.Mixed
}, { _id: false });

const DeviceInfoSchema = new mongoose.Schema({
  userAgent: String,
  screenWidth: Number,
  screenHeight: Number,
  isMobile: Boolean
}, { _id: false });

const AnalyticsSchema = new mongoose.Schema({
  sessionId: { type: String, required: true },
  customerId: String,
  sessionStart: Number,
  sessionEnd: Number,
  durationSeconds: Number,
  slides: [SlideSchema],
  engagementEvents: [EngagementEventSchema],
  deviceInfo: DeviceInfoSchema
}, { timestamps: true });

module.exports = mongoose.model('Analytics', AnalyticsSchema);
