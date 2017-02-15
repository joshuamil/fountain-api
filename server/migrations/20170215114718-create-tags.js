'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('tags', {

      tagid: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      tag: {
        type: DataTypes.STRING
      },
      lang: {
        type: DataTypes.STRING
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
    return queryInterface.dropTable('tags');
  }
};
