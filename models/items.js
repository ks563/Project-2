module.exports = function(sequelize, DataTypes) {
    var Items = sequelize.define("Items", {
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
    Items.associate = function(models){
        Items.belongsTo(models.User);
    }
    return Items
  };
  