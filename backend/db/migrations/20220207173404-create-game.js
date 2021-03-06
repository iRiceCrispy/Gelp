module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Games', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    ownerId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      reference: { model: 'Users' },
      onDelete: 'cascade',
    },
    title: {
      type: Sequelize.STRING(1020),
      allowNull: false,
      unique: true,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    image: {
      type: Sequelize.STRING,
    },
    url: {
      type: Sequelize.STRING,
    },
    downloadLink: {
      type: Sequelize.STRING,
    },
    releaseDate: {
      type: Sequelize.DATEONLY,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('now'),
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('now'),
    },
  }),
  down: queryInterface => queryInterface.dropTable('Games'),
};
