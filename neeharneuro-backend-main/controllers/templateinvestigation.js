const Model = require('../models')
const ThisModel = Model.InvestigationTemplate
const InvestigationTestTemplate = Model.InvestigationTestTemplate

const createTemplate = async (req, res) => {
    // #swagger.tags = ['InvestigationTemplate']
    /*
      #swagger.parameters['body'] = {
        in: 'body',
        '@schema': {
          "required": ["name"],
          "properties": {
            "name": {
              "type": "string"
            },
            "test": { 
              "type": "array",
              "description":"[{investigation_id},{investigation_id}]"
            },
          }
        }
      }
      */
      try {
        const { name, test } = req.body; 
        const newThisModel = await ThisModel.create({ name });
        
        console.log(test); 
        if (test) { 
            const testPromises = test.map(({ investigation_id }) => {
                console.log({investigation_id});
                return InvestigationTestTemplate.create({ 
                    template_id: newThisModel.template_id, 
                    investigation_id
                });
            });
            await Promise.all(testPromises); 
        }
        res.status(200).json(newThisModel);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  }


  const update = async (req,res) =>{
    // #swagger.tags = ['InvestigationTemplate']
    /*
      #swagger.parameters['body'] = {
        in: 'body',
        '@schema': {
          "required": ["name"],
          "properties": {
            "name": {
              "type": "string"
            },
            "test": { 
              "type": "array",
              "description":"[{investigation_id},{investigation_id}]"
            },
          }
        }
      }
      */
      try {
        const { name, test } = req.body;

        await ThisModel.update({ name }, { where: { template_id: req.params.template_id } });

        
        await InvestigationTestTemplate.destroy({ where: { template_id: req.params.template_id } });

        
        if (test && test.length > 0) {
            const createPromises = items.map(({ investigation_id }) => {
                return InvestigationTestTemplate.create({
                    template_id: req.params.template_id,
                    investigation_id
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
  // #swagger.tags = ['InvestigationTemplate']
  try {
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 10; 
    const offset = (page - 1) * limit; 
    const record = await InvestigationTestTemplate.findAndCountAll({
      limit: limit,
      offset: offset
    });
    res.status(200).json({
      success: true,
      data: record.rows
      
    });
  } catch (error) {
    console.error("Error fetching Template :", error);
    res.status(500).json({ error: "Failed to fetch Template." });
  }
};

const getone = async (req, res) => {
   // #swagger.tags = ['InvestigationTemplate']
  /*
    #swagger.parameters['test_template_id'] = {
      in: 'path', 
      description: 'ID of the template diagnosis item', 
      required: true, 
      type: 'string'
    }
  */
    try {
      const { test_template_id } = req.params;
      console.log(`Fetching InvestigationTestTemplate with ID: ${test_template_id}`); 
  
      if (!test_template_id) {
        return res.status(400).json({ error: 'InvestigationTestTemplate is required' });
      }
  
      const record = await InvestigationTestTemplate.findOne({
        where: { test_template_id }
      });
  
      if (!record) {
        return res.status(404).json({ error: 'InvestigationTestTemplate not found' });
      }
  
      res.status(200).json(record);
    } catch (error) {
      console.error('Error retrieving InvestigationTestTemplate:', error); 
      res.status(500).json({ error: 'Failed to retrieve InvestigationTestTemplate' });
    }
  };


const remove = async (req, res) => {
  // #swagger.tags = ['InvestigationTemplate']
  /*
    #swagger.parameters['body'] = {
      in: 'body', 
      '@schema': { 
        "required": ["test_template_id"], 
        "properties": { 
          "test_template_id": { 
            "type": "string",
          }
        } 
      } 
    }
    */
    try {
      const { template_id } = req.params;
      const { test_template_id } = req.body;
      
      console.log(`Attempting to delete Template Tablet with ID: ${test_template_id}`); 
  
      if (!test_template_id) {
        return res.status(400).json({ error: 'Template Diagnosis ID is required' });
      }
  
      const record = await InvestigationTestTemplate.findOne({ where: { test_template_id: test_template_id, template_id: template_id } });
  
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



module.exports = { createTemplate, update, getAll, getone, remove};