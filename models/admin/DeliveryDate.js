const mongoose = require('mongoose');

const deliveryDateSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        enum: ['Normal', 'Preorder']
    },
    day: {
        type: Number,
        required: true,
    },
    reason: {
        type: String,
        required: false,
    },    
}, 
{
    timestamps: true,
})

const DeliveryDate = mongoose.model("DeliveryDate", deliveryDateSchema);

module.exports = DeliveryDate;