const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return ComplaintsCategory.init(sequelize, DataTypes);
}

class ComplaintsCategory extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    complaint_id: {
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
    complaint_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    complaint_description: {
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
    tableName: 'complaints_category',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "complaint_id" },
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
