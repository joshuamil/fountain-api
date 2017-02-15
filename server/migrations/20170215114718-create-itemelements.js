'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('itemelements', {

      itemid: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      elementid: {
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
    return queryInterface.dropTable('itemelements');
  }
};
