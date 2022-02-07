'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    'Review',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      gameId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [5],
        },
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
          max: 5,
        },
      },
    },
    {}
  );
  Review.associate = function (models) {
    Review.belongsTo(models.User, { foreignKey: 'userId' });
    Review.belongsTo(models.Game, { foreignKey: 'gameId' });
  };
  return Review;
};
