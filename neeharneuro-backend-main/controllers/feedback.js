const Model = require('../models');
const ThisModel = Model.Feedback

const create = async (req, res) => {
   // #swagger.tags = ['Feedback']
/*
#swagger.parameters['body'] = {
    in: 'body', 
    '@schema': { 
        "required": ["Name", "Email_id", "Mobile_number", "Message"],
        "properties": { 
            "Name": { 
                "type": "string"
            },
            "Email_id": { 
                "type": "string"
            },
            "Mobile_number": { 
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
    const { Name, Email_id, Mobile_number, Message } = req.body;
    const date = new Date();
    console.log('Request Body:', req.body);
    const record = await ThisModel.create({
        Name,
        Email_id,
        Mobile_number,
        Message,
        Date : date
    });
    res.status(201).json(record);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
};

const getone = async(req,res) =>{
    // #swagger.tags = ['Feedback']
    try{
        const {feedback_id} = req.params;
        const feedback = await ThisModel.findOne({
            where: {feedback_id: feedback_id}
        });
        if (!feedback){
            return res.status(400).json({error:"Note not found"})
        }
        res.status(200).json(feedback)
    }catch(error){
        res.status(500).json({error:error.message})
    }
}


const getAll = async (req, res) => {
      // #swagger.tags = ['Feedback']
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
        console.error("Error fetching Feedback:", error);
        res.status(500).json({ error: "Failed to fetch Feedback." });
      }
    };


const update = async (req, res) => {
  // #swagger.tags = ['Feedback']
  try {
    const { feedback_id } = req.params;
    const { Name, Email_id, Mobile_number, Message } = req.body;
    const record  = await ThisModel.findByPk(feedback_id);
    if (record) {
      record.Name = Name;
      record.Email_id = Email_id;
      record.Mobile_number = Mobile_number;
      record.Message = Message;
      record.Date =  new Date
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
    // #swagger.tags = ['Feedback']
    try {
        const { feedback_id } = req.params;
    
        const deletedCount = await ThisModel.destroy({
            where: { feedback_id:feedback_id }
        });

        
        if (deletedCount === 0) {
            return next(new Error('No Feedback found with that ID'));
        }

        
        res.status(204).json({
            status: 'success',
            data: null,
        });
    } catch (error) {
        console.error('Error deleting Feedback:', error);
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
  