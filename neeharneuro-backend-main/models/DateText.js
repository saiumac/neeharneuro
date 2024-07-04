const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return DateText.init(sequelize, DataTypes);
}

class DateText extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    date_text_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    text: {
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
    tableName: 'date_text',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "date_text_id" },
        ]
      },
    ]
  });
  }
}
