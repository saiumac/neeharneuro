const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return InvestigationTemplate.init(sequelize, DataTypes);
}

class InvestigationTemplate extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    template_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'investigation_template',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "template_id" },
        ]
      },
    ]
  });
  }
}
