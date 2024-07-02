const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Referaldoctor.init(sequelize, DataTypes);
}

class Referaldoctor extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    ref_doctor_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email_id: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    mobile_no: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'referaldoctor',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ref_doctor_id" },
        ]
      },
    ]
  });
  }
}
