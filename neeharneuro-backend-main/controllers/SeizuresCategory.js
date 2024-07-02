const Model = require('../models')
const Complaints = Model.ComplaintsCategory
const Observations = Model.ObservationsCategory
const Diagnosis = Model.DiagnosisCategory

const create = async (req, res) => {
    // #swagger.tags = ['SeizureCategory']
    /*
      #swagger.parameters['body'] = {
        in: 'body',
        '@schema': {
          "required": [],
          "properties": {
            "complaints": {
              "type": "string"
            },
            "complaint_description": {
              "type": "string"
            },
            "observation": {
              "type": "string"
            },
            "diagnosis": {
              "type": "string"
            }
          }
        }
      }
    */
    try {
      const { complaints,complaint_description, observation, diagnosis } = req.body;
      const { treatment_category_id } = req.params;
  
      let newComplaint, newObservation, newDiagnosis;
      const response = {};
  
      // Create ComplaintsCategory if complaints is provided
      if (complaints) {
        newComplaint = await Complaints.create({
          treatment_category_id,
          complaint_name: complaints,
          complaint_description: complaint_description,
        });
        response.complaints = newComplaint;
      }
  
      if (observation) {
        newObservation = await Observations.create({
          treatment_category_id,
          observation_name: observation,
          color_id: 1,
        });
        response.observation = newObservation;
      }
      if (diagnosis) {
        newDiagnosis = await Diagnosis.create({
          treatment_category_id,
          diagnosis_name: diagnosis,
          color_id: 1,
        });
        response.diagnosis = newDiagnosis;
      }
  
      res.status(200).json(response);
    } catch (error) {
      console.error('Error creating categories:', error);
      res.status(500).json({ error: error.message });
    }
};

const update = async (req, res) => {
    // #swagger.tags = ['SeizureCategory']
    /*
      #swagger.parameters['body'] = {
        in: 'body',
        '@schema': {
          "required": [],
          "properties": {
            "complaints": {
              "type": "string"
            },
            "complaint_description": {
              "type": "string"
            },
            "observation": {
              "type": "string"
            },
            "diagnosis": {
              "type": "string"
            }
          }
        }
      }
    */
    try {
      const { complaints, complaint_description, observation, diagnosis } = req.body;
      const { treatment_category_id } = req.params;
  
      const response = {};
  
      // Update or Create ComplaintsCategory
      if (complaints) {
        let complaint = await Complaints.findOne({ where: { treatment_category_id } });
        if (complaint) {
          complaint = await complaint.update({ complaint_name: complaints, complaint_description });
        } else {
          complaint = await Complaints.create({ treatment_category_id, complaint_name: complaints, complaint_description });
        }
        response.complaints = complaint;
      }
  
      // Update or Create ObservationsCategory
      if (observation) {
        let observationRecord = await Observations.findOne({ where: { treatment_category_id } });
        if (observationRecord) {
          observationRecord = await observationRecord.update({ observation_name: observation, color_id: 1 });
        } else {
          observationRecord = await Observations.create({ treatment_category_id, observation_name: observation, color_id: 1 });
        }
        response.observation = observationRecord;
      }
  
      // Update or Create DiagnosisCategory
      if (diagnosis) {
        let diagnosisRecord = await Diagnosis.findOne({ where: { treatment_category_id } });
        if (diagnosisRecord) {
          diagnosisRecord = await diagnosisRecord.update({ diagnosis_name: diagnosis, color_id: 1 });
        } else {
          diagnosisRecord = await Diagnosis.create({ treatment_category_id, diagnosis_name: diagnosis, color_id: 1 });
        }
        response.diagnosis = diagnosisRecord;
      }
  
      res.status(200).json(response);
    } catch (error) {
      console.error('Error updating categories:', error);
      res.status(500).json({ error: error.message });
    }
};

const getAll = async (req, res) => {
    // #swagger.tags = ['SeizureCategory']
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const { include } = req.query; // Get selected categories from query params
  
      const categories = {};
  
      if (include.includes('complaints')) {
        categories.complaints = await Complaints.findAndCountAll({ limit, offset });
      }
      if (include.includes('observation')) {
        categories.observations = await Observations.findAndCountAll({ limit, offset });
      }
      if (include.includes('diagnosis')) {
        categories.diagnosis = await Diagnosis.findAndCountAll({ limit, offset });
      }
  
      res.status(200).json({
        success: true,
        data: categories
      });
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ error: error.message });
    }
};

const getone = async (req, res) => {
    // #swagger.tags = ['SeizureCategory']
    try {
      const { treatment_category_id } = req.params;
      const { include, complaint_id,observation_id,diagnosis_id} = req.query; // Get selected categories from query params
  
      const category = {};
  
      if (include.includes('complaints')) {
        category.complaints = await Complaints.findAll({ where: { treatment_category_id,complaint_id } });
      }
      if (include.includes('observation')) {
        category.observations = await Observations.findAll({ where: { treatment_category_id,observation_id } });
      }
      if (include.includes('diagnosis')) {
        category.diagnosis = await Diagnosis.findAll({ where: { treatment_category_id,diagnosis_id } });
      }
  
      if (!Object.keys(category).length) {
        return res.status(400).json({ error: "No categories found" });
      }
  
      res.status(200).json(category);
    } catch (error) {
      console.error("Error fetching category:", error);
      res.status500().json({ error: error.message });
    }
};  

const remove = async (req, res) => {
    // #swagger.tags = ['SeizureCategory']
    try {
      const { treatment_category_id } = req.params;
      const { include,complaint_id,observation_id,diagnosis_id } = req.query; // Get selected categories from query params
  
      const category = {};
  
      if (include.includes('complaints')) {
        category.complaints = await Complaints.findAll({ where: { treatment_category_id,complaint_id } });
      }
      if (include.includes('observation')) {
        category.observations = await Observations.findAll({ where: { treatment_category_id ,observation_id} });
      }
      if (include.includes('diagnosis')) {
        category.diagnosis = await Diagnosis.findAll({ where: { treatment_category_id,diagnosis_id } });
      }
  
      if (!Object.keys(category).length) {
        return res.status(404).json({ error: "No categories found." });
      }
  
      await Model.sequelize.transaction(async (t) => {
        if (category.complaints) await Complaints.destroy({ where: { treatment_category_id ,complaint_id}, transaction: t });
        if (category.observations) await Observations.destroy({ where: { treatment_category_id ,observation_id}, transaction: t });
        if (category.diagnosis) await Diagnosis.destroy({ where: { treatment_category_id ,diagnosis_id}, transaction: t });
      });
  
      res.status(200).json({ success: true, message: "Selected categories deleted successfully." });
    } catch (error) {
      console.error("Error deleting categories:", error);
      res.status(500).json({ error: "Failed to delete selected categories." });
    }
};
  
module.exports = {create,update,getAll,getone,remove}