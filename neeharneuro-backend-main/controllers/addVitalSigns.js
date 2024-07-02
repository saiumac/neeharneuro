const Model = require('../models');
const ThisModel = Model.AddVitalsign

const create = async (req, res) => {
    // #swagger.tags = ['AddVitalsign']
  /*
  #swagger.parameters['body'] = {
      in: 'body', 
      description: 'Vital sign information',
      required: true,
      '@schema': { 
          "required": ["BP", "resp_rate", "weight", "pulse", "temperature"],
          "properties": { 
              "BP": { 
                  "type": "string"
              },
              "resp_rate": { 
                  "type": "string"
              },
              "weight": {
                  "type": "string"
              },
              "pulse": {
                  "type": "string"
                  
              },
              "temperature": {
                  "type": "string"
              }
          } 
      }
  }
  */

   try {
    const { BP, resp_rate, weight, pulse, temperature} = req.body;
    console.log('Request Body:', req.body);
    const record = await ThisModel.create({
        BP,
        resp_rate,
        weight,
        pulse,
        temperature
    });
    res.status(201).json(record);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
};


const getone = async (req, res) => {
  // #swagger.tags = ['AddVitalsign']
  try {
      const { add_vital_id } = req.params; 
  
      
      const record = await ThisModel.findOne({
        where: { add_vital_id: add_vital_id }
      });
  
      
      if (!record) {
        return res.status(404).json({ error: "Notification not found." });
      }
  
   
      res.status(200).json(record);
    } catch (error) {
      console.error("Error retrieving Notification:", error);
      res.status(500).json({ error: "Failed to retrieve Notification." });
    }
  };
  


const getAll = async (req, res) => {
      // #swagger.tags = ['AddVitalsign']
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
        console.error("Error fetching Notification:", error);
        res.status(500).json({ error: "Failed to fetch Notification." });
      }
    };


const update = async (req, res) => {
  // #swagger.tags = ['AddVitalsign']
  try {
    const { add_vital_id } = req.params;
    const {  BP, resp_rate, weight, pulse, temperature } = req.body;
    const record  = await ThisModel.findByPk(add_vital_id);
    if (record) {
      record.BP = BP;
      record.resp_rate = resp_rate;
      record.weight = weight;
      record.pulse = pulse;
      record.temperature = temperature;
      
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
  // #swagger.tags = ['AddVitalsign']
  try {
      const { add_vital_id } = req.params;
  
      const deletedCount = await ThisModel.destroy({
          where: { add_vital_id: add_vital_id }
      });

      
      if (deletedCount === 0) {
          return next(new Error('No Notification found with that ID'));
      }

      
      res.status(204).json({
          status: 'success',
          data: null,
      });
  } catch (error) {
      console.error('Error deleting Notification:', error);
      next(error); 
  }
};


module.exports = {
  create,
  getone,
  getAll,
  update,
  remove



};
  