'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('exhibits', {

      exhibitid: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      lang: {
        type: DataTypes.STRING
      },
      title: {
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.STRING
      },
      datepublished: {
        type: DataTypes.DATE
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
    return queryInterface.dropTable('exhibits');
  }
};
