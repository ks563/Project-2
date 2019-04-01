// Event database model that belongs to an specific user. This database is associated with an item database (relation one by one).
module.exports = function(sequelize, DataTypes) {
    var Event = sequelize.define("Event", {
      dateTime: {
          type: DataTypes.STRING,
          allowNull: false
      },
      phoneNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
      name: {
          type: DataTypes.STRING,
          allowNull:false
        },
      route: {
          type: DataTypes.STRING,
          allowNull:false
        }
    });
    Event.associate = function(models){
        Event.belongsTo(models.User);
        Event.hasMany(models.Item);
    }
    return Event;
  };