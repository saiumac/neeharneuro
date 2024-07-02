const DataTypes = require("sequelize").DataTypes;
const _AddVitalsign = require("./AddVitalsign");
const _Admin = require("./Admin");
const _AppointmentSlot = require("./AppointmentSlot");
const _BlockedSlot = require("./BlockedSlot");
const _BookAppointment = require("./BookAppointment");
const _ComplaintsCategory = require("./ComplaintsCategory");
const _DateText = require("./DateText");
const _Diagnosis = require("./Diagnosis");
const _DiagnosisCategory = require("./DiagnosisCategory");
const _Doctor = require("./Doctor");
const _DoctorsLeave = require("./DoctorsLeave");
const _Feedback = require("./Feedback");
const _HealthTip = require("./HealthTip");
const _Investigation = require("./Investigation");
const _InvestigationTemplate = require("./InvestigationTemplate");
const _InvestigationTestTemplate = require("./InvestigationTestTemplate");
const _MedicalHistory = require("./MedicalHistory");
const _Note = require("./Note");
const _Notification = require("./Notification");
const _ObservationsCategory = require("./ObservationsCategory");
const _Patient = require("./Patient");
const _Receptionist = require("./Receptionist");
const _Referaldoctor = require("./Referaldoctor");
const _ReferralAppointment = require("./ReferralAppointment");
const _Tablet = require("./Tablet");
const _TemplateTablet = require("./TemplateTablet");
const _Template = require("./Template");
const _TemplatesDiagnosis = require("./TemplatesDiagnosis");
const _TemplatesDiagnosisItem = require("./TemplatesDiagnosisItem");
const _TreatmentCategory = require("./TreatmentCategory");
const _User = require("./User");

