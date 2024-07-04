const Model = require('../models')
const ThisModel = Model.DateText

const create = async (req,res) =>{
    // #swagger.tags = ['DateText']
    /*
      #swagger.parameters['body'] = {
        in: 'body',
        '@schema': {
          "required": ["text"],
          "properties": {
            "text": {
              "type": "string"
            }
          }
        }
      }
      */
        try {
            const datetext = await ThisModel.create(req.body);
            res.status(200).json(datetext);
        }catch(error) {
            res.status(500).json({error:error.message})
        }
}

const update = async (req,res) => {
    // #swagger.tags = ['DateText']
    /*
      #swagger.parameters['body'] = {
        in: 'body',
        '@schema': {
          "required": ["text"],
          "properties": {
            "text": {
              "type": "string"
            }
          }
        }
      }
      */
        try { 
            const {date_text_id} = req.params;
            const {text} = req.body;
            const datetext = await ThisModel.findByPk(date_text_id);
            if (datetext) {
                datetext.text = text;
                await datetext.save();
                res.status(200).json(datetext);
            }else {
                res.status(400).json({error: "Date Text not found"})
            }
        }catch (error) {
            res.status(500).json({error:error.message})
        }
}

const getAll = async (req,res) =>{
    // #swagger.tags = ['DateText']
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page -1)*limit;
        const datetext = await ThisModel.findAndCountAll({
            limit: limit,
            offset: offset
        });
        res.status(200).json({
            success: true,
            data: datetext
        });
    }catch (error) {
        res.status(500).json({error:error.message})
    }
}

const getone = async (req,res) =>{
    // #swagger.tags = ['DateText']
    try {
        const {date_text_id} = req.params;
        const datetext = await ThisModel.findOne({where: {date_text_id:date_text_id}});
        if (!datetext) {
            return res.status(400).json({error:"Date Text cannot be found"})
        }
        res.status(200).json(datetext)
    }catch (error) {
        res.status(500).json({error:error.message})
    }
}

const remove = async(req,res) =>{
    // #swagger.tags = ['DateText']
    try {
        const {date_text_id} = req.params;
        const datetext = await ThisModel.findOne({where: {date_text_id:date_text_id}});
        if (!datetext) {
            return res.status(400).json({error: "DateText not found"})
        }
        await datetext.destroy();
        res.status(200).json({success:true,message:"DateText Deleted successfully"})
    }catch (error) {
        res.status(500).json({error:error.message})
    }
}

module.exports = {create,update,getAll,getone,remove}