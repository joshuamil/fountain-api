/**
 * This route defines the CRUD operations for a given route in the API.
 * Each entity you wish to interact with inside of Fountain should have a
 * corresponding route file structured like this.
 *
 */

'use strict';
module.exports = function(sequelize, DataTypes) {

  var [MODEL] = sequelize.define('[MODEL]', {

      [COLUMNS]
    },

    {
      classMethods: {
        associate: function (models) {
          // associations can be defined here
        }
      }
    }

  );

  [MODEL].removeAttribute('id');
  return [MODEL];

};
