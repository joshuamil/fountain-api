'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('exhibititems', {

      exhibitid: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      itemid: {
        type: DataTypes.UUID
      },
      sortorder: {
        type: DataTypes.INTEGER
      },
      islead: {
        type: DataTypes.BOOLEAN
      },
      deleted: {
        type: DataTypes.BOOLEAN
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
    return queryInterface.dropTable('exhibititems');
  }
};
