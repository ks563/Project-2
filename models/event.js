module.exports = function(sequelize, DataTypes) {
    var Event = sequelize.define("Event", {
      dateTime: {
          type: DataTypes.STRING,
          allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
    },
      name: {
          type: DataTypes.STRING,
          allowNull:false
        }
    });
    Event.associate = function(models){
        Event.belongsTo(models.User)
        Event.hasMany(models.Items);
    }
    return Event
  };