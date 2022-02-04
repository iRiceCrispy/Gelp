'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          email: 'demo@user.io',
          username: 'demo',
          hashedPassword: bcrypt.hashSync('password'),
        },
        {
          email: 'user1@user.io',
          username: 'user1',
          hashedPassword: bcrypt.hashSync('password'),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', null, {});
  },
};
