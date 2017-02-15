/**
 * This route defines the CRUD operations for a given route in the API.
 * Each entity you wish to interact with inside of Fountain should have a
 * corresponding route file structured like this.
 *
 */

'use strict';
module.exports = function(sequelize, DataTypes) {

  var website = sequelize.define('website', {

      siteid: {
        type: DataTypes.UUID
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING
      },
      datecreated: {
        type: DataTypes.DATE
      },
      copyrightholder: {
        type: DataTypes.STRING
      },
      copyrightyear: {
        type: DataTypes.INTEGER
      },
      deleted: {
        type: DataTypes.BOOLEAN
      }

    },

    {
      classMethods: {
        associate: function (models) {
          // associations can be defined here
        }
      }
    }

  );

  website.removeAttribute('id');
  return website;

};
