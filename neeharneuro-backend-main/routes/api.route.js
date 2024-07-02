const express = require('express')
const router = express.Router();
const accesstoken = require('../middleware/authentication')

const LoginControllers = require('../controllers/User')
router.post('/Register',LoginControllers.registeruser)
router.post('/Login',LoginControllers.loginuser)
router.put('/change-password', accesstoken,LoginControllers.ChangePassword);
router.get('/getlistbyrole',accesstoken,LoginControllers.getUsersByRole)
router.patch('/update',accesstoken,LoginControllers.updateuser)
router.patch('/forgotpassword',LoginControllers.forgotpassword)

const ReferaldocControllers = require('../controllers/Referaldoctor')
router.post('/Referaldoctor/create',ReferaldocControllers.createReferaldoctor)
router.patch('/Referaldoctor/update/:ref_doctor_id',ReferaldocControllers.updateReferaldoctor)
router.get('/Referaldoctor/getall',ReferaldocControllers.getAll)
router.get('/Referaldoctor/getone/:ref_doctor_id',ReferaldocControllers.getone)
router.delete('/Referaldoctor/delete/:ref_doctor_id',ReferaldocControllers.remove)

const TabletControllers = require('../controllers/tablet')
router.post('/Tablet/create',TabletControllers.addtablet);
router.patch('/Tablet/update/:tablet_id',TabletControllers.updateTablet);
router.get('/Tablet/get',TabletControllers.getAll)
router.get('/Tablet/getone/:tablet_id',TabletControllers.getone)
router.delete('/Tablet/delete/:tablet_id',TabletControllers.remove)

const TemplateControllers = require('../controllers/Template')
router.post('/TemplateTablet/create',TemplateControllers.createTemplate)
router.patch('/TemplateTablet/update/:template_id',TemplateControllers.update)
router.get('/TemplateTablet/getall',TemplateControllers.getAll)
router.get('/TemplateTablet/getone/:template_id',TemplateControllers.getone)
router.delete('/TemplateTablet/delete/:template_id',TemplateControllers.remove)

const DoctorsLeaveControllers = require('../controllers/DoctorsLeave')
router.post('/DoctorsLeave/create',DoctorsLeaveControllers.create)
router.patch('/DoctorsLeave/update/:doctor_leave_id',DoctorsLeaveControllers.update)
router.get('/DoctorsLeave/getall',DoctorsLeaveControllers.getAll)
router.get('/DoctorsLeave/getone/:doctor_leave_id',DoctorsLeaveControllers.getone)
router.delete('/DoctorsLeave/delete/:doctor_leave_id',DoctorsLeaveControllers.remove)

const NoteControllers = require('../controllers/Note')
router.post('/Note/create',NoteControllers.create)
router.patch('/Note/update/:note_id',NoteControllers.update)
router.get('/Note/getall',NoteControllers.getAll)
router.get('/Note/getone/:note_id',NoteControllers.getone)
router.delete('/Note/delete/:note_id',NoteControllers.remove)

const MedicalHistoryController = require('../controllers/MedicalHistory')
router.post('/MedicalHistory/create',MedicalHistoryController.create)
router.patch('/MedicalHistory/update/:medical_history_id',MedicalHistoryController.update)
router.get('/MedicalHistory/getall',MedicalHistoryController.getAll)
router.get('/MedicalHistory/getone/:medical_history_id',MedicalHistoryController.getone)
router.delete('/MedicalHistory/delete/:medical_history_id',MedicalHistoryController.remove)


const DiagnosisControllers = require('../controllers/Diagnosis')
router.post('/Diagnosis/create', DiagnosisControllers.create)
router.get('/Diagnosis/view/:diagnosis_id',DiagnosisControllers.get)
router.get('/Diagnosis/list',DiagnosisControllers.getAll)
router.patch('/Diagnosis/update/:diagnosis_id',DiagnosisControllers.update)
router.delete('/Diagnosis/delete/:diagnosis_id',DiagnosisControllers.remove)

const templateDiagnosis = require('../controllers/templateDiagnosis')
router.post('/templateDiagnosis/create',templateDiagnosis.createTemplate)
router.patch('/templateDiagnosis/:template_id',templateDiagnosis.update)
router.get('/templateDiagnosis/:template_diagnosis_id',templateDiagnosis.getone)
router.get('/templateDiagnosis/get',templateDiagnosis.getAll)
router.delete('/templateDiagnosis/:template_id',templateDiagnosis.remove)


router.post('/Template/create',templateDiagnosis.createTemplate)
router.patch('/Template/:id',templateDiagnosis.update)
router.delete('/Template/:id',templateDiagnosis.remove)
router.get('/Template/:id',templateDiagnosis.getone)
router.get('/Template/get',templateDiagnosis.getAll)

const InvestigationControllers = require('../controllers/investigation');
router.post('/Investigation/create', InvestigationControllers.create)
router.get('/Investigation/view/:investigation_id',InvestigationControllers.get)
router.get('/Investigation/list',InvestigationControllers.getAll)
router.patch('/Investigation/update/:investigation_id',InvestigationControllers.update)
router.delete('/Investigation/delete/:investigation_id',InvestigationControllers.remove)

router.patch('/Investigation/update/:id',InvestigationControllers.update)
router.delete('/Investigation/delete/:id',InvestigationControllers.remove)

