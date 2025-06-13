const mongoose = require("mongoose");

// Address sub-schema for structured address fields
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
  { _id: false },
);

// Payment method sub-schema
const paymentMethodSchema = new mongoose.Schema(
  {
    cardType: { type: String, required: true },
    cardHolder: { type: String, required: true },
    cardNumber: { type: String, required: true },
    expiryDate: { type: String, required: true },
    cvv: { type: String, required: true },
  },
  { _id: false },
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    address: { type: addressSchema },
    profilePicture: {
      url: { type: String },
      public_id: { type: String }
    },
    paymentMethods: [paymentMethodSchema],
    roles: {
      type: String,
      default: "user",
      enum: ["user", "superadmin", "managers", "wholesaler"],
    },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    emailNotification: { type: Boolean, default: true },
    smsNotification: { type: Boolean, default: false },
    appNotification: { type: Boolean, default: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
