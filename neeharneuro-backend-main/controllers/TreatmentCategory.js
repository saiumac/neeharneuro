const Model = require('../models')
const ThisModel = Model.TreatmentCategory
const Complaints = Model.ComplaintsCategory
const Observations = Model.ObservationsCategory
const Diagnosis = Model.DiagnosisCategory

const create = async(req,res) =>{
    // #swagger.tags = ['TreatmentCategory']
    /*
      #swagger.parameters['body'] = {
        in: 'body',
        '@schema': {
          "required": ["category_name"],
          "properties": {
            "category_name": {
              "type": "string"
            }
          }
        }
      }
      */
        try {
            const {category_name} = req.body;
            const category = await ThisModel.create({category_name});
            res.status(200).json(category);
        }catch(error){
            res.status(500).json({error:error.message})
        }
}

const update = async(req,res) =>{
    // #swagger.tags = ['TreatmentCategory']
    /*
    #swagger.parameters['body'] = {
      in: 'body', 
      '@schema': { 
        "required": ["category_name"], 
        "properties": { 
          "category_name": { 
            "type": "string",
          }
        } 
      } 
    }
    */
    try {
        const {treatment_category_id} = req.params;
        const {category_name} =req.body;
        const category = await ThisModel.findByPk(treatment_category_id);
        if (category) {
            category.category_name = category_name;
            await category.save();
            res.status(200).json(category);
        }else{
            res.status(400).json({error:"Treatment Category not found"})
        }
    }catch(error){
        res.status(500).json({error: error.message})
    }
}

const getAll = async(req,res) =>{
    // #swagger.tags = ['TreatmentCategory']
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const category  = await ThisModel.findAndCountAll({
            limit: limit,
            offset: offset
        });
        res.status(200).json({
            success:true,
            data: category
        });
    }catch (error){
        res.status(500).json({error:error.message})
    }
}

const getone = async(req,res) =>{
    // #swagger.tags = ['TreatmentCategory']
    try{
        const {treatment_category_id} = req.params;
        const category = await ThisModel.findOne({
            where: {treatment_category_id: treatment_category_id}
        });
        if (!category){
            return res.status(400).json({error:"TreatmentCategory not found"})
        }
        res.status(200).json(category)
    }catch(error){
        res.status(500).json({error:error.message})
    }
}


const remove = async (req, res) => {
    // #swagger.tags = ['TreatmentCategory']
    try {
      const { treatment_category_id } = req.params; 
      const category = await ThisModel.findOne({ where: { treatment_category_id: treatment_category_id } });
      if (!category) {
        return res.status(404).json({ error: "TreatmentCategory not found." });
      }
      await category.destroy();
      res.status(200).json({ success: true, message: "TreatmentCategory deleted successfully." });
    } catch (error) {
      console.error("Error deleting Note:", error);
      res.status(500).json({ error: "Failed to delete TreatmentCategory." });
    }
};

module.exports = {create,update,getAll,getone,remove}