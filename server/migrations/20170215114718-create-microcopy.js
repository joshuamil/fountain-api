'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('microcopy', {

      entryid: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      lang: {
        type: DataTypes.STRING
      },
      key: {
        type: DataTypes.STRING
      },
      value: {
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
    return queryInterface.dropTable('microcopy');
  }
};
