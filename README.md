# Gelp
[Gelp](https://gelp.iricecrispy.dev) is a clone of [Yelp](https://www.yelp.com/) with a game theme.

This app uses `express` and `postgresql` for its backend, and `react` and `redux` for its frontend.

Its current features are:
  1. User authentication
  2. Viewing, creating, editing, and deleting game pages
  3. Viewing, creating, editing, and deleting game reviews
 
More info can be found in the [Wiki](../../wiki)\

## Steps to clone the app
### 1. Clone this repo in your project folder
```
git clone https://github.com/iRiceCrispy/Gelp.git
```

### 2. Install dependencies for both the frontend and backend
move to the frontend directory and npm install
```
cd frontend/
npm install
```
move to the backend directory and npm install
```
cd backend/
npm install
```

### 3. Create a database user with a password and createdb permission
```
CREATE USER <username> WITH PASSWORD '<password>' CREATEDB;
```

### 4. Create a .env file in the backend directory based on the `.env.exmaple` file 
Edit the information in between `<>`'s as you see fit

### 5. Make sure you have the follow proxy added to your package.json file in your frontend directory
Match the port number with what you put in in your `.env` file
```
"proxy": "http://localhost:<port number>"
```

### 6. In your backend directory, create your database, migrate your models, and seed your data
```
npm run db:create
npm run db:migrate
npm run db:seed:all
```

### 7. Start the services in the backend directory
```
npm start
```

### 8. Start the services in the frontend directory
```
npm start
```
Navigate to http://localhost:3000/ if it was not opened automatically, to start browsing the app

### 9. Enjoy

## If you wish to make your own changes to the database structure or seed files, you can
### 1. Drop the database and recreate, remigrate, and reseed
In your psql
```
DROP DATABASE <your db name>
```
In your backend directory
```
npm run db:create
npm run db:migrate
npm run db:seed:all
```
### 2. Unseed and unmigrate, then remigrate and reseed
```
npx dotenv sequelize db:seed:undo:all
npx dotenv sequelize db:migrate:undo:all
npm run db:migrate
npm run db:seed:all
```
