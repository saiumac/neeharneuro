const Model = require('../models');
const ThisModel = Model.BookAppointment;
const BlockedSlot = Model.BlockedSlot;
const Patient = Model.Patient;
const AppointmentSlot = Model.AppointmentSlot

const create = async (req, res) => {
    // #swagger.tags = ['BookAppointment']
    /*
      #swagger.parameters['body'] = {
        in: 'body',
        '@schema': {
          "required": ["patient_id", "select_date", "name", "reference", "reason_for_consultation", "appointment_type", "consultation_type", "appointment_id"],
          "properties": {
            "patient_id": { "type": "integer" },
            "select_date": { "type": "string", "format": "date" },
            "name": { "type": "string" },
            "reference": { "type": "string", "enum": ["Direct", "Referral Doctor", "Practo", "JD"] },
            "reason_for_consultation": { "type": "string" },
            "appointment_type": { "type": "string", "enum": ["New", "Review"] },
            "consultation_type": { "type": "string", "enum": ["Doctor visit", "Video Consultation"] },
            "appointment_id": { "type": "integer" }
          }
        }
      }
    */
    try {
      const { patient_id, select_date, name, reference, reason_for_consultation, appointment_type, consultation_type, appointment_id } = req.body;
  
      // Fetch patient details using patient_id
      const patient = await Patient.findByPk(patient_id);
  
      if (!patient) {
        return res.status(404).json({ error: "Patient not found." });
      }
  
      const patient_name = patient.patient_name;
      const mobile_number = patient.mobile_number;
      const email_id = patient.email_id;
  
      // Validate appointment_id
      const appointmentSlot = await AppointmentSlot.findByPk(appointment_id);
  
      if (!appointmentSlot) {
        return res.status(404).json({ error: "Appointment slot not found." });
      }
  
      // Create book appointment
      const bookAppointment = await ThisModel.create({
        patient_id,
        patient_name,
        mobile_number,
        email_id,
        select_date,
        name,
        reference,
        reason_for_consultation,
        appointment_type,
        consultation_type,
        appointment_id
      });
  
      // Create blocked slot with concatenated appointment_id and book_appointment_id
      const blockedSlot = await BlockedSlot.create({
        date: select_date,
        appointment_id,
        slots: `${appointment_id}-${bookAppointment.book_appointment_id}`
      });
  
      res.status(201).json({ bookAppointment, blockedSlot });
    } catch (error) {
      console.error('Error creating book appointment:', error);
      res.status(500).json({ error: error.message });
    }
};
  
const update = async (req, res) => {
    // #swagger.tags = ['BookAppointment']
    /*
      #swagger.parameters['body'] = {
        in: 'body',
        '@schema': {
          "required": [],
          "properties": {
            "select_date": { "type": "string", "format": "date" },
            "name": { "type": "string" },
            "reference": { "type": "string", "enum": ["Direct", "Referral Doctor", "Practo", "JD"] },
            "reason_for_consultation": { "type": "string" },
            "appointment_type": { "type": "string", "enum": ["New", "Review"] },
            "consultation_type": { "type": "string", "enum": ["Doctor visit", "Video Consultation"] },
            "appointment_id": { "type": "integer" }
          }
        }
      }
    */
    try {
      const { book_appointment_id } = req.params;
      const { select_date, name, reference, reason_for_consultation, appointment_type, consultation_type, appointment_id } = req.body;
  
      const bookAppointment = await ThisModel.findByPk(book_appointment_id);
  
      if (!bookAppointment) {
        return res.status(404).json({ error: 'BookAppointment not found' });
      }
  
      const updatedAppointment = await bookAppointment.update({
        select_date,
        name,
        reference,
        reason_for_consultation,
        appointment_type,
        consultation_type,
        appointment_id
      });
  
      res.status(200).json(updatedAppointment);
    } catch (error) {
      console.error('Error updating book appointment:', error);
      res.status(500).json({ error: error.message });
    }
};

const getAll = async (req, res) => {
    // #swagger.tags = ['BookAppointment']
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


const getone = async (req, res) => {
    // #swagger.tags = ['BookAppointment']
    try {
      const { book_appointment_id } = req.params;
      const appointment = await ThisModel.findByPk(book_appointment_id);
  
      if (!appointment) {
        return res.status(404).json({ error: 'BookAppointment not found' });
      }
  
      res.status(200).json(appointment);
    } catch (error) {
      console.error('Error fetching book appointment:', error);
      res.status(500).json({ error: error.message });
    }
};

const remove = async (req, res) => {
    // #swagger.tags = ['BookAppointment']
    try {
      const { book_appointment_id } = req.params;
  
      const appointment = await ThisModel.findByPk(book_appointment_id);
  
      if (!appointment) {
        return res.status(404).json({ error: 'BookAppointment not found' });
      }
  
      await appointment.destroy();
      res.status(204).json({success: true,message:"Deleted Successfully"});
    } catch (error) {
      console.error('Error deleting book appointment:', error);
      res.status(500).json({ error: error.message });
    }
};


module.exports = {create,update,getAll,getone,remove}  