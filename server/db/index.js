require('dotenv').config();
const { DB_NAME, DB_USER, DB_PW } = process.env;
const { Sequelize, DataTypes } = require('sequelize');

const sql = new Sequelize(DB_NAME, DB_USER, DB_PW, {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});
//IF YOU NEED TO UPDATE THE DB, insert {alter: true} into .sync() on line 198

const User = sql.define('users', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  userName: DataTypes.STRING,
  diet: {
    type: DataTypes.STRING,
    defaultValue: 'None',
  },
  allergies: {
    type: DataTypes.STRING,
    defaultValue: 'None',
  },
  bio: {
    type: DataTypes.STRING,
    defaultValue: 'None',
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue:
      'https://res.cloudinary.com/schrodinger-s-pantry/image/upload/v1649210858/eftem6mzfrhgcnpbevuk.png',
  },
  theme: {
    type: DataTypes.STRING,
    defaultValue: 'light',
  },
});

const Recipe = sql.define('recipes', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  title: DataTypes.STRING,
  ingredients: DataTypes.STRING(500),
  instructions: DataTypes.STRING(1000),
  vote_count: DataTypes.INTEGER,
  comment_count: DataTypes.INTEGER,
});

const Bookmark = sql.define('bookmarks', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  link: DataTypes.STRING,
  title: DataTypes.STRING,
  creator: DataTypes.STRING,
  relTime: DataTypes.STRING,
  img: DataTypes.STRING,
});

const User_Bookmark = sql.define('user_bookmarks', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
});

const Favorite = sql.define('favorites', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  recipeId: DataTypes.STRING,
  userId: DataTypes.STRING,
});

const Comment = sql.define('comments', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  mealId: DataTypes.STRING,
  userName: DataTypes.STRING,
  text: DataTypes.STRING,
});

const Vote = sql.define('votes', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
});

const Tag = sql.define('tags', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  text: DataTypes.STRING,
});

const Recipe_Tag = sql.define('recipe_tags', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  recipe_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Recipe,
      key: 'id',
    },
  },
  tag_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Tag,
      key: 'id',
    },
  },
});

const Image = sql.define('images', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  recipe_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Recipe,
      key: 'id',
    },
  },
  img: DataTypes.STRING,
});

const User_Image = sql.define('user_images', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  //eg. 'profile pic' or 'recipe pic"
  description: DataTypes.STRING,

  url: DataTypes.STRING,

  recipe_id: {
    type: DataTypes.INTEGER,

    references: {
      model: Recipe,
      key: 'id',
    },
    allowNull: true,
  },
});

//DEFINE MODEL RELATIONSHIPS HERE
User.belongsToMany(Bookmark, { through: 'user_bookmarks' });
Bookmark.belongsToMany(User, { through: 'user_bookmarks' });

User.hasMany(Recipe);
Recipe.belongsTo(User);

User.belongsToMany(Recipe, { through: 'favorites' });
Recipe.belongsToMany(User, { through: 'favorites' });

User.belongsToMany(Recipe, { through: 'votes' });
Recipe.belongsToMany(User, { through: 'votes' });

User.belongsToMany(Recipe, { through: 'comments' });
Recipe.belongsToMany(User, { through: 'comments' });

User.hasMany(User_Image);
User_Image.belongsTo(User);

sql
  .sync() //insert {alter: true}(alters tables if necessary) or {force: true}(drops all tables and recreates them every save) if you need to change the db structure
  .then(() => console.log('Models synced!'))
  .catch((err) => console.error(err));

module.exports = {
  sql,
  User,
  Recipe,
  Bookmark,
  User_Bookmark,
  Favorite,
  Comment,
  Vote,
  Tag,
  Recipe_Tag,
  Image,
  User_Image,
};
