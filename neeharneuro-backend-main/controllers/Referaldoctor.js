const  Model  = require('../models');
const ThisModel = Model.Referaldoctor

const createReferaldoctor = async (req, res) => {
    // #swagger.tags = ['ReferalDoctor']
    /*
    #swagger.parameters['body'] = {
      in: 'body', 
      '@schema': { 
        "required": ["name","email_id","mobile_no","location"], 
        "properties": { 
          "name": { 
            "type": "string",
          },
          "email_id": { 
            "type": "string",
          },
          "mobile_no":{
            "type":"string"
          },
          "location":{
            "type": "string",
          },
        } 
      } 
    }
    */
  try {
    const { name, email_id, mobile_no, location } = req.body;
    console.log('Request Body:', req.body);
    const newDoctor = await ThisModel.create({
      name,
      email_id,
      mobile_no,
      location
    });
    res.status(201).json(newDoctor);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
};

const updateReferaldoctor = async (req, res) => {
    // #swagger.tags = ['ReferalDoctor']
    /*
    #swagger.parameters['body'] = {
      in: 'body', 
      '@schema': { 
        "required": ["name","email_id","mobile_no","location"], 
        "properties": { 
          "name": { 
            "type": "string",
          },
          "email_id": { 
            "type": "string",
          },
          "mobile_no":{
            "type":"string"
          },
          "location":{
            "type": "string",
          },
        } 
      } 
    }
    */
  try {
    const { id } = req.params;
    const { name, email_id, mobile_no, location } = req.body;
    const doctor = await ThisModel.findByPk(id);
    if (doctor) {
      doctor.name = name;
      doctor.email_id = email_id;
      doctor.mobile_no = mobile_no;
      doctor.location = location;
      await doctor.save();
      res.status(200).json(doctor);
    } else {
      res.status(404).json({ error: 'Referaldoctor not found' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
};

const getAll = async (req, res) => {
  // #swagger.tags = ['ReferalDoctor']
  try {
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 10; 
    const offset = (page - 1) * limit; 
    const doctor = await ThisModel.findAndCountAll({
      limit: limit,
      offset: offset
    });
    res.status(200).json({
      success: true,
      data: doctor.rows
      
    });
  } catch (error) {
    console.error("Error fetching ReferalDoctors:", error);
    res.status(500).json({ error: "Failed to fetch ReferalDoctors." });
  }
};

const getone = async (req, res) => {
  // #swagger.tags = ['ReferalDoctor']
  try {
    const { ref_doctor_id } = req.params;
    const doctor = await ThisModel.findOne({ where: { ref_doctor_id: ref_doctor_id } });
    if (!doctor) {
      return res.status(404).json({ error: 'ReferalDoctor not found' });
    }
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  // #swagger.tags = ['ReferalDoctor']
  try {
    const { ref_doctor_id } = req.params;
    const doctor = await ThisModel.findOne({ where: { ref_doctor_id: ref_doctor_id } });
    if (!doctor) {
      return res.status(404).json({ error: 'Referal Doctor not found' });
    }
    await doctor.destroy();
    res.status(200).json({ success: true, message: 'Referal Doctor deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {createReferaldoctor,updateReferaldoctor,getAll,getone,remove}