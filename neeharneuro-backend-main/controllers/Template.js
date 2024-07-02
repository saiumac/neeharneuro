const Model = require('../models')
const Template = Model.Template
const TemplateTablet = Model.TemplateTablet

const createTemplate = async (req,res) => {
    // #swagger.tags = ['TemplateTablet']
    /*
      #swagger.parameters['body'] = {
        in: 'body',
        '@schema': {
          "required": ["name"],
          "properties": {
            "name": {
              "type": "string"
            },
            "tablets": { 
              "type": "array",
              "description":"[{tablet_id},{tablet_id}]"
            },
          }
        }
      }
      */
     try {
        const {name} = req.body;
        const newTemplate = await Template.create({ name });

        let tablets = req.body.tablets
        console.log(tablets)
        if(tablets){
          const Tablets = tablets.map(({ tablet_id }) => {
            console.log({tablet_id})
              return TemplateTablet.create({ 
                    template_id:newTemplate.template_id,
                    tablet_id
                  });
          });
          await Promise.all(Tablets);
        }
        res.status(200).json(newTemplate)
     }catch (error){
        res.status(500).json({error: error.message});
     }
}


const update = async (req,res) =>{
    // #swagger.tags = ['TemplateTablet']
    /*
      #swagger.parameters['body'] = {
        in: 'body', 
        '@schema': { 
          "required": [], 
          "properties": { 
            "name": { 
                "type": "string",
            },
            "tablets": { 
                "type": "array",
                "description":"[{tablet_id},{tablet_id}]"
            },
          } 
        } 
      }
    */
    try {
        const temp = await Template.update(req.body,{where:{template_id:req.params.template_id}});
        let tablets = req.body.tablets
        if(tablets){
            await TemplateTablet.destroy({where:{template_id:req.params.template_id}})
            const Tablets = tablets.map(({ tablet_id }) => {
                return TemplateTablet.create({ 
                    template_id:req.params.template_id,
                    tablet_id
                });
            });
            await Promise.all(Tablets);
        }

        res.status(200).json({message:"Updated"})
    }catch (error){
        res.status(500).json({error: error.message});
    }
}

const getAll = async (req, res) => {
  // #swagger.tags = ['TemplateTablet']
  try {
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 10; 
    const offset = (page - 1) * limit; 
    const template = await TemplateTablet.findAndCountAll({
      limit: limit,
      offset: offset
    });
    res.status(200).json({
      success: true,
      data: template.rows
      
    });
  } catch (error) {
    console.error("Error fetching Template Tablets:", error);
    res.status(500).json({ error: "Failed to fetch Template Tablets." });
  }
};

const getone = async (req, res) => {
  // #swagger.tags = ['TemplateTablet']
  /*
    #swagger.parameters['body'] = {
      in: 'body', 
      '@schema': { 
        "required": ["template_tablet_id"], 
        "properties": { 
          "template_tablet_id": { 
            "type": "string",
          }
        } 
      } 
    }
    */
  try {
    const { template_tablet_id } = req.params;
    console.log(`Fetching Template Tablet with ID: ${template_tablet_id}`); // Debugging line

    // Ensure template_tablet_id is not undefined
    if (!template_tablet_id) {
      return res.status(400).json({ error: 'Template Tablet ID is required' });
    }

    // Find the TemplateTablet by template_tablet_id
    const templateTablet = await TemplateTablet.findOne({ where: { template_tablet_id } });

    if (!templateTablet) {
      return res.status(404).json({ error: 'Template Tablet not found' });
    }

    res.status(200).json(templateTablet);
  } catch (error) {
    console.error('Error retrieving Template Tablet:', error); // Log the error for debugging
    res.status(500).json({ error: 'Failed to retrieve Template Tablet' });
  }
};


const remove = async (req, res) => {
  // #swagger.tags = ['TemplateTablet']
  /*
    #swagger.parameters['body'] = {
      in: 'body', 
      '@schema': { 
        "required": ["template_tablet_id"], 
        "properties": { 
          "template_tablet_id": { 
            "type": "string",
          }
        } 
      } 
    }
    */
  try {
    const { template_tablet_id } = req.params;
    console.log(`Attempting to delete Template Tablet with ID: ${template_tablet_id}`); // Debugging line

    // Ensure template_tablet_id is not undefined
    if (!template_tablet_id) {
      return res.status(400).json({ error: 'Template Tablet ID is required' });
    }

    // Find the TemplateTablet by template_tablet_id
    const tablet = await TemplateTablet.findOne({ where: { template_tablet_id } });

    if (!tablet) {
      return res.status(404).json({ error: 'Template Tablet not found' });
    }

    // Delete the TemplateTablet
    await tablet.destroy();
    res.status(200).json({ success: true, message: 'Template Tablet deleted successfully' });
  } catch (error) {
    console.error('Error deleting Template Tablet:', error); // Log the error for debugging
    res.status(500).json({ error: 'Failed to delete Template Tablet' });
  }
};


module.exports ={createTemplate, update,getAll,getone,remove}