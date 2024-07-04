const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return TemplatesDiagnosis.init(sequelize, DataTypes);
}

class TemplatesDiagnosis extends Sequelize.Model {
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
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'templates_diagnosis',
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
