const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Diagnosis.init(sequelize, DataTypes);
}

class Diagnosis extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    diagnosis_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    category: {
      type: DataTypes.ENUM('A','B'),
      allowNull: false
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'diagnosis',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "diagnosis_id" },
        ]
      },
    ]
  });
  }
}
