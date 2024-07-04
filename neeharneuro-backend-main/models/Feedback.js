const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Feedback.init(sequelize, DataTypes);
}

class Feedback extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    feedback_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    Email_id: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    Mobile_number: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Message: {
      type: DataTypes.STRING(2500),
      allowNull: false
    },
    Date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'feedback',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "feedback_id" },
        ]
      },
    ]
  });
  }
}
