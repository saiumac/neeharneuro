const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return TreatmentCategory.init(sequelize, DataTypes);
}

class TreatmentCategory extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    treatment_category_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    category_name: {
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
    tableName: 'treatment_category',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "treatment_category_id" },
        ]
      },
    ]
  });
  }
}
