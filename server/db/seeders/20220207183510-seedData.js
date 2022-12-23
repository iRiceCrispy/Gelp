const bcrypt = require('bcryptjs');
const { demo } = require('../../config');

const lorem = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sit amet dolor pulvinar, interdum ipsum ut, facilisis ante. Fusce congue, lorem vel luctus aliquam, metus sem bibendum nunc, vitae venenatis arcu tortor non nunc. Vestibulum commodo nibh quis orci vestibulum mattis. Suspendisse porttitor hendrerit suscipit. Phasellus ut libero quis nibh congue volutpat. Vivamus tempus dictum velit sit amet sagittis. Nullam condimentum leo eget egestas commodo. Nullam magna libero, eleifend et ex vitae, tincidunt molestie ipsum. Nam pulvinar mauris aliquet, mollis eros ut, mollis libero. Sed imperdiet risus ac turpis rutrum, mollis dictum lacus venenatis. Aliquam erat volutpat. Donec lorem ligula, placerat eu sollicitudin eget, varius at lorem.

Aliquam ut ligula et elit tincidunt tincidunt. Nulla eu sem leo. Pellentesque ut placerat augue. Sed volutpat mattis mattis. Integer sapien metus, ullamcorper id dui vitae, pellentesque pellentesque erat. Aliquam ut felis mauris. In nec nisi at lectus tristique gravida. Sed pulvinar tortor sed dapibus lobortis. Donec at pretium massa. Suspendisse dapibus dolor ex, non pulvinar est aliquam at. Duis sollicitudin, nisi vel pretium lacinia, nibh orci convallis nulla, vel posuere dolor leo quis ligula. Vestibulum consectetur laoreet ligula quis ultrices. Duis libero nisi, imperdiet scelerisque pretium non, consequat et neque. In id condimentum risus, a maximus orci. Morbi sodales rutrum odio, nec aliquam eros faucibus at.

Suspendisse a accumsan urna. Donec neque elit, rhoncus non tincidunt vitae, cursus ac nunc. Maecenas sollicitudin tortor maximus massa tincidunt aliquet. Duis ac ante hendrerit orci bibendum sollicitudin in imperdiet erat. Fusce non nulla eget neque finibus congue ut ut dui. Sed sit amet vehicula justo, auctor faucibus mi. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque porttitor feugiat sem, nec fermentum justo. Mauris rhoncus consectetur felis, in ornare erat feugiat a. Aenean mi ligula, faucibus at orci sit amet, dignissim tincidunt risus. Aenean aliquam, ante eget efficitur laoreet, elit ipsum vulputate urna, sed consectetur erat urna eu eros. Vivamus sit amet odio nulla. Donec in neque ante. Sed convallis lorem elit, non laoreet dui fringilla quis. Nulla volutpat sapien nec velit mollis vehicula. Etiam ac dui tempor, maximus quam non, convallis nulla. Aliquam sed enim elit. In hac habitasse platea dictumst. Curabitur euismod, mauris in dictum eleifend, est nisl tristique dui, non laoreet massa magna eu leo. Sed eget quam et tellus eleifend ultrices.

