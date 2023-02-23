const mongoose = require('mongoose');

const brandSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: false,
    },
    logo: {
        type: String,
        required: false,
    },
    products: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Product",
            required: false
        }
    ]
}, 
{
    timestamps: true,
})

const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;