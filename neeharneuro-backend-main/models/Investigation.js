const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Investigation.init(sequelize, DataTypes);
}

class Investigation extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    investigation_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    test_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    test_description: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    test_cost: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'investigation',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "investigation_id" },
        ]
      },
    ]
  });
  }
}
