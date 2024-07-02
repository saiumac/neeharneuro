const { errorMonitor } = require('nodemailer/lib/xoauth2');
const Model = require('../models');
const ThisModel = Model.Tablet
  
const addtablet = async (req, res) => {
    // #swagger.tags = ['Tablet']
    /*
      #swagger.parameters['body'] = {
        in: 'body', 
        '@schema': { 
          "required": ["tablet_name", "molecule_name", "doseage", "morning", "evening", "night", "time_taken", "time_taken_telugu", "instructions", "instructions_telugu"], 
          "properties": { 
            "tablet_name": { 
              "type": "string",
            },
            "molecule_name": { 
              "type": "string",
            },
            "doseage": {
              "type":"string"
            },
            "morning": {
              "type": "string",
            },
            "evening": {
              "type": "string",
            },
            "night": {
              "type": "string",
            },
            "time_taken": {
              "type": "string",
            },
            "time_taken_telugu": {
              "type": "string",
            },
            "instructions": {
              "type": "string",
            },
            "instructions_telugu": {
              "type": "string",
            },
          } 
        } 
      }
    */
    try {  
      const { tablet_name, molecule_name, doseage, morning, evening, night, time_taken, time_taken_telugu, instructions, instructions_telugu } = req.body;
      const newTablet = await ThisModel.create({
        tablet_name,
        molecule_name,
        doseage,
        morning,
        evening,
        night,
        time_taken,
        time_taken_telugu,
        instructions,
        instructions_telugu
      });
      res.status(200).json(newTablet);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

const updateTablet = async (req,res) =>{
    // #swagger.tags = ['Tablet']
  /*
    #swagger.parameters['body'] = {
      in: 'body', 
      '@schema': { 
        "required": ["tablet_name","molecule_name","doseage","morning","evening","night","time_taken","time_taken_telugu","instructions","instructions_telugu"], 
        "properties": { 
          "tablet_name": { 
            "type": "string",
          },
          "molecule_name": { 
            "type": "string",
          },
          "doseage":{
            "type":"string"
          },
          "morning":{
            "type": "string",
          },
          "evening":{
            "type": "string",
          },
          "night":{
            "type": "string",
          },
          "time_taken":{
            "type": "string",
          },
          "time_taken_telugu":{
            "type": "string",
          },
          "instruction":{
            "type": "string",
          },
          "instruction_telugu":{
            "type": "string",
          },
        } 
      } 
    }
  */
    try {
        const {id} = req.params;
        const { tablet_name, molecule_name, doseage, morning, evening, night, time_taken, time_taken_telugu, instructions, instructions_telugu } = req.body;
        const tablet = await ThisModel.findByPk(id);
        if (tablet) {
            tablet.tablet_name = tablet_name;
            tablet.molecule_name = molecule_name;
            tablet.doseage = doseage;
            tablet.morning = morning;
            tablet.evening = evening;
            tablet.night = night;
            tablet.time_taken = time_taken;
            tablet.time_taken_telugu = time_taken_telugu;
            tablet.instructions = tablet.instructions
            tablet.instructions_telugu = instructions_telugu;
            await tablet.save();
            res.status(200).json(tablet);
        }else {
            res.status(404).json({error: 'Tablet not found'})
        }
    }catch (error) {
        res.status(500).json({error: error.message});
    }
}

const getAll = async (req, res) => {
    // #swagger.tags = ['Tablet']
    try {
      const page = parseInt(req.query.page) || 1; 
      const limit = parseInt(req.query.limit) || 10; 
      const offset = (page - 1) * limit; 
      const tablet = await ThisModel.findAndCountAll({
        limit: limit,
        offset: offset
      });
      res.status(200).json({
        success: true,
        data: tablet.rows
        
      });
    } catch (error) {
      console.error("Error fetching Tablets:", error);
      res.status(500).json({ error: "Failed to fetch Tablets." });
    }
};


const getone = async (req, res) => {
  // #swagger.tags = ['Tablet']
  try {
      const { tablet_id } = req.params; 
      const tablet = await ThisModel.findOne({
        where: { tablet_id: tablet_id }
      });
      if (!tablet) {
        return res.status(404).json({ error: "Tablet not found." });
      }
      res.status(200).json(tablet);
    } catch (error) {
      console.error("Error retrieving Tablet:", error);
      res.status(500).json({ error: "Failed to retrieve Tablet." });
    }
};

const remove = async (req,res) =>{
  // #swagger.tags = ['Tablet']
  try {
    const { tablet_id} = req.params;
    const tablet = await ThisModel.findOne({where: {tablet_id : tablet_id}});
    if (!tablet) {
      return res.status(400).json({error:error.message})
    }
    await Model.TemplateTablet.destroy({ where: { tablet_id: tablet_id } });
    await tablet.destroy();
    res.status(200).json({success: true,message: "Tablets Deleted successfully"})
  }catch (error){
    res.status(500).json({error:error.message})
  }
}

module.exports = { addtablet , updateTablet, getAll, getone, remove};
