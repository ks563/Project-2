module.exports = function(sequelize, DataTypes) {
    var Event = sequelize.define("Event", {
      date_of: {
          type: DataTypes.STRING,
          allowNull: false
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false
    },
      description: {
          type: DataTypes.TEXT
        }
    });
    Event.associate = function(models){
        Event.belongsTo(models.User)
        Event.hasMany(models.Items);
    }
    return Event
  };