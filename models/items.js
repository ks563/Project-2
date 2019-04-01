// Items database model that belongs to an determinated event (relation one by one).
// Each guest has to pick an item to bring, changing isBrought state to modify database
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
  