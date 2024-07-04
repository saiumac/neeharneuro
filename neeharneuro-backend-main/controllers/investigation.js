
const Model = require('../models');
const Investigation = require('../models/Investigation');
const ThisModel = Model.Investigation


 

const create = async (req, res) => {
    // #swagger.tags = ['Investigation']
    /*
    #swagger.parameters['body'] = {
        in: 'body', 
        '@schema': { 
          "required": ["test_name", "test_description", "test_cost", "priority"],
            "properties": { 
                "test_name": { 
                    "type": "string",
                },
                "test_description": { 
                    "type": "string",
                },
                "test_cost" : {
                "type" : "string",
                },

                "priority": { 
                    "type": "string",   
                }
            } 
        } 
    }
    */
   try {
    const { test_name, test_description, test_cost, priority } = req.body;
    console.log('Request Body:', req.body);
    const record = await ThisModel.create({
      test_name,
      test_description, 
      test_cost, 
      priority
    });
    res.status(201).json(record);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
};



const get = async (req, res) => {
    // #swagger.tags = ['Investigation']
    try {
        const { id } = req.params; 
    
        
        const record = await ThisModel.findOne({
          where: { investigation_id: id }
        });
    
        
        if (!record) {
          return res.status(404).json({ error: "Investigation not found." });
        }
    
     
        res.status(200).json(record);
      } catch (error) {
        console.error("Error retrieving Investigation:", error);
        res.status(500).json({ error: "Failed to retrieve Investigation." });
      }
    };
    


const getAll = async (req, res) => {
        // #swagger.tags = ['Investigation']
        try {
          const page = parseInt(req.query.page) || 1; 
          const limit = parseInt(req.query.limit) || 10; 
          const offset = (page - 1) * limit; 
          const record = await ThisModel.findAndCountAll({
            limit: limit,
            offset: offset
          });
          res.status(200).json({
            success: true,
            data: record.rows
            
          });
        } catch (error) {
          console.error("Error fetching Investigation:", error);
          res.status(500).json({ error: "Failed to fetch Investigation." });
        }
      };


const update = async (req, res) => {
    // #swagger.tags = ['Investigation']
    try {
      const { id } = req.params;
      const { test_name, test_description, test_cost, priority} = req.body;
      const record  = await ThisModel.findByPk(id);
      if (Investigation) {
        record.test_name = test_name;
        record.test_description = test_description;
        record.test_cost = test_cost;
        record.priority = priority;
        await record.save();
        res.status(200).json(record);
      } else {
        res.status(404).json({ error: 'record not found' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: error.message });
    }
  };
      

  const remove = async (req, res, next) => {
    // #swagger.tags = ['Investigation']
    try {
        const { id } = req.params;
    
        const deletedCount = await ThisModel.destroy({
            where: { investigation_id: id }
        });

        
        if (deletedCount === 0) {
            return next(new Error('No investigation found with that ID'));
        }

        
        res.status(204).json({
            status: 'success',
            data: null,
        });
    } catch (error) {
        console.error('Error deleting investigation:', error);
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
    