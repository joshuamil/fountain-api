'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('itemauthors', {

      itemid: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      authorid: {
        type: DataTypes.UUID
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
    return queryInterface.dropTable('itemauthors');
  }
};
