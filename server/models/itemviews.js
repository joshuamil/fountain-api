/**
 * This model reflects the structure of the associated database table or target
 * storage location. If you make modifications to your source table, they should
 * be reflected here as well.
 *
 */

'use strict';

module.exports = function(sequelize, DataTypes) {

  var itemviews = sequelize.define('itemviews', {

      viewid: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      itemid: {
        type: DataTypes.UUID
      },
      referreditemid: {
        type: DataTypes.UUID
      },
      remote_addr: {
        type: DataTypes.STRING
      },
      dateviewed: {
        type: DataTypes.DATE
      },
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      }

    }, {
      freezeTableName: true,
      tableName: 'itemviews'
    }, {
      classMethods: {
        associate: function (models) {
          // associations can be defined here
        }
      }
    }

  );

  itemviews.removeAttribute('id');
  return itemviews;

};
