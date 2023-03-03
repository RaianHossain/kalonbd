const DeliveryDate = require('../../models/admin/DeliveryDate');


const getDeliveryDates = async (req, res) => {
    try {
        // console.log(app._router.stack);
        const deliveryDate = await DeliveryDate.find({});
        res.status(200).json({ deliveryDate });       
    } catch (err) {
        res.status(500).json({ err });
    }
};

const createDeliveryDate = async (req, res) => {
    let newDeliveryDate;
       
    newDeliveryDate = { 
        name: req.body.name ? req.body.name : null,
        day: req.body.day ? req.body.day : null,
        reason: req.body.reason ? req.body.reason : null,
    }        
      
    try {
        const deliveryDate = await DeliveryDate.create(newDeliveryDate);
        res.status(201).json({success: true, msg: "Successfully created a deliveryDate."});
    } catch(err) {
        res.status(500).json({success: false, message: err.message});
    }

}

const getDeliveryDate = async (req, res) => {
    try {
        const deliveryDate = await DeliveryDate.find({_id: req.params.id});
        res.status(200).json({success: true, deliveryDate});
    } catch(err) {
        res.status(500).json({success: false, msg: err.message});
    }
}

const updateDeliveryDate = async(req, res) => {
    let deliveryDateToUpdate;
    try {
        deliveryDateToUpdate = await DeliveryDate.findOne({_id: req.params.id});
    } catch (err) {
        res.status(500).json({err});
    }
    
    let updatedObj = {
        day: req.body.day ? req.body.day : deliveryDateToUpdate.day,
        reason: req.body.reason ? req.body.reason : deliveryDateToUpdate.reason
    };   

    try {
        const {id:deliveryDateId} = req.params;
        const deliveryDate = await DeliveryDate.findOneAndUpdate({_id:deliveryDateId}, updatedObj, {new:true, runValidators:true, useFindAndModify:false});
        res.status(200).json({success: true, msg: "Successfully updated a delivery date.", deliveryDate});
    } catch (err) {
        res.status(500).json({ success: false, msg: err.message});
    }
}

const deleteDeliveryDate = async (req, res) => {
    try {
        const {id:deliveryDateId} = req.params;
        const deliveryDate = await DeliveryDate.findOneAndDelete({_id:deliveryDateId}, {useFindAndModify:false});
        res.status(200).json({success: true, msg: "Successfully deleted a delivery date."});
    } catch (err) {
        res.status(500).json({success: true, msg: err.message});
    }
}

module.exports = {
    getDeliveryDates,
    createDeliveryDate,
    getDeliveryDate,
    updateDeliveryDate,
    deleteDeliveryDate
}