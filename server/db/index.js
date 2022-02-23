require('dotenv').config()
const { DB_NAME, DB_USER, DB_PW} = process.env;
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
  name: DataTypes.STRING,
  preference: DataTypes.STRING,
});

const Recipe = sql.define('recipes', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.STRING,
    references: {
      model: User,
      key: 'id'
    }
  },
  title: DataTypes.STRING,
  ingredients: DataTypes.STRING,
  instructions: DataTypes.STRING,
  vote_count: DataTypes.INTEGER,
  comment_count: DataTypes.INTEGER,
});

const Bookmark = sql.define('bookmarks', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  url: DataTypes.STRING,
});

const User_Bookmark = sql.define('user_bookmark', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.STRING,
    references: {
      model: User,
      key: 'id',
    },
  },
  bookmark_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Bookmark,
      key: 'id',
    },
  },
});

const Favorite = sql.define('favorites', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.STRING,
    references: {
      model: User,
      key: 'id',
    },
  },
  recipe_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Recipe,
      key: 'id',
    },
  },
});

const Comment = sql.define('comments', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.STRING,
    references: {
      model: User,
      key: 'id',
    },
  },
  recipe_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Recipe,
      key: 'id',
    },
  },
  text: DataTypes.STRING,
});

const Vote = sql.define('votes', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.STRING,
    references: {
      model: User,
      key: 'id',
    },
  },
  recipe_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Recipe,
      key: 'id',
    },
  },
});

const Tag = sql.define('tags', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  text: DataTypes.STRING,
});

const Recipe_Tag = sql.define('recipe_tags', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
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
    autoIncrement: true
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

sql
  .sync() //insert {alter: true} if you need to change the db structure
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
};
