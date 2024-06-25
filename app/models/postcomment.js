'use strict';

const {
  Model,
  DataTypes,
} = require('sequelize');
const PostCommentService = require('../services/postCommentService');

module.exports = (sequelize) => {
  class PostComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PostComment.init({
    postId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    comment: DataTypes.STRING,
    deletedAt: DataTypes.DATE,
    deletedUserId: DataTypes.INTEGER,
  }, {
    hooks: {
      afterCreate: (postComment, options) => {
        PostCommentService.sendNewPostCommentEmail(postComment);
      }
    },
    sequelize,
    modelName: 'PostComment',
    paranoid: true,
  });
  return PostComment;
};