const { INTEGER } = require('sequelize');
const Model = require('../models');
const ThisModel = Model.Diagnosis


 

const create = async (req, res) => {
    // #swagger.tags = ['Diagnosis']
    /*
    #swagger.parameters['body'] = {
        in: 'body', 
        '@schema': { 
          "required": ["name","category","priority"],
            "properties": { 
                "name": { 
                    "type": "string",
                },
                "category": { 
                    "type": "string",
                },
                "priority": { 
                    "type": "string",   
                }
            } 
        } 
    }
    */
    try {
        const { name, category, priority } = req.body;
    
        if (!name || !category || !priority) {
          return res.status(400).json({
            success: false,
            message: 'Please provide name, category, and priority.'
          });
        }
    
        req.body["status"] = 1
        const record = await ThisModel.create(req.body);
    
        console.log('New Diagnosis created:', record);
    
        res.status(201).json({
          success: true,
          record 
        });
      } catch (error) {
        console.error('Error creating Diagnosis:', error);
        res.status(500).json({
          success: false,
          message: 'Failed to create Diagnosis.',
          error: error.message
        });
      }
    };
    


const get = async (req, res) => {
    // #swagger.tags = ['Diagnosis']
    try {
        const {diagnosis_id } = req.params; 
    
        
        const diagnosis = await ThisModel.findOne({
          where: { diagnosis_id:diagnosis_id }
        });
    
        
        if (!diagnosis) {
          return res.status(404).json({ error: "Diagnosis not found." });
        }
    
     
        res.status(200).json(diagnosis);
      } catch (error) {
        console.error("Error retrieving diagnosis:", error);
        res.status(500).json({ error: "Failed to retrieve diagnosis." });
      }
    };
    


const getAll = async (req, res) => {
        // #swagger.tags = ['Diagnosis']
        try {
          const page = parseInt(req.query.page) || 1; 
          const limit = parseInt(req.query.limit) || 10; 
      
          const offset = (page - 1) * limit; 
      
        
          const diagnoses = await ThisModel.findAndCountAll({
            limit: limit,
            offset: offset
          });
      

          const totalPages = Math.ceil(diagnoses.count / limit);
      
          res.status(200).json({
            success: true,
            data: diagnoses.rows
            
          });
        } catch (error) {
          console.error("Error fetching diagnoses:", error);
          res.status(500).json({ error: "Failed to fetch diagnoses." });
        }
      };


const update = async (req, res) => {
    // #swagger.tags = ['Diagnosis']
    try {
        const {diagnosis_id } = req.params;
        const { name, category, priority } = req.body;


        const diagnosis = await ThisModel.findOne({ where: { diagnosis_id:diagnosis_id } });

        if (!diagnosis) {
        return res.status(404).json({ error: "Diagnosis not found." });
        }

        
        diagnosis.name = name !== undefined ? name : diagnosis.name;
        diagnosis.category = category !== undefined ? category : diagnosis.category;
        diagnosis.priority = priority !== undefined ? priority : diagnosis.priority;

        await diagnosis.save();

        res.status(200).json({ success: true, data: diagnosis });
    } catch (error) {
        console.error("Error updating diagnosis:", error);
        res.status(500).json({ error: "Failed to update diagnosis." });
    }
};
      

const remove = async (req, res) => {
        // #swagger.tags = ['Diagnosis']
        try {
          const {diagnosis_id } = req.params;
      
          const deletedCount = await ThisModel.destroy({
              where: { diagnosis_id:diagnosis_id }
          });
  
          
          if (deletedCount === 0) {
              return next(new Error('No diagnosis found with thatdiagnosis_id'));
          }
  
          
          res.status(204).json({
              status: 'success',
              data: null,
          });
      } catch (error) {
          console.error('Error deleting diagnosis:', error);
          next(error); 
      }
  };

module.exports = {
    create,
    get,
    getAll,
    update,
    remove



};
    