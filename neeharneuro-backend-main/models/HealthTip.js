const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return HealthTip.init(sequelize, DataTypes);
}

class HealthTip extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    health_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Question: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    Answer: {
      type: DataTypes.STRING(2500),
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'health_tips',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "health_id" },
        ]
      },
    ]
  });
  }
}
