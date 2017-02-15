'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('subscribers', {

      configid: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.STRING
      },
      ratecalls: {
        type: DataTypes.INTEGER
      },
      rateduration: {
        type: DataTypes.INTEGER
      },
      quotacalls: {
        type: DataTypes.INTEGER
      },
      quotaduration: {
        type: DataTypes.INTEGER
      },
      ipsallowed: {
        type: DataTypes.STRING
      },
      ipsdenied: {
        type: DataTypes.STRING
      },
      priority: {
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
    return queryInterface.dropTable('subscribers');
  }
};
