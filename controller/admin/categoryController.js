const Category = require('../../models/Category');

async function getCategories(req, res, next) {
    try {
        const categories = await Category.find({});
        res.status(200).json({ categories });       
    } catch (err) {
        res.status(500).json({ err });
    }
};

const createCategory = async (req, res) => {
    let newCategory;
   
    if (req.files && req.files.length > 0) {
        newCategory = { 
            name: req.body.name ? req.body.name : null,
            description: req.body.description ? req.body.description : null,
            avatar: req.files[0].filename,
            parent_id: req.body.parent_id ? req.body.parent_id : null
        }        
      } else {
        newCategory = { 
            name: req.body.name,
            description: req.body.description,
            avatar: null,
            parent_id: req.body.parent_id ? req.body.parent_id : null
        }
      }
    try {
        const category = await Category.create(newCategory);
        res.status(201).json({success: true, message: "Successfully created a category."});
    } catch(err) {
        res.status(500).json({success: false, message: err.message});
    }

}

const getCategory = async (req, res) => {
    try {
        const category = await Category.find({_id: req.params.id});
        res.status(200).json({success: true, category});
    } catch(err) {
        res.status(500).json({success: false, message: err.message});
    }
}

module.exports = {
    getCategories,
    createCategory,
    getCategory
}