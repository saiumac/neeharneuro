const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return InvestigationTestTemplate.init(sequelize, DataTypes);
}

class InvestigationTestTemplate extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    test_template_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    template_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'investigation_template',
        key: 'template_id'
      }
    },
    investigation_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'investigation',
        key: 'investigation_id'
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'investigation_test_template',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "test_template_id" },
        ]
      },
      {
        name: "investigation_id",
        using: "BTREE",
        fields: [
          { name: "investigation_id" },
        ]
      },
      {
        name: "template_id",
        using: "BTREE",
        fields: [
          { name: "template_id" },
        ]
      },
    ]
  });
  }
}
