'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('websitetags', {

      siteid: {
        type: DataTypes.UUID
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
    return queryInterface.dropTable('websitetags');
  }
};
