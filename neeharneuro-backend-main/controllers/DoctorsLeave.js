const Model = require('../models');
const ThisModel = Model.DoctorsLeave;
const Doctor = Model.Doctor; // Import the Doctor model
const { body, validationResult } = require('express-validator');

const create = async (req, res) => {
  // #swagger.tags = ['DoctorsLeave']
  /*
    #swagger.parameters['data'] = {
      in: 'body', 
      '@schema': {
        "required": ["doctor_id", "leave_from", "leave_to"],
        "properties": {
          "doctor_id": {
            "type": "number",
          },
          "leave_from": {
            "type": "string",
            "description": "YYYY-MM-DD"
          },
          "leave_to": {
            "type": "string",
            "description": "YYYY-MM-DD"
          }
        } 
      } 
    }
  */
  await body('doctor_id').notEmpty().withMessage('Doctor ID is required').run(req);
  await body('leave_from').notEmpty().withMessage('Leave From is required').run(req);
  await body('leave_to').notEmpty().withMessage('Leave To is required').run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let firstError = errors.errors.map(error => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  
  try {
    const { doctor_id, leave_from, leave_to } = req.body;
    
    // Check if the doctor_id exists in the doctor table
    const doctorExists = await Doctor.findByPk(doctor_id);
    if (!doctorExists) {
      return res.status(400).json({ error: "Doctor ID does not exist in the doctor table." });
    }

    const leave = await ThisModel.create({ doctor_id, leave_from, leave_to });
    res.status(200).json(leave);
  } catch (error) {
    console.error('Error creating leave:', error);
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
    // #swagger.tags = ['DoctorsLeave']
    /*
      #swagger.parameters['data'] = {
        in: 'body', 
        '@schema': {
          "required": ["doctor_id", "leave_from", "leave_to"],
          "properties": {
            "doctor_id": {
              "type": "number",
            },
            "leave_from": {
              "type": "string",
              "description": "YYYY-MM-DD"
            },
            "leave_to": {
              "type": "string",
              "description": "YYYY-MM-DD"
            }
          } 
        } 
      }
    */
    try {
      const { doctor_leave_id } = req.params;
      const { doctor_id, leave_from, leave_to } = req.body;
      const leave = await ThisModel.findByPk(doctor_leave_id);
      if (!leave) {
        return res.status(404).json({ error: "Doctors Leave record not found." });
      }else{
        leave.doctor_id = doctor_id;
        leave.leave_from = leave_from;
        leave.leave_to = leave_to;
      }
      await leave.save();
      res.status(200).json(leave);
    } catch (error) {
      console.error('Error updating Doctors Leave:', error);
      res.status(500).json({ error: error.message });
    }
};
  

const getAll = async (req, res) => {
    // #swagger.tags = ['DoctorsLeave']
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
    // #swagger.tags = ['DoctorsLeave']
    try {
        const { doctor_leave_id } = req.params; 
        const leave = await ThisModel.findOne({
          where: { doctor_leave_id: doctor_leave_id }
        });
        if (!leave) {
          return res.status(404).json({ error: "Doctor Leave not found." });
        }
        res.status(200).json(leave);
      } catch (error) {
        console.error("Error retrieving Doctor Leave:", error);
        res.status(500).json({ error: "Failed to retrieve Doctor Leave." });
      }
};

const remove = async (req, res) => {
    // #swagger.tags = ['DoctorsLeave']
    try {
      const { doctor_leave_id } = req.params; 
      const leave = await ThisModel.findOne({ where: { doctor_leave_id: doctor_leave_id } });
      if (!leave) {
        return res.status(404).json({ error: "Doctor Leave not found." });
      }
      await leave.destroy();
      res.status(200).json({ success: true, message: "Doctor Leave deleted successfully." });
    } catch (error) {
      console.error("Error deleting Doctor Leave:", error);
      res.status(500).json({ error: "Failed to delete Doctor Leave." });
    }
  };

module.exports = { create ,update, getAll,getone , remove};
