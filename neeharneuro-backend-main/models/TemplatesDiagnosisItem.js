const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return TemplatesDiagnosisItem.init(sequelize, DataTypes);
}

class TemplatesDiagnosisItem extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    template_diagnosis_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    template_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'templates_diagnosis_items',
        key: 'template_diagnosis_id'
      }
    },
    diagnosis_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'diagnosis',
        key: 'diagnosis_id'
      }
    }
  }, {
    sequelize,
    tableName: 'templates_diagnosis_items',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "template_diagnosis_id" },
        ]
      },
      {
        name: "template_id",
        using: "BTREE",
        fields: [
          { name: "template_id" },
        ]
      },
      {
        name: "diagnosis_id",
        using: "BTREE",
        fields: [
          { name: "diagnosis_id" },
        ]
      },
    ]
  });
  }
}
