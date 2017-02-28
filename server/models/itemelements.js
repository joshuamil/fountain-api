/**
 * This model reflects the structure of the associated database table or target
 * storage location. If you make modifications to your source table, they should
 * be reflected here as well.
 *
 */

'use strict';

module.exports = function(sequelize, DataTypes) {

  var itemelements = sequelize.define('itemelements', {

      itemelementid: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      itemid: {
        type: DataTypes.UUID
      },
      elementid: {
        type: DataTypes.UUID
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
      tableName: 'itemelements'
    }, {
      classMethods: {
        associate: function (models) {
          // associations can be defined here
        }
      }
    }

  );

  itemelements.removeAttribute('id');
  return itemelements;

};
