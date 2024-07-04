const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return BlockedSlot.init(sequelize, DataTypes);
}

class BlockedSlot extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    blocked_slot_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    slots: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'appointment_slot',
        key: 'appointment_id'
      }
    },
    appointment_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'blocked_slot',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "blocked_slot_id" },
        ]
      },
      {
        name: "slots",
        using: "BTREE",
        fields: [
          { name: "slots" },
        ]
      },
    ]
  });
  }
}
