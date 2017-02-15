/**
 * This model reflects the structure of the associated database table or target
 * storage location. If you make modifications to your source table, they should
 * be reflected here as well.
 *
 */

'use strict';

module.exports = function(sequelize, DataTypes) {

  var exhibitauthors = sequelize.define('exhibitauthors', {

      exhibitid: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      authorid: {
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
      tableName: 'exhibitauthors'
    }, {
      classMethods: {
        associate: function (models) {
          // associations can be defined here
        }
      }
    }

  );

  exhibitauthors.removeAttribute('id');
  return exhibitauthors;

};
