'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('itemtags', {

      itemid: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      tagid: {
        type: DataTypes.UUID
      },
      tagstrength: {
        type: DataTypes.INTEGER
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
    return queryInterface.dropTable('itemtags');
  }
};
