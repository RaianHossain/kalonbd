const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: false,
    },
    parent_id: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        required: false,
    },    
    avatar: {
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

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;