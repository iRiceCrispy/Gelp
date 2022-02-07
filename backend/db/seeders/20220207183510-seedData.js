'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await queryInterface.bulkInsert(
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
      { returning: true }
    );

    const games = await queryInterface.bulkInsert(
      'Games',
      [
        {
          ownerId: users[0].id,
          title: 'Project Zomboid',
          description:
            'Project Zomboid is the ultimate in zombie survival. Alone or in MP: you loot, build, craft, fight, farm and fish in a struggle to survive. A hardcore RPG skillset, a vast map, massively customisable sandbox and a cute tutorial raccoon await the unwary. So how will you die? All it takes is a bite...',
          url: 'https://projectzomboid.com/blog/',
          steamUrl: 'https://store.steampowered.com/app/108600/Project_Zomboid/',
          releaseDate: '2013-11-08',
          currentVersion: 'Build 41',
        },
      ],
      { returning: true }
    );

    await queryInterface.bulkInsert(
      'Reviews',
      [
        {
          userId: users[0].id,
          gameId: games[0].id,
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet dui facilisis est suscipit lacinia quis non risus. Nam ornare cursus porttitor. Maecenas imperdiet non ante quis aliquet. Ut vitae fermentum justo. Pellentesque ac augue arcu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent pretium nisi massa, ut imperdiet tortor elementum sit amet. Praesent sed sapien facilisis, tincidunt turpis eu, volutpat urna. Nam condimentum, libero at finibus molestie, mi ligula tempor purus, in malesuada ante nibh ac diam. Mauris aliquet convallis velit ut cursus.',
          rating: 5,
        },
      ],
      { returning: true }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Reviews', null, {});
    await queryInterface.bulkDelete('Games', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  },
};
