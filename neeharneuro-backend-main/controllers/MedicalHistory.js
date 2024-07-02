const Model = require('../models')
const ThisModel = Model.MedicalHistory

const create = async (req,res) =>{
    // #swagger.tags = ['MedicalHistory']
    /*
    #swagger.parameters['body'] = {
      in: 'body', 
      '@schema': { 
        "required": ["medical_history_name"], 
        "properties": { 
          "medical_history_name": { 
            "type": "string",
          }
        } 
      } 
    }
    */
    try {
        const {medical_history_name} = req.body;
        const medicalhistory = await ThisModel.create({medical_history_name});
        res.status(200).json(medicalhistory)
    }catch(error){
        res.status(500).json({error:error.message})
    }
}

const update = async (req,res) =>{
    // #swagger.tags = ['MedicalHistory']
    /*
    #swagger.parameters['body'] = {
      in: 'body', 
      '@schema': { 
        "required": ["medical_history_name"], 
        "properties": { 
          "medical_history_name": { 
            "type": "string",
          }
        } 
      } 
    }
    */
    try {
        const {medical_history_id} = req.params;
        const {medical_history_name} = req.body;
        const medicalhistory = await ThisModel.findByPk(medical_history_id);
        if (medicalhistory) {
            medicalhistory.medical_history_name = medical_history_name;
            await medicalhistory.save();
            res.status(200).json(medicalhistory)
        }else {
            res.status(400).json({error:error.message})
        }
    }catch (error) {
        res.status(500).json({error:error.message})
    }
}

const getAll = async (req,res) =>{
    // #swagger.tags = ['MedicalHistory']
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit; 
        const medicalhistory = await ThisModel.findAndCountAll({
        limit: limit,
        offset: offset
        });
        res.status(200).json({
        success: true,
        data: medicalhistory
        
        });
    } catch (error) {
        console.error("Error fetching ReferalDoctors:", error);
        res.status(500).json({ error: "Failed to fetch ReferalDoctors." });
    }
}

const getone = async (req,res) => {
    // #swagger.tags = ['MedicalHistory']
    try {
    const { medical_history_id} = req.params;
    const medicalhistory = await ThisModel.findOne({
        where : {medical_history_id: medical_history_id}
    });
    if (!medicalhistory ) {
        return res.status(404).json({error:error.message})
    }
    res.status(200).json(medicalhistory)
    }catch (error) {
        res.status(500).json({error:error.message})
    }
}

const remove = async(req,res) => {
    // #swagger.tags = ['MedicalHistory']
    try {
        const { medical_history_id } = req.params;
        const medicalhistory = await ThisModel.findOne({where:{medical_history_id:medical_history_id}})
        if (!medicalhistory) {
            return res.status(404).json({error:error.message})
        }
        await medicalhistory.destroy();
        res.status(200).json({success:true,message:"Medical History Deleted successfully"})
    } catch (error){
        res.status(500).json({error:"Failed to delete MedicalHistory"})
    }
}

module.exports ={create,update,getAll,getone,remove}