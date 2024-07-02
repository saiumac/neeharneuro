const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return DoctorsLeave.init(sequelize, DataTypes);
}

class DoctorsLeave extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    doctor_leave_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    doctor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'doctor',
        key: 'doctor_id'
      }
    },
    leave_from: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    leave_to: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'doctors_leave',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "doctor_leave_id" },
        ]
      },
      {
        name: "doctors_leave_ibfk_1",
        using: "BTREE",
        fields: [
          { name: "doctor_id" },
        ]
      },
    ]
  });
  }
}
