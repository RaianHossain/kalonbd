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
        type: ObjectId,
        required: false,
    },    
    avatar: {
        type: String,
    },
}, 
{
    timestamps: true,
})

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;