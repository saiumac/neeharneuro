const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Patient.init(sequelize, DataTypes);
}

class Patient extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    patient_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    patient_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "patient_name"
    },
    gender: {
      type: DataTypes.ENUM('Male','Female','Other'),
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
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
    blood_group: {
      type: DataTypes.ENUM('A+','A-','B+','B-','AB+','AB-','O+','O-'),
      allowNull: false
    },
    locality: {
      type: DataTypes.STRING(2555),
      allowNull: false
    },
    pincode: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    secondary_mobile_no: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    street_address: {
      type: DataTypes.STRING(2555),
      allowNull: false
    },
    city: {
      type: DataTypes.STRING(2555),
      allowNull: false
    },
    referred_by: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'patient',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "patient_id" },
        ]
      },
      {
        name: "patient_name",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "patient_name" },
        ]
      },
    ]
  });
  }
}
