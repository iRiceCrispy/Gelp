'use strict';
module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define(
    'Game',
    {
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [2, 1020],
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [2],
        },
      },
      url: DataTypes.STRING,
      steamUrl: DataTypes.STRING,
      releaseDate: DataTypes.DATEONLY,
      currentVersion: DataTypes.STRING,
    },
    {}
  );
  Game.associate = function (models) {
    Game.belongsTo(models.User, { foreignKey: 'ownerId' });
    Game.hasMany(models.Review, { foreignKey: 'gameId' });
  };
  return Game;
};
