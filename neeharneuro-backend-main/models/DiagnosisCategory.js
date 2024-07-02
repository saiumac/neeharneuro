const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return DiagnosisCategory.init(sequelize, DataTypes);
}

class DiagnosisCategory extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    diagnosis_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    treatment_category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'treatment_category',
        key: 'treatment_category_id'
      }
    },
    diagnosis_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    color_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'diagnosis_category',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "diagnosis_id" },
        ]
      },
      {
        name: "treatment_category_id",
        using: "BTREE",
        fields: [
          { name: "treatment_category_id" },
        ]
      },
    ]
  });
  }
}