Nam non tempus augue. Phasellus consequat finibus porttitor. Donec vulputate nisl est, nec tempus ex posuere in. Donec pulvinar eros diam, nec lobortis libero semper a. Maecenas iaculis, metus et pellentesque pharetra, eros nisi interdum massa, vel facilisis tellus urna eget tellus. Cras accumsan varius ultrices. Sed condimentum eros dolor, id imperdiet lectus blandit eget. Aenean finibus eros ante, semper pellentesque nunc aliquet in. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec vel volutpat tortor. Nam consequat consectetur ex et auctor. Quisque ultricies ut massa nec dapibus. Pellentesque commodo imperdiet orci eget pellentesque. Pellentesque hendrerit scelerisque laoreet.
`;

const randomReview = () => {
  const length = Math.floor(Math.random() * lorem.length);
  return lorem.substring(0, length);
};

const randomRating = () => Math.floor(Math.random() * 5) + 1;

module.exports = {
  up: async queryInterface => {
    const users = await queryInterface.bulkInsert('Users', [
      {
        username: demo.username,
        email: demo.email,
        hashedPassword: bcrypt.hashSync(demo.password),
      },
      {
        username: 'Nexon',
        email: 'nexon@nexon.com',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        username: 'TheIndieStone',
        email: 'admin@theindiestone.com',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        username: 'Mojang',
        email: 'admin@mojang.com',
        hashedPassword: bcrypt.hashSync('password'),
      },
    ], { returning: true });

    const games = await queryInterface.bulkInsert('Games', [
      {
        ownerId: users[0].id,
        title: 'League of Legends',
        description:
            'League of Legends is a team-based game with over 140 champions to make epic plays with. Play now for free.',
        image:
            'https://cdn1.dotesports.com/wp-content/uploads/2019/09/12195522/league-of-legends.jpg',
        url: 'https://www.leagueoflegends.com/en-us/',
        downloadLink: '',
        releaseDate: '2009-10-27',
      },
      {
        ownerId: users[0].id,
        title: 'Valorant',
        description:
            'Valorant: a 5v5 character-based tactical FPS where precise gunplay meets unique agent abilities.',
        image:
            'https://cdn1.epicgames.com/offer/cbd5b3d310a54b12bf3fe8c41994174f/67cf271c-e9f8-4c9c-8b90-f542a8268052_2560x1440-e54afb0597bb192adc27b76629067318',
        url: 'https://playvalorant.com/en-us/',
        downloadLink: '',
        releaseDate: '2020-07-02',
      },
      {
        ownerId: users[1].id,
        title: 'Maplestory',
        description:
            'Join over 260 Million Global Players in MapleStory, one of the original MMORPGs, where epic adventure, action-packed gameplay, & good friends await you! Featuring an iconic 2D art style, MapleStory offers the thrill of explosive power, bold anime-style self-expression, and absolute control of your characters’ awesome abilities. Build your perfect custom hero from over 40 distinct classes with thousands of unique cosmetic options, and set off on your journey to face never-ending challenges and enjoy extraordinary rewards. Discover Your Story!',
        image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/216150/header.jpg?t=1643829016',
        url: 'https://maplestory.nexon.net/',
        downloadLink: 'https://store.steampowered.com/app/216150/MapleStory/',
        releaseDate: '2005-05-11',
      },
      {
        ownerId: users[2].id,
        title: 'Project Zomboid',
        description:
            'Project Zomboid is the ultimate in zombie survival. Alone or in MP: you loot, build, craft, fight, farm and fish in a struggle to survive. A hardcore RPG skillset, a vast map, massively customisable sandbox and a cute tutorial raccoon await the unwary. So how will you die? All it takes is a bite...',
        image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/108600/header.jpg?t=1639992670',
        url: 'https://projectzomboid.com/blog/',
        downloadLink: 'https://store.steampowered.com/app/108600/Project_Zomboid/',
        releaseDate: '2013-11-08',
      },

      {
        ownerId: users[3].id,
        title: 'Minecraft',
        description:
            'Explore your own unique world, survive the night, and create anything you can imagine!',
        image:
            'https://www.notebookcheck.net/fileadmin/Notebooks/News/_nc3/Minecraft_now_available_on_Game_Pass_for_PC.jpg',
        url: 'https://www.minecraft.net/en-us',
        downloadLink: '',
        releaseDate: '2011-11-18',
      },
    ], { returning: true });

    await queryInterface.bulkInsert('Reviews', [
      {
        userId: users[0].id,
        gameId: games[2].id,
        body: randomReview(),
        rating: randomRating(),
      },
      {
        userId: users[0].id,
        gameId: games[3].id,
        body: randomReview(),
        rating: randomRating(),
      },
      {
        userId: users[0].id,
        gameId: games[4].id,
        body: randomReview(),
        rating: randomRating(),
      },
      {
        userId: users[1].id,
        gameId: games[0].id,
        body: randomReview(),
        rating: randomRating(),
      },
      {
        userId: users[1].id,
        gameId: games[1].id,
        body: randomReview(),
        rating: randomRating(),
      },
      {
        userId: users[1].id,
        gameId: games[3].id,
        body: randomReview(),
        rating: randomRating(),
      },
      {
        userId: users[1].id,
        gameId: games[4].id,
        body: randomReview(),
        rating: randomRating(),
      },
      {
        userId: users[2].id,
        gameId: games[0].id,
        body: randomReview(),
        rating: randomRating(),
      },
      {
        userId: users[2].id,
        gameId: games[1].id,
        body: randomReview(),
        rating: randomRating(),
      },
      {
        userId: users[2].id,
        gameId: games[2].id,
        body: randomReview(),
        rating: randomRating(),
      },
      {
        userId: users[2].id,
        gameId: games[4].id,
        body: randomReview(),
        rating: randomRating(),
      },
      {
        userId: users[3].id,
        gameId: games[0].id,
        body: randomReview(),
        rating: randomRating(),
      },
      {
        userId: users[3].id,
        gameId: games[1].id,
        body: randomReview(),
        rating: randomRating(),
      },
      {
        userId: users[3].id,
        gameId: games[2].id,
        body: randomReview(),
        rating: randomRating(),
      },
      {
        userId: users[3].id,
        gameId: games[3].id,
        body: randomReview(),
        rating: randomRating(),
      },
    ], { returning: true });
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete('Reviews', null, {});
    await queryInterface.bulkDelete('Games', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  },
};
