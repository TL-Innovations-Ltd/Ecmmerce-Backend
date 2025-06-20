const mongoose = require("mongoose");

// ----- Address Schema -----
const addressSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  { _id: false }
);

// ----- Payment Method Schema -----
const paymentMethodSchema = new mongoose.Schema(
  {
    cardType: { type: String, required: true },
    cardHolder: { type: String, required: true },
    cardNumber: { type: String, required: true },
    expiryDate: { type: String, required: true },
    cvv: { type: String, required: true },
  },
  { _id: false }
);

// ----- User Schema -----
const userSchema = new mongoose.Schema(
  {
    // Shared/unique fields
    username: { type: String }, // Optional, from website
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Only required in app, website may not use it
    phone: { type: String },

    // App-specific
    address: { type: addressSchema },
    paymentMethods: [paymentMethodSchema],
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    emailNotification: { type: Boolean, default: true },
    smsNotification: { type: Boolean, default: false },
    appNotification: { type: Boolean, default: true },

    // Website-specific
    ip: { type: String },
    region: { type: String },
    otp: { type: String },
    otp_expire_at: { type: Date },
    installer_expire_at: { type: Date, default: null },
    production_email_status: { type: Boolean },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    // Common
    roles: {
      type: String,
      enum: ["user", "superadmin", "managers", "wholesaler", "installer", "member", "production"],
      default: "user",
    },

    profilePicture: {
      url: { type: String, default: "" },
      public_id: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
