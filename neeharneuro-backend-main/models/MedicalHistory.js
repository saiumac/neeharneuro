const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return MedicalHistory.init(sequelize, DataTypes);
}

class MedicalHistory extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    medical_history_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    medical_history_name: {
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
    tableName: 'medical_history',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "medical_history_id" },
        ]
      },
    ]
  });
  }
}
