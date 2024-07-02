const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Doctor.init(sequelize, DataTypes);
}

class Doctor extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    doctor_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    mobile_no: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'doctor',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "doctor_id" },
        ]
      },
    ]
  });
  }
}
