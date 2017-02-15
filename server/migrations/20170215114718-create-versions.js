'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('versions', {

      configid: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      versionfull: {
        type: DataTypes.STRING
      },
      versionmajor: {
        type: DataTypes.INTEGER
      },
      versionminor: {
        type: DataTypes.INTEGER
      },
      versionrelease: {
        type: DataTypes.INTEGER
      },
      versionpatch: {
        type: DataTypes.INTEGER
      },
      versionname: {
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.STRING
      },
      releasenotes: {
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
    return queryInterface.dropTable('versions');
  }
};