const templateInvestigationControllers = require('../controllers/templateinvestigation')
router.post('/templateinvestigation/create',templateInvestigationControllers.createTemplate)
router.patch('/templateinvestigation/:template_id',templateInvestigationControllers.update)
router.get('/templateinvestigation/:test_template_id',templateInvestigationControllers.getone)
router.get('/templateinvestigation/get',templateInvestigationControllers.getAll)
router.delete('/templateinvestigation/:template_id',templateInvestigationControllers.remove)

const TreatmentCategoryContorller = require('../controllers/TreatmentCategory')
router.post('/TreatmentCategory/create',TreatmentCategoryContorller.create)
router.patch('/TreatmentCategory/update/:treatment_category_id',TreatmentCategoryContorller.update)
router.get('/TreatmentCategory/getall',TreatmentCategoryContorller.getAll)
router.get('/TreatmentCategory/getone/:treatment_category_id',TreatmentCategoryContorller.getone)
router.delete('/TreatmentCategory/delete/:treatment_category_id',TreatmentCategoryContorller.remove)

const SeizureCategoryContorllers = require('../controllers/SeizuresCategory')
router.post('/SeizuresCategory/create/:treatment_category_id',SeizureCategoryContorllers.create)
router.patch('/SeizuresCategory/update/:treatment_category_id',SeizureCategoryContorllers.update)
router.get('/SeizuresCategory/getall',SeizureCategoryContorllers.getAll)
router.get('/SeizuresCategory/getone/:treatment_category_id',SeizureCategoryContorllers.getone)
router.delete('/SeizuresCategory/delete/:treatment_category_id',SeizureCategoryContorllers.remove)

const DateTextControllers = require('../controllers/DateText')
router.post('/DateText/create',DateTextControllers.create)
router.patch('/DateText/update/:date_text_id',DateTextControllers.update)
router.get('/DateText/getall',DateTextControllers.getAll)
router.get('/DateText/getone/:date_text_id',DateTextControllers.getone)
router.delete('/DateText/delete/:date_text_id',DateTextControllers.remove)

const BlockedSlotControllers = require('../controllers/BlockedSlot')
router.post('/BlockedSlot/create',BlockedSlotControllers.create)
router.patch('/BlockedSlot/update/:blocked_slot_id',BlockedSlotControllers.update)
router.get('/BlockedSlot/getall',BlockedSlotControllers.getAll)
router.get('/BlockedSlot/getone/:date',BlockedSlotControllers.getone)
router.delete('/BlockedSlot/delete/:blocked_slot_id',BlockedSlotControllers.remove)

const feedbackController = require('../controllers/feedback');
router.post('/feedback', feedbackController. create);
router.patch('/feedback/:feedback_id', feedbackController.update);
router.get('/feedback/:feedback_id', feedbackController.getone);
router.get('/feedback', feedbackController.getAll);
router.delete('/feedback/:feedback_id', feedbackController.remove);

const healthTipController = require('../controllers/healthtips');
router.post('/healthtip', healthTipController.create);
router.patch('/healthtip/:health_id', healthTipController.update);
router.get('/healthtip/:health_id', healthTipController.getone);
router.get('/healthtip', healthTipController.getAll);
router.delete('/healthtip/:health_id', healthTipController.remove);

const notificationController = require('../controllers/notification');
router.post('/notification', notificationController.create);
router.patch('/notification/:notification_id', notificationController.update);
router.get('/notification/:notification_id', notificationController.getone);
router.get('/notification', notificationController.getAll);
router.delete('/notification/:notification_id', notificationController.remove);

const patientController = require('../controllers/patients');
router.post('/patient', patientController.create);
router.patch('/patient/:patient_id', patientController.update);
router.get('/patient/:patient_id', patientController.getone);
router.get('/patient', patientController.getAll);
router.delete('/patient/:patient_id', patientController.remove);
router.get('/patients/:patient_id/next', patientController.getNextPatient);


const referralAppointmentController = require('../controllers/referralAppointment');
router.post('/referralappointment', referralAppointmentController.create);
router.patch('/referralappointment/:referral_appointment_id', referralAppointmentController.update);
router.get('/referralappointment/:referral_appointment_id', referralAppointmentController.getone);
router.get('/referralappointment', referralAppointmentController.getAll);
router.delete('/referralappointment/:referral_appointment_id', referralAppointmentController.remove);


const addVitalSignsController = require('../controllers/addVitalSigns');
router.post('/addVitalSigns', addVitalSignsController.create);
router.patch('/addVitalSigns/:add_vital_id', addVitalSignsController.update);
router.get('/addVitalSigns/:add_vital_id', addVitalSignsController.getone);
router.get('/addVitalSigns', addVitalSignsController.getAll);
router.delete('/addVitalSigns/:add_vital_id', addVitalSignsController.remove);

const BookAppointmentController = require('../controllers/BookAppointment');
router.post('/BookAppointment/create', BookAppointmentController.create);
router.patch('/BookAppointment/:book_appointment_id', BookAppointmentController.update);
router.get('/BookAppointment', BookAppointmentController.getAll);
router.get('/BookAppointment/:book_appointment_id', BookAppointmentController.getone);
router.delete('/BookAppointment/:book_appointment_id', BookAppointmentController.remove);

const CalendarController = require('../controllers/Calendar')
router.get('/Calendar/getall',CalendarController.getAllAppointmentsByDate)


module.exports = router;