'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('[MODEL]', {

      [COLUMNS]
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('[MODEL]');
  }
};
