const Model = require('../models');
const ThisModel = Model.ReferralAppointment

const create = async (req, res) => {
   // #swagger.tags = ['ReferralAppointment']
/*
#swagger.parameters['body'] = {
    in: 'body',
    required: true,
    '@schema': { 
        "required": ["patient_Name", "Mobile_Number", "referral_doctor"],
        "properties": { 
            "patient_Name": {
                "type": "string",
                "maxLength": 255,
                "description": "The name of the patient"
            },
            "Mobile_Number": {
                "type": "integer",
                "description": "The mobile number of the patient"
            },
            "referral_doctor": {
                "type": "string",
                "maxLength": 255,
                "description": "The name of the referral doctor"
            }
        } 
    }
}
*/


   try {
    const { patient_Name, Mobile_Number, referral_doctor } = req.body;
    const date = new Date();
    console.log('Request Body:', req.body);
    const record = await ThisModel.create({
        patient_Name,
        Mobile_Number,
        referral_doctor,
        Appointment_status: true,
        Appointment_date: true,
        Date: date 
      


    });
    res.status(201).json(record);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
};

const getone = async(req,res) =>{
    // #swagger.tags = ['ReferralAppointment']
    try{
        const {referral_appointment_id} = req.params;
        console.log(`Received id: ${referral_appointment_id}`);
        const record = await ThisModel.findOne({
            where: {referral_appointment_id:referral_appointment_id}
            
        });
        if (!record){
            return res.status(400).json({error:"Note not found"})
        }
        res.status(200).json(record)
    }catch(error){
      console.error('Error:', error);
        res.status(500).json({error:error.message})
    }
}


const getAll = async (req, res) => {
      // #swagger.tags = ['ReferralAppointment']
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
        console.error("Error fetching ReferralAppointment:", error);
        res.status(500).json({ error: "Failed to fetch ReferralAppointment." });
      }
    };


const update = async (req, res) => {
  // #swagger.tags = ['ReferralAppointment']
  try {
    const { referral_appointment_id } = req.params;
    const { patient_Name, Mobile_Number, referral_doctor, Appointment_date, Appointment_status } = req.body;
    console.log(`Received referral_appointment_id: ${referral_appointment_id}`);
    console.log('Request body:', req.body);

    const record  = await ThisModel.findByPk(referral_appointment_id);
    if (record) {
      record.patient_Name = patient_Name;
      record.Mobile_Number = Mobile_Number;
      record.referral_doctor = referral_doctor;
      record.Appointment_status = Appointment_status;
      record.Appointment_date = Appointment_date;
      record.Date =  new Date
      await record.save();
      res.status(200).json(record);
    } else {
      console.error(`Record with id ${referral_appointment_id} not found`);
      res.status(404).json({ error: 'record not found' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
};
    

const remove = async (req, res, next) => {
    // #swagger.tags = ['ReferralAppointment']
    try {
      const { referral_appointment_id } = req.params;
  
      const deletedCount = await ThisModel.destroy({
          where: { referral_appointment_id:referral_appointment_id }
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
  