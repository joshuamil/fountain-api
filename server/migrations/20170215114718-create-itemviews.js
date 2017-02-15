'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('itemviews', {

      viewid: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      itemid: {
        type: DataTypes.UUID
      },
      referreditemid: {
        type: DataTypes.UUID
      },
      remote_addr: {
        type: DataTypes.STRING
      },
      dateviewed: {
        type: DataTypes.DATE
      },
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      }

    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('itemviews');
  }
};
