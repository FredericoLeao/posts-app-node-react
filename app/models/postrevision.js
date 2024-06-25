'use strict';
const {
  Model,
  DataTypes,
} = require('sequelize');
module.exports = (sequelize) => {
  class PostRevision extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PostRevision.init({
    postId: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    title: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'PostRevision',
  });
  return PostRevision;
};