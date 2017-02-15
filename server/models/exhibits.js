/**
 * This route defines the CRUD operations for a given route in the API.
 * Each entity you wish to interact with inside of Fountain should have a
 * corresponding route file structured like this.
 *
 */

'use strict';
module.exports = function(sequelize, DataTypes) {

  var exhibits = sequelize.define('exhibits', {

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

  exhibits.removeAttribute('id');
  return exhibits;

};
