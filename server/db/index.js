const { Sequelize, DataTypes } = require('sequelize');
const sql = new Sequelize('pantry', 'postgres', 'pos$gres$', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false
});

const User = sql.define('users', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  name: DataTypes.STRING,
  preference: DataTypes.STRING
});

const Recipe = sql.define('recipes', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  text: DataTypes.STRING,
  vote_count: DataTypes.INTEGER,
  comment_count: DataTypes.INTEGER
});

const Bookmark = sql.define('bookmarks', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  url: DataTypes.STRING
});

const User_Bookmark = sql.define('user_bookmark', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  bookmark_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Bookmark,
      key: 'id'
    }
  }
});

const Favorite = sql.define('favorites', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  recipe_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Recipe,
      key: 'id'
    }
  }
});

const Comment = sql.define('comments', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  recipe_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Recipe,
      key: 'id'
    }
  },
  text: DataTypes.STRING
});

const Vote = sql.define('votes', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  recipe_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Recipe,
      key: 'id'
    }
  }
});

const Tag = sql.define('tags', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  text: DataTypes.STRING
});

const Recipe_Tag = sql.define('recipe_tags', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  recipe_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Recipe,
      key: 'id'
    }
  },
  tag_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Tag,
      key: 'id'
    }
  }
});

const Image = sql.define('images', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  recipe_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Recipe,
      key: 'id'
    }
  },
  img: DataTypes.STRING
})

sql.sync({ alter: true })
  .then(() => console.log('Models synced!'))
  .catch(err => console.error(err));

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
  Image
}