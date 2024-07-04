const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Tablet.init(sequelize, DataTypes);
}

class Tablet extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    tablet_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tablet_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    molecule_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    doseage: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    morning: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    evening: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    night: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    time_taken: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    time_taken_telugu: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    instructions: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    instructions_telugu: {
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
    tableName: 'tablets',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "tablet_id" },
        ]
      },
    ]
  });
  }
}
