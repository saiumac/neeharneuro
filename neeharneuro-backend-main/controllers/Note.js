const { where } = require('sequelize');
const Model = require('../models')
const ThisModel = Model.Note

const create = async (req,res) =>{
    // #swagger.tags = ['Notes']
    /*
    #swagger.parameters['body'] = {
      in: 'body', 
      '@schema': { 
        "required": ["note_title","note_content"], 
        "properties": { 
          "note_title": { 
            "type": "string",
          },
          "note_content": { 
            "type": "string",
          },
        } 
      } 
    }
    */
    try {
        const {note_title, note_content} = req.body;
        const newNote = await ThisModel.create({
            note_title,
            note_content,
        });
        res.status(200).json(newNote);
    }catch(error){
        res.status(500).json({error:error.message})
    }
}

const update = async(req,res) =>{
    // #swagger.tags = ['Notes']
    /*
    #swagger.parameters['body'] = {
      in: 'body', 
      '@schema': { 
        "required": ["note_title","note_content"], 
        "properties": { 
          "note_title": { 
            "type": "string",
          },
          "note_content": { 
            "type": "string",
          },
        } 
      } 
    }
    */
    try {
        const {note_id} = req.params;
        const {note_title,note_content} =req.body;
        const note = await ThisModel.findByPk(note_id);
        if (note) {
            note.note_title = note_title;
            note.note_content = note_content;
            await note.save();
            res.status(200).json(note);
        }else{
            res.status(400).json({error:"Note not found"})
        }
    }catch(error){
        res.status(500).json({error: error.message})
    }
}

const getAll = async(req,res) =>{
    // #swagger.tags = ['Notes']
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const note  = await ThisModel.findAndCountAll({
            limit: limit,
            offset: offset
        });
        res.status(200).json({
            success:true,
            data: note
        });
    }catch (error){
        res.status(500).json({error:error.message})
    }
}

const getone = async(req,res) =>{
    // #swagger.tags = ['Notes']
    try{
        const {note_id} = req.params;
        const note = await ThisModel.findOne({
            where: {note_id: note_id}
        });
        if (!note){
            return res.status(400).json({error:"Note not found"})
        }
        res.status(200).json(note)
    }catch(error){
        res.status(500).json({error:error.message})
    }
}


const remove = async (req, res) => {
    // #swagger.tags = ['Notes']
    try {
      const { note_id } = req.params; 
      const note = await ThisModel.findOne({ where: { note_id: note_id } });
      if (!note) {
        return res.status(404).json({ error: "Note not found." });
      }
      await note.destroy();
      res.status(200).json({ success: true, message: "Note deleted successfully." });
    } catch (error) {
      console.error("Error deleting Note:", error);
      res.status(500).json({ error: "Failed to delete Note." });
    }
};

module.exports = {create,update,getAll,getone,remove}