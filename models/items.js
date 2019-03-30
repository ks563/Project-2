module.exports = function(sequelize, DataTypes) {
    var Item = sequelize.define("Item", {
      item: {
          type: DataTypes.STRING
      },
      image_link: {
          type: DataTypes.STRING,
          allowNull: false
      },
      isBrought: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
      },
      description: {
          type: DataTypes.TEXT
        }
    });
    Item.associate = function(models){
    Item.belongsTo(models.Event);
    }
    return Item
  };
  