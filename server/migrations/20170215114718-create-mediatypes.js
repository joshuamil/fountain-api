'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('mediatypes', {

      mediatypeid: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      mediatype: {
        type: DataTypes.STRING
      },
      mimetype: {
        type: DataTypes.STRING
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
    return queryInterface.dropTable('mediatypes');
  }
};
