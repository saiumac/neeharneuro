const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return ReferralAppointment.init(sequelize, DataTypes);
}

class ReferralAppointment extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    Mobile_Number: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Appointment_status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    },
    Appointment_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    patient_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      references: {
        model: 'patient',
        key: 'patient_name'
      }
    },
    referal_doctor_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      references: {
        model: 'referaldoctors',
        key: 'referral_doctor_name'
      }
    },
    referral_appointment_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'referral_appointment',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "referral_appointment_id" },
        ]
      },
      {
        name: "fk_patient_name",
        using: "BTREE",
        fields: [
          { name: "patient_name" },
        ]
      },
      {
        name: "fk_referal_doctor_name",
        using: "BTREE",
        fields: [
          { name: "referal_doctor_name" },
        ]
      },
    ]
  });
  }
}
