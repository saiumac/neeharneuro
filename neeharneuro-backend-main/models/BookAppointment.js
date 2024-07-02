const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return BookAppointment.init(sequelize, DataTypes);
}

class BookAppointment extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    book_appointment_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'patient',
        key: 'patient_id'
      }
    },
    patient_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    mobile_number: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    email_id: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    select_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    reference: {
      type: DataTypes.ENUM('Direct','Referral Doctor','Practo','JD'),
      allowNull: false
    },
    reason_for_consultation: {
      type: DataTypes.STRING(300),
      allowNull: false
    },
    appointment_type: {
      type: DataTypes.ENUM('New','Review'),
      allowNull: false
    },
    consultation_type: {
      type: DataTypes.ENUM('Doctor visit','Video Consultation'),
      allowNull: false
    },
    appointment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'appointment_slot',
        key: 'appointment_id'
      }
    }
  }, {
    sequelize,
    tableName: 'book_appointment',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "book_appointment_id" },
        ]
      },
      {
        name: "patient_id",
        using: "BTREE",
        fields: [
          { name: "patient_id" },
        ]
      },
      {
        name: "appointment_id",
        using: "BTREE",
        fields: [
          { name: "appointment_id" },
        ]
      },
    ]
  });
  }
}
