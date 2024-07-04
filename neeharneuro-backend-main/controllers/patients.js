const Model = require('../models');
const ThisModel = Model.Patient

const create = async (req, res) => {
 // #swagger.tags = ['Patient']
  /*
  #swagger.parameters['body'] = {
    in: 'body', 
    '@schema': { 
        "required": ["patient_name", "gender", "age", "mobile_number", "email_id", 
        "blood_group", "locality", "pincode", 
        "secondary_mobile_no", "street_address", "city", "referred_by"],
        "properties": { 
            "patient_name": { 
                "type": "string"
            },
            "gender": { 
                "type": "string"
            },
            "age": { 
                "type": "integer"
            },
            "mobile_number": { 
                "type": "string"
            },
            "email_id": { 
                "type": "string"
            },
            "blood_group": { 
                "type": "string"
            },
            "locality": { 
                "type": "string"
            },
            "pincode": { 
                "type": "string"
            },
            "secondary_mobile_no": { 
                "type": "string"
            },
            "street_address": { 
                "type": "string"
            },
            "city": { 
                "type": "string"
            },
            "referred_by": { 
                "type": "string"
            }
        } 
    }
  }
  */

  try {
    const { 
      patient_name,
      gender,
      age,
      mobile_number,
      email_id, 
      blood_group,
      locality,
      pincode, 
      secondary_mobile_no,
      street_address,
      city,
      referred_by 
    } = req.body;
    
    console.log('Request Body:', req.body);
    
    const record = await ThisModel.create({
      patient_name,
      gender,
      age,
      mobile_number,
      email_id, 
      blood_group,
      locality,
      pincode, 
      secondary_mobile_no,
      street_address,
      city,
      referred_by
    });
    
    res.status(201).json(record);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
};



const getone = async(req,res) =>{
    // #swagger.tags = ['Patient']
    try{
        const {patient_id} = req.params;
        const record = await ThisModel.findOne({
            where: {patient_id: patient_id}
        });
        if (!record){
            return res.status(400).json({error:"Note not found"})
        }
        res.status(200).json(record)
    }catch(error){
        res.status(500).json({error:error.message})
    }
}


const getAll = async (req, res) => {
      // #swagger.tags = ['Patient']
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
        console.error("Error fetching Patient:", error);
        res.status(500).json({ error: "Failed to fetch Patient." });
      }
    };


const update = async (req, res) => {
  // #swagger.tags = ['Patient']
  try {
    const { patient_id } = req.params;
    const {  
        patient_name,
        gender,
        age,
        mobile_number,
        email_id, 
        blood_group,
        locality,
        pincode, 
        secondary_mobile_no,
        street_address,
        city,
        referred_by
     } = req.body;
    const record  = await ThisModel.findByPk(patient_id);
    if (record) {
      record.patient_name = patient_name;
      record.gender = gender;
      record.age = age;
      record.mobile_number = mobile_number;
      record.email_id =  email_id
      record.blood_group =  blood_group
      record.locality =  locality
      record.pincode =  pincode
      record.secondary_mobile_no =  secondary_mobile_no
      record.street_address =  street_address
      record.city =  city
      record.referred_by =  referred_by
      
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
    // #swagger.tags = ['Patient']
    try {
        const { patient_id } = req.params;
    
        const deletedCount = await ThisModel.destroy({
            where: { patient_id:patient_id }
        });

        
        if (deletedCount === 0) {
            return next(new Error('No Patient found with that ID'));
        }

        
        res.status(204).json({
            status: 'success',
            data: null,
        });
    } catch (error) {
        console.error('Error deleting Patient:', error);
        next(error); 
    }
};



const getNextPatient = async (req, res) => {
  // #swagger.tags = ['Patient']
  try {
    const { patient_id } = req.params;
    const currentPatient = await ThisModel.findByPk(patient_id);
    
    if (!currentPatient) {
      return res.status(404).json({ error: "Current patient not found" });
    }

    const nextPatient = await ThisModel.findOne({
      where: {
        patient_id: {
          [Model.Sequelize.Op.gt]: patient_id
        }
      },
      order: [['patient_id', 'ASC']]
    });

    if (!nextPatient) {
      return res.status(404).json({ error: "Next patient not found" });
    }

    res.status(200).json(nextPatient);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  create,
  getone,
  getAll,
  update,
  remove,
  getNextPatient



};
  