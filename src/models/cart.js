const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true
    },

    cartitem: [
      {
        quantity: {
          type: Number,
          required: true
        },
        product: {
          type: String,
          required: true
        },
        price: {
          type: Number,
          required: true
        }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("cart1", userSchema);
