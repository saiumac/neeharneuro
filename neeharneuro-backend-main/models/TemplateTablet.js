const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return TemplateTablet.init(sequelize, DataTypes);
}

class TemplateTablet extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    template_tablet_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    template_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'templates',
        key: 'template_id'
      }
    },
    tablet_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tablets',
        key: 'tablet_id'
      }
    }
  }, {
    sequelize,
    tableName: 'template_tablets',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "template_tablet_id" },
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
        name: "tablet_id",
        name: "template_tablets_ibfk_2",
        using: "BTREE",
        fields: [
          { name: "tablet_id" },
        ]
      },
    ]
  });
  }
}
