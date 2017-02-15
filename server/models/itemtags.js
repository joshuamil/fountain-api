/**
 * This model reflects the structure of the associated database table or target
 * storage location. If you make modifications to your source table, they should
 * be reflected here as well.
 *
 */

'use strict';

module.exports = function(sequelize, DataTypes) {

  var itemtags = sequelize.define('itemtags', {

      itemid: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      tagid: {
        type: DataTypes.UUID
      },
      tagstrength: {
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

    }, {
      freezeTableName: true,
      tableName: 'itemtags'
    }, {
      classMethods: {
        associate: function (models) {
          // associations can be defined here
        }
      }
    }

  );

  itemtags.removeAttribute('id');
  return itemtags;

};
