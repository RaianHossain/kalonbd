const mongoose = require('mongoose');

const sizeGuideSchema = mongoose.Schema({
    dress: {
        type: Object,
        required: false
    },
    shoe: {
        type: Object,
        required: false
    },
}, 
{
    timestamps: true,
})

const SizeGuide = mongoose.model("SizeGuide", sizeGuideSchema);

module.exports = SizeGuide;