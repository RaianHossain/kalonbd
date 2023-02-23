const Category = require('../../models/admin/Category');
const path = require("path");
const { unlink } = require("fs");

const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({});
        res.status(200).json({ categories });       
    } catch (err) {
        res.status(500).json({ err });
    }
};

const createCategory = async (req, res) => {
    let newCategory = {
        name: req.body.name ? req.body.name : null,
        description: req.body.description ? req.body.description : null,        
        parent_id: req.body.parent_id ? req.body.parent_id : null,
        createdBy: req.body.user.id ? req.body.user.id : null,
    };
   
    if (req.files && req.files.length > 0) {
        newCategory = { 
            ...newCategory,
            avatar: req.files[0].filename,
        }        
      } else {
        newCategory = { 
            ...newCategory,
            avatar: null,
        }
      }
    try {
        const category = await Category.create(newCategory);
        res.status(201).json({success: true, msg: "Successfully created a category."});
    } catch(err) {
        res.status(500).json({success: false, message: err.message});
    }

}

const getCategory = async (req, res) => {
    try {
        const category = await Category.find({_id: req.params.id});
        res.status(200).json({success: true, category});
    } catch(err) {
        res.status(500).json({success: false, msg: err.message});
    }
}

const updateCategory = async(req, res) => {
    let categoryToUpdate;
    try {
        categoryToUpdate = await Category.findOne({_id: req.params.id});
    } catch (err) {
        res.status(500).json({err});
    }
    
    let updatedObj = {
        parent_id: req.body.parent_id ? req.body.parent_id : categoryToUpdate.parent_id,
        description: req.body.description ? req.body.description : categoryToUpdate.parent_id,
        updatedBy: req.body.user.id ? req.body.user.id : null,
    };
    
    if (req.files && req.files.length > 0) {
        if(categoryToUpdate.avatar) {
            unlink(
                path.join(__dirname, `/../../public/uploads/categoryAvatar/${categoryToUpdate.avatar}`),
                (err) => {
                  if (err) console.log(err);
                }
              );            
        }
        updatedObj = {
            ...updatedObj,
            avatar: req.files[0].filename,
        }
    }
    try {
        const {id:categoryId} = req.params;
        const category = await Category.findOneAndUpdate({_id:categoryId}, updatedObj, {new:true, runValidators:true, useFindAndModify:false});
        res.status(200).json({success: true, msg: "Successfully updated a category.", category});
    } catch (err) {
        res.status(500).json({ success: false, msg: err.message});
    }
}

const deleteCategory = async (req, res) => {
    try {
        const {id:categoryId} = req.params;
        const category = await Category.findOneAndDelete({_id:categoryId}, {useFindAndModify:false});
        res.status(200).json({success: true, msg: "Successfully deleted a category."});
    } catch (err) {
        res.status(500).json({success: true, msg: err.message});
    }
}

module.exports = {
    getCategories,
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory
}