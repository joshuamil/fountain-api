'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('language', {

      langid: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      lang: {
        type: DataTypes.STRING
      },
      locale: {
        type: DataTypes.STRING
      },
      label: {
        type: DataTypes.STRING
      },
      isdefault: {
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
    return queryInterface.dropTable('language');
  }
};
