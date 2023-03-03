const Brand = require('../../models/admin/Brand');
const path = require("path");
const { unlink } = require("fs");

const getBrands = async (req, res) => {
    try {
        // console.log(app._router.stack);
        const brands = await Brand.find({});
        res.status(200).json({ brands });       
    } catch (err) {
        res.status(500).json({ err });
    }
};

const createBrand = async (req, res) => {
    let newBrand;
   
    if (req.files && req.files.length > 0) {
        newBrand = { 
            name: req.body.name ? req.body.name : null,
            description: req.body.description ? req.body.description : null,
            logo: req.files[0].filename,
        }        
      } else {
        newBrand = { 
            name: req.body.name,
            description: req.body.description,
            logo: null,
        }
      }
    try {
        const brand = await Brand.create(newBrand);
        res.status(201).json({success: true, msg: "Successfully created a brand."});
    } catch(err) {
        res.status(500).json({success: false, message: err.message});
    }

}

const getBrand = async (req, res) => {
    try {
        const brand = await Brand.find({_id: req.params.id});
        res.status(200).json({success: true, brand});
    } catch(err) {
        res.status(500).json({success: false, msg: err.message});
    }
}

const updateBrand = async(req, res) => {
    let brandToUpdate;
    try {
        brandToUpdate = await Brand.findOne({_id: req.params.id});
    } catch (err) {
        res.status(500).json({err});
    }
    
    let updatedObj = {
        description: req.body.description ? req.body.description : brandToUpdate.description
    };
    
    if (req.files && req.files.length > 0) {
        if(brandToUpdate.logo) {
            unlink(
                path.join(__dirname, `/../../public/uploads/brandLogo/${brandToUpdate.logo}`),
                (err) => {
                  if (err) console.log(err);
                }
              );            
        }
        updatedObj = {
            ...updatedObj,
            logo: req.files[0].filename,
        }
    }
    try {
        const {id:brandId} = req.params;
        const brand = await Brand.findOneAndUpdate({_id:brandId}, updatedObj, {new:true, runValidators:true, useFindAndModify:false});
        res.status(200).json({success: true, msg: "Successfully updated a brand.", brand});
    } catch (err) {
        res.status(500).json({ success: false, msg: err.message});
    }
}

const deleteBrand = async (req, res) => {
    try {
        const {id:brandId} = req.params;
        const brand = await Brand.findOneAndDelete({_id:brandId}, {useFindAndModify:false});
        res.status(200).json({success: true, msg: "Successfully deleted a brand."});
    } catch (err) {
        res.status(500).json({success: true, msg: err.message});
    }
}

module.exports = {
    getBrands,
    createBrand,
    getBrand,
    updateBrand,
    deleteBrand
}