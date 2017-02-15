'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('mediaelements', {

      elementid: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      mediatypeid: {
        type: DataTypes.UUID
      },
      lang: {
        type: DataTypes.STRING
      },
      mediasource: {
        type: DataTypes.STRING
      },
      title: {
        type: DataTypes.STRING
      },
      caption: {
        type: DataTypes.STRING
      },
      alttext: {
        type: DataTypes.STRING
      },
      credit: {
        type: DataTypes.STRING
      },
      datasources: {
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
    return queryInterface.dropTable('mediaelements');
  }
};
