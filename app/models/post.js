'use strict';
const {
  Model,
  DataTypes,
} = require('sequelize');

const PostRevision = require('./postrevision');

module.exports = (sequelize) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Post.init({
    userId: DataTypes.INTEGER,
    viewCount: DataTypes.INTEGER,
    likeCount: DataTypes.INTEGER,
    dislikeCount: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE,
    lastRevision: {
      type: DataTypes.VIRTUAL,
      get() {
        return PostRevision(sequelize)
          .findOne({
            where: { postId: this.get('id') },
            order: [ ['createdAt', 'DESC'] ],
            offset: 0,
            limit: 1,
          });
      }
    },
    countRevision: {
      type: DataTypes.VIRTUAL,
      async get() {
        return await PostRevision(sequelize).count({ where: { postId: this.get('id')}})
      }
    }
  }, {
    sequelize,
    modelName: 'Post',
    paranoid: true,
  });
  return Post;
};