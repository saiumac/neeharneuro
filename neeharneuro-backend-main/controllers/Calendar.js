const { BookAppointment, Patient } = require('../models'); // Assuming models are correctly defined

const getAllAppointmentsByDate = async (req, res) => {
  try {
    // Fetch appointments including patient information
    const appointments = await BookAppointment.findAll({
      include: [
        {
          model: Patient,
          attributes: ['patient_name'], // Include only patient_name from Patient model
        },
      ],
      order: [['select_date', 'ASC']], // Order by select_date
    });

    console.log('Fetched Appointments:', appointments);

    // Group appointments by select_date
    const groupedAppointments = {};
    appointments.forEach(appointment => {
      const { select_date, Patient } = appointment;

      if (select_date && Patient && Patient.patient_name) {
        if (!groupedAppointments[select_date]) {
          groupedAppointments[select_date] = [];
        }
        groupedAppointments[select_date].push(Patient.patient_name);
      }
    });

    console.log('Grouped Appointments:', groupedAppointments);

    // Format into desired output structure
    const appointmentsList = Object.keys(groupedAppointments).map(date => ({
      date,
      patients: groupedAppointments[date],
    }));

    console.log('Formatted Appointments List:', appointmentsList);

    res.status(200).json(appointmentsList);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllAppointmentsByDate };
