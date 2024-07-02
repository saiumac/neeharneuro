const Model = require('../models')
const ThisModel = Model.TemplatesDiagnosis
const TemplatesDiagnosisItem = Model.TemplatesDiagnosisItem

const createTemplate = async (req, res) => {
    // #swagger.tags = ['TemplateDiagnosis']
    /*
      #swagger.parameters['body'] = {
        in: 'body',
        '@schema': {
          "required": ["name"],
          "properties": {
            "name": {
              "type": "string"
            },
            "items": { 
              "type": "array",
              "description":"[{diagnosis_id},{diagnosis_id}]"
            },
          }
        }
      }
      */
      try {
        const { name, items } = req.body; 
        const newThisModel = await ThisModel.create({ name });
        
        console.log(items); 
        if (items) { 
            const itemPromises = items.map(({ diagnosis_id }) => {
                console.log({diagnosis_id});
                return TemplatesDiagnosisItem.create({ 
                    template_id: newThisModel.template_id, 
                    diagnosis_id
                });
            });
            await Promise.all(itemPromises); 
        }
        res.status(200).json(newThisModel);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  }


  const update = async (req,res) =>{
    // #swagger.tags = ['TemplateDiagnosis']
    /*
      #swagger.parameters['body'] = {
        in: 'body', 
        '@schema': { 
          "required": [], 
          "properties": { 
            "name": { 
                "type": "string",
            },
            "items": { 
                "type": "array",
                "description":"[{diagnosis_id},{diagnosis_id}]"
            },
          } 
        } 
      }
    */
      try {
        const { name, items } = req.body;

        await ThisModel.update({ name }, { where: { template_id: req.params.template_id } });

        
        await TemplatesDiagnosisItem.destroy({ where: { template_id: req.params.template_id } });

        
        if (items && items.length > 0) {
            const createPromises = items.map(({ diagnosis_id }) => {
                return TemplatesDiagnosisItem.create({
                    template_id: req.params.template_id,
                    diagnosis_id
                });
            });
            await Promise.all(createPromises);
        }

        res.status(200).json({ message: "Updated" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



const getAll = async (req, res) => {
  // #swagger.tags = ['TemplateDiagnosis']
  try {
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 10; 
    const offset = (page - 1) * limit; 
    const record = await TemplatesDiagnosisItem.findAndCountAll({
      limit: limit,
      offset: offset
    });
    res.status(200).json({
      success: true,
      data: record.rows
      
    });
  } catch (error) {
    console.error("Error fetching Template Tablets:", error);
    res.status(500).json({ error: "Failed to fetch Template Tablets." });
  }
};

const getone = async (req, res) => {
  // #swagger.tags = ['TemplateDiagnosis']
  /*
    #swagger.parameters['template_diagnosis_id'] = {
      in: 'path', 
      description: 'ID of the template diagnosis item', 
      required: true, 
      type: 'string'
    }
  */
    try {
      const { template_diagnosis_id } = req.params;
      console.log(`Fetching Template Diagnosis Item with ID: ${template_diagnosis_id}`); 
  
      if (!template_diagnosis_id) {
        return res.status(400).json({ error: 'Template Diagnosis ID is required' });
      }
  
      const record = await TemplatesDiagnosisItem.findOne({
        where: { template_diagnosis_id }
      });
  
      if (!record) {
        return res.status(404).json({ error: 'Template Diagnosis Item not found' });
      }
  
      res.status(200).json(record);
    } catch (error) {
      console.error('Error retrieving Template Diagnosis Item:', error); 
      res.status(500).json({ error: 'Failed to retrieve Template Diagnosis Item' });
    }
  };


const remove = async (req, res) => {
  // #swagger.tags = ['TemplateDiagnosis']
  /*
    #swagger.parameters['body'] = {
      in: 'body', 
      '@schema': { 
        "required": ["template_diagnosis_id"], 
        "properties": { 
          "template_diagnosis_id": { 
            "type": "string",
          }
        } 
      } 
    }
  */
  try {
    const { template_id } = req.params;
    const { template_diagnosis_id } = req.body;
    
    console.log(`Attempting to delete Template Tablet with ID: ${template_diagnosis_id}`); 

    if (!template_diagnosis_id) {
      return res.status(400).json({ error: 'Template Diagnosis ID is required' });
    }

    const record = await TemplatesDiagnosisItem.findOne({ where: { template_diagnosis_id: template_diagnosis_id, template_id: template_id } });

    if (!record) {
      return res.status(404).json({ error: 'Template not found' });
    }

    await record.destroy();
    res.status(200).json({ success: true, message: 'Template deleted successfully' });
  } catch (error) {
    console.error('Error deleting Template:', error); 
    res.status(500).json({ error: 'Failed to delete' });
  }
};

module.exports = {
  remove
};



module.exports = { createTemplate, update, getAll, getone, remove};