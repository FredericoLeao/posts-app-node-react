'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    queryInterface.addColumn(
      'Posts',
      'likeCount',
      {
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: 0,
      }
    );
    queryInterface.addColumn(
      'Posts',
      'dislikeCount',
      {
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: 0,
      }
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    queryInterface.removeColumn('Posts', 'likeCount');
    queryInterface.removeColumn('Posts', 'dislikeCount');
  }
};
