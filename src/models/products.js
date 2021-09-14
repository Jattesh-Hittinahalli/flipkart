const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    slug: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    productImage: [
        {
            img: {
                type: String
            }

        }
    ],
    createdby: {
        type: mongoose.Schema.Types.ObjectId, ref: 'user',

    },
    category: {
        type: mongoose.Schema.Types.ObjectId, ref: 'category',
    },
    review: [
        {
            review: {
                type: String
            }

        }
    ],


},

    { timestamps: true },
)

module.exports = mongoose.model('Products', userSchema);