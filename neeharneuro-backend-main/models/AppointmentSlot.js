const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return AppointmentSlot.init(sequelize, DataTypes);
}

class AppointmentSlot extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    appointment_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    slot_range: {
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
    tableName: 'appointment_slot',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "appointment_id" },
        ]
      },
    ]
  });
  }
}