function initModels(sequelize) {
  const AddVitalsign = _AddVitalsign(sequelize, DataTypes);
  const Admin = _Admin(sequelize, DataTypes);
  const AppointmentSlot = _AppointmentSlot(sequelize, DataTypes);
  const BlockedSlot = _BlockedSlot(sequelize, DataTypes);
  const BookAppointment = _BookAppointment(sequelize, DataTypes);
  const ComplaintsCategory = _ComplaintsCategory(sequelize, DataTypes);
  const DateText = _DateText(sequelize, DataTypes);
  const Diagnosis = _Diagnosis(sequelize, DataTypes);
  const DiagnosisCategory = _DiagnosisCategory(sequelize, DataTypes);
  const Doctor = _Doctor(sequelize, DataTypes);
  const DoctorsLeave = _DoctorsLeave(sequelize, DataTypes);
  const Feedback = _Feedback(sequelize, DataTypes);
  const HealthTip = _HealthTip(sequelize, DataTypes);
  const Investigation = _Investigation(sequelize, DataTypes);
  const InvestigationTemplate = _InvestigationTemplate(sequelize, DataTypes);
  const InvestigationTestTemplate = _InvestigationTestTemplate(sequelize, DataTypes);
  const MedicalHistory = _MedicalHistory(sequelize, DataTypes);
  const Note = _Note(sequelize, DataTypes);
  const Notification = _Notification(sequelize, DataTypes);
  const ObservationsCategory = _ObservationsCategory(sequelize, DataTypes);
  const Patient = _Patient(sequelize, DataTypes);
  const Receptionist = _Receptionist(sequelize, DataTypes);
  const Referaldoctor = _Referaldoctor(sequelize, DataTypes);
  const ReferralAppointment = _ReferralAppointment(sequelize, DataTypes);
  const Tablet = _Tablet(sequelize, DataTypes);
  const TemplateTablet = _TemplateTablet(sequelize, DataTypes);
  const Template = _Template(sequelize, DataTypes);
  const TemplatesDiagnosis = _TemplatesDiagnosis(sequelize, DataTypes);
  const TemplatesDiagnosisItem = _TemplatesDiagnosisItem(sequelize, DataTypes);
  const TreatmentCategory = _TreatmentCategory(sequelize, DataTypes);
  const User = _User(sequelize, DataTypes);

  TemplatesDiagnosisItem.belongsTo(Diagnosis, { as: "diagnosis", foreignKey: "diagnosis_id"});
  Diagnosis.hasMany(TemplatesDiagnosisItem, { as: "templates_diagnosis_items", foreignKey: "diagnosis_id"});
  DoctorsLeave.belongsTo(Doctor, { as: "doctor", foreignKey: "doctor_id"});
  Doctor.hasMany(DoctorsLeave, { as: "doctors_leaves", foreignKey: "doctor_id"});
  InvestigationTestTemplate.belongsTo(Investigation, { as: "investigation", foreignKey: "investigation_id"});
  Investigation.hasMany(InvestigationTestTemplate, { as: "investigation_test_templates", foreignKey: "investigation_id"});
  InvestigationTestTemplate.belongsTo(InvestigationTemplate, { as: "template", foreignKey: "template_id"});
  InvestigationTemplate.hasMany(InvestigationTestTemplate, { as: "investigation_test_templates", foreignKey: "template_id"});
  ReferralAppointment.belongsTo(Patient, { as: "patient_name_patient", foreignKey: "patient_name"});
  Patient.hasMany(ReferralAppointment, { as: "referral_appointments", foreignKey: "patient_name"});
  ReferralAppointment.belongsTo(Referaldoctor, { as: "referal_doctor_name_referaldoctor", foreignKey: "referal_doctor_name"});
  Referaldoctor.hasMany(ReferralAppointment, { as: "referral_appointments", foreignKey: "referal_doctor_name"});
  TemplateTablet.belongsTo(Tablet, { as: "tablet", foreignKey: "tablet_id"});
  Tablet.hasMany(TemplateTablet, { as: "template_tablets", foreignKey: "tablet_id"});
  TemplateTablet.belongsTo(Template, { as: "template", foreignKey: "template_id"});
  Template.hasMany(TemplateTablet, { as: "template_tablets", foreignKey: "template_id"});
  TemplatesDiagnosisItem.belongsTo(TemplatesDiagnosis, { as: "template", foreignKey: "template_id"});
  TemplatesDiagnosis.hasMany(TemplatesDiagnosisItem, { as: "templates_diagnosis_items", foreignKey: "template_id"});
  BlockedSlot.belongsTo(AppointmentSlot, { foreignKey: "slots"});
  AppointmentSlot.hasMany(BlockedSlot, { foreignKey: "slots"});
  BookAppointment.belongsTo(AppointmentSlot, { foreignKey: "appointment_id"});
  AppointmentSlot.hasMany(BookAppointment, { foreignKey: "appointment_id"});
  TemplatesDiagnosisItem.belongsTo(Diagnosis, { foreignKey: "diagnosis_id"});
  Diagnosis.hasMany(TemplatesDiagnosisItem, { foreignKey: "diagnosis_id"});
  DoctorsLeave.belongsTo(Doctor, { foreignKey: "doctor_id"});
  Doctor.hasMany(DoctorsLeave, { foreignKey: "doctor_id"});
  InvestigationTestTemplate.belongsTo(Investigation, { foreignKey: "investigation_id"});
  Investigation.hasMany(InvestigationTestTemplate, { foreignKey: "investigation_id"});
  BookAppointment.belongsTo(Patient, { foreignKey: "patient_id"});
  Patient.hasMany(BookAppointment, { foreignKey: "patient_id"});
  TemplateTablet.belongsTo(Tablet, { foreignKey: "tablet_id"});
  Tablet.hasMany(TemplateTablet, { foreignKey: "tablet_id"});
  TemplateTablet.belongsTo(Template, { foreignKey: "template_id"});
  Template.hasMany(TemplateTablet, { foreignKey: "template_id"});
  TemplatesDiagnosisItem.belongsTo(TemplatesDiagnosisItem, { foreignKey: "template_id"});
  TemplatesDiagnosisItem.hasMany(TemplatesDiagnosisItem, { foreignKey: "template_id"});
  ComplaintsCategory.belongsTo(TreatmentCategory, { foreignKey: "treatment_category_id"});
  TreatmentCategory.hasMany(ComplaintsCategory, { foreignKey: "treatment_category_id"});
  DiagnosisCategory.belongsTo(TreatmentCategory, { foreignKey: "treatment_category_id"});
  TreatmentCategory.hasMany(DiagnosisCategory, { foreignKey: "treatment_category_id"});
  ObservationsCategory.belongsTo(TreatmentCategory, { foreignKey: "treatment_category_id"});
  TreatmentCategory.hasMany(ObservationsCategory, { foreignKey: "treatment_category_id"});

  return {
    AddVitalsign,
    Admin,
    AppointmentSlot,
    BlockedSlot,
    BookAppointment,
    ComplaintsCategory,
    DateText,
    Diagnosis,
    DiagnosisCategory,
    Doctor,
    DoctorsLeave,
    Feedback,
    HealthTip,
    Investigation,
    InvestigationTemplate,
    InvestigationTestTemplate,
    MedicalHistory,
    Note,
    Notification,
    ObservationsCategory,
    Patient,
    Receptionist,
    Referaldoctor,
    ReferralAppointment,
    Tablet,
    TemplateTablet,
    Template,
    TemplatesDiagnosis,
    TemplatesDiagnosisItem,
    TreatmentCategory,
    User,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
