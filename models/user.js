// Users database model that requires personal info, associated with the number of events the user has (each user may have different events).
module.exports = function(sequelize, DataTypes,) {
    var User = sequelize.define("User", {
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
          type: DataTypes.STRING,
          allowNull: false
      }
    });
    User.associate = function(models){
        User.hasMany(models.Event);
    }
    return User;
  };
  