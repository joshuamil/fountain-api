/**
 * This model reflects the structure of the associated database table or target
 * storage location. If you make modifications to your source table, they should
 * be reflected here as well.
 *
 */

'use strict';

module.exports = function(sequelize, DataTypes) {

  var exhibititems = sequelize.define('exhibititems', {

      exhibitid: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      itemid: {
        type: DataTypes.UUID
      },
      sortorder: {
        type: DataTypes.INTEGER
      },
      islead: {
        type: DataTypes.BOOLEAN
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
      tableName: 'exhibititems'
    }, {
      classMethods: {
        associate: function (models) {
          // associations can be defined here
        }
      }
    }

  );

  exhibititems.removeAttribute('id');
  return exhibititems;

};
