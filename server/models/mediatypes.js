/**
 * This model reflects the structure of the associated database table or target
 * storage location. If you make modifications to your source table, they should
 * be reflected here as well.
 *
 */

'use strict';

module.exports = function(sequelize, DataTypes) {

  var mediatypes = sequelize.define('mediatypes', {

      mediatypeid: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      mediatype: {
        type: DataTypes.STRING
      },
      mimetype: {
        type: DataTypes.STRING
      },
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      }

    }, {
      freezeTableName: true,
      tableName: 'mediatypes'
    }, {
      classMethods: {
        associate: function (models) {
          // associations can be defined here
        }
      }
    }

  );

  mediatypes.removeAttribute('id');
  return mediatypes;

};
