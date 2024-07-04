const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return AddVitalsign.init(sequelize, DataTypes);
}

class AddVitalsign extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    add_vital_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    BP: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    resp_rate: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    weight: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    pulse: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    temperature: {
      type: DataTypes.STRING(10),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'add_vitalsigns',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "add_vital_id" },
        ]
      },
    ]
  });
  }
}
