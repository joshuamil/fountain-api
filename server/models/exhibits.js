/**
 * This model reflects the structure of the associated database table or target
 * storage location. If you make modifications to your source table, they should
 * be reflected here as well.
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
      },
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      }

    }, {
      freezeTableName: true,
      tableName: 'exhibits'
    }, {
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
