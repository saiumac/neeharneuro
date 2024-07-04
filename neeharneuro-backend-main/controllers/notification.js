const Model = require('../models');
const ThisModel = Model.Notification

const create = async (req, res) => {
    // #swagger.tags = ['Notification']
/*
#swagger.parameters['body'] = {
    in: 'body', 
    '@schema': { 
        "required": ["Title", "Message"],
        "properties": { 
            "Title": { 
                "type": "string"
            },
            "Message": { 
                "type": "string"
            } 
        } 
    }
}
*/

   try {
    const { Title, Message } = req.body;
    console.log('Request Body:', req.body);
    const record = await ThisModel.create({
        Title, 
        Message
    });
    res.status(201).json(record);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
};


const getone = async (req, res) => {
  // #swagger.tags = ['Notification']
  try {
      const { id } = req.params; 
  
      
      const record = await ThisModel.findOne({
        where: { notification_id: id }
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
      // #swagger.tags = ['Notification']
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
  // #swagger.tags = ['Notification']
  try {
    const { id } = req.params;
    const { Title, Message } = req.body;
    const record  = await ThisModel.findByPk(id);
    if (record) {
      record.Title = Title;
      record.Message = Message;
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
  // #swagger.tags = ['Notification']
  try {
      const { id } = req.params;
  
      const deletedCount = await ThisModel.destroy({
          where: { notification_id: id }
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
  