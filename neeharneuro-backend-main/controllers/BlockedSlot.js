const Model = require('../models')
const ThisModel = Model.BlockedSlot
const AppointmentSlot = Model.AppointmentSlot

const create = async (req, res) => {
    // #swagger.tags = ['BlockedSlot']
    /*
      #swagger.parameters['body'] = {
        in: 'body',
        '@schema': {
          "required": ["date", "slots"],
          "properties": {
            "date": {
              "type": "string",
              "format": "date",
              "example": "2024-07-15"
            },
            "slots": {
              "type": "array",
              "items": {
                "type": "integer",
                "example": 1
              }
            }
          }
        }
      }
    */
    try {
      const { date, slots } = req.body;
  
      if (!Array.isArray(slots)) {
        return res.status(400).json({ error: "Slots should be an array of integers." });
      }
  
      const blockedSlots = [];
  
      for (const slot of slots) {
        // Find or create the appointment slot
        const [appointmentSlot, created] = await AppointmentSlot.findOrCreate({
          where: { slot_range: `${slot}`, status: true },
          defaults: { slot_range: `${slot}` }
        });
  
        // Create a new blocked slot
        const newBlockedSlot = await ThisModel.create({
          date,
          appointment_id: appointmentSlot.appointment_id,
          slots: slot
        });
  
        blockedSlots.push(newBlockedSlot);
      }
  
      res.status(201).json(blockedSlots);
    } catch (error) {
      console.error('Error creating blocked slots:', error);
      res.status(500).json({ error: error.message });
    }
};

const update = async (req, res) => {
    // #swagger.tags = ['BlockedSlot']
    /*
      #swagger.parameters['body'] = {
        in: 'body',
        '@schema': {
          "required": ["date", "slots"],
          "properties": {
            "date": {
              "type": "string",
              "format": "date",
              "example": "2024-07-15"
            },
            "slots": {
              "type": "array",
              "items": {
                "type": "integer",
                "example": 1
              }
            }
          }
        }
      }
    */
    try {
      const { date, slots } = req.body;
      const { blocked_slot_id } = req.params;
  
      if (!Array.isArray(slots)) {
        return res.status(400).json({ error: "Slots should be an array of integers." });
      }
  
      // Delete existing blocked slot
      await ThisModel.destroy({ where: { blocked_slot_id } });
  
      const updatedBlockedSlots = [];
  
      for (const slot of slots) {
        // Find or create the appointment slot
        const [appointmentSlot, created] = await AppointmentSlot.findOrCreate({
          where: { slot_range: `${slot}`, status: true },
          defaults: { slot_range: `${slot}` }
        });
  
        // Create a new blocked slot
        const newBlockedSlot = await ThisModel.create({
          date,
          appointment_id: appointmentSlot.appointment_id,
          slots: slot
        });
  
        updatedBlockedSlots.push(newBlockedSlot);
      }
  
      res.status(200).json(updatedBlockedSlots);
    } catch (error) {
      console.error('Error updating blocked slots:', error);
      res.status(500).json({ error: error.message });
    }
};
  
  
const getAll = async (req, res) => {
    // #swagger.tags = ['BlockedSlot']
    try {
      const blockedSlots = await ThisModel.findAll({
        include: [{
          model: AppointmentSlot,
          attributes: ['slot_range']
        }],
        order: [['date', 'ASC'], ['slots', 'ASC']]
      });
  
      const groupedSlots = blockedSlots.reduce((acc, slot) => {
        const date = slot.date;
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(slot);
        return acc;
      }, {});
  
      res.status(200).json(groupedSlots);
    } catch (error) {
      console.error('Error fetching blocked slots:', error);
      res.status(500).json({ error: error.message });
    }
};

const getone = async (req, res) => {
    // #swagger.tags = ['BlockedSlot']
    try {
      const { date } = req.params;
  
      const blockedSlots = await ThisModel.findAll({
        where: { date },
        include: [{
          model: AppointmentSlot,
          attributes: ['slot_range']
        }]
      });
  
      if (!blockedSlots.length) {
        return res.status(404).json({ error: "No blocked slots found for the given date." });
      }
  
      res.status(200).json(blockedSlots);
    } catch (error) {
      console.error('Error fetching blocked slot:', error);
      res.status(500).json({ error: error.message });
    }
};
  
const remove = async (req, res) => {
    // #swagger.tags = ['BlockedSlot']
    try {
      const { blocked_slot_id } = req.params;
  
      const blockedSlot = await ThisModel.findOne({ where: { blocked_slot_id } });
  
      if (!blockedSlot) {
        return res.status(404).json({ error: "Blocked slot not found." });
      }
  
      await blockedSlot.destroy();
  
      res.status(200).json({ success: true, message: "Blocked slot deleted successfully." });
    } catch (error) {
      console.error('Error deleting blocked slot:', error);
      res.status(500).json({ error: "Failed to delete blocked slot." });
    }
};
  

module.exports = {create,update,getAll,getone,remove}