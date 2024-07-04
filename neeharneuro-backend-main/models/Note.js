const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Note.init(sequelize, DataTypes);
}

class Note extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    note_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    note_title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    note_content: {
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
    tableName: 'notes',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "note_id" },
        ]
      },
    ]
  });
  }
}
