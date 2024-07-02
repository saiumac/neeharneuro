const Model = require('../models');
const HealthTip = require('../models/HealthTip');
const ThisModel = Model.HealthTip

const create = async (req, res) => {
    // #swagger.tags = ['HealthTip']
/*
#swagger.parameters['body'] = {
    in: 'body', 
    '@schema': { 
        "required": ["Question", "Answer"],
        "properties": { 
            "Question": { 
                "type": "string"
            },
            "Answer": { 
                "type": "string"
            } 
        } 
    }
}
*/

   try {
    const { Question, Answer } = req.body;
    console.log('Request Body:', req.body);
    const record = await ThisModel.create({
      Question,
      Answer
    });
    res.status(201).json(record);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
};


const getone = async (req, res) => {
  // #swagger.tags = ['HealthTip']
  try {
      const { id } = req.params; 
  
      
      const record = await ThisModel.findOne({
        where: { health_id: id }
      });
  
      
      if (!record) {
        return res.status(404).json({ error: "HealthTip not found." });
      }
  
   
      res.status(200).json(record);
    } catch (error) {
      console.error("Error retrieving HealthTip:", error);
      res.status(500).json({ error: "Failed to retrieve HealthTip." });
    }
  };
  


const getAll = async (req, res) => {
      // #swagger.tags = ['HealthTip']
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
        console.error("Error fetching HealthTip:", error);
        res.status(500).json({ error: "Failed to fetch HealthTip." });
      }
    };


const update = async (req, res) => {
  // #swagger.tags = ['HealthTip']
  try {
    const { id } = req.params;
    const { Question, Answer } = req.body;
    const record  = await ThisModel.findByPk(id);
    if (HealthTip) {
      record.Question = Question;
      record.Answer = Answer;
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
  // #swagger.tags = ['HealthTip']
  try {
      const { id } = req.params;
  
      const deletedCount = await ThisModel.destroy({
          where: { health_id: id }
      });

      
      if (deletedCount === 0) {
          return next(new Error('No HealthTip found with that ID'));
      }

      
      res.status(204).json({
          status: 'success',
          data: null,
      });
  } catch (error) {
      console.error('Error deleting HealthTip:', error);
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
  