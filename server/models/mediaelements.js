/**
 * This model reflects the structure of the associated database table or target
 * storage location. If you make modifications to your source table, they should
 * be reflected here as well.
 *
 */

'use strict';

module.exports = function(sequelize, DataTypes) {

  var mediaelements = sequelize.define('mediaelements', {

      elementid: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      mediatypeid: {
        type: DataTypes.UUID
      },
      lang: {
        type: DataTypes.STRING
      },
      mediasource: {
        type: DataTypes.STRING
      },
      title: {
        type: DataTypes.STRING
      },
      caption: {
        type: DataTypes.STRING
      },
      alttext: {
        type: DataTypes.STRING
      },
      credit: {
        type: DataTypes.STRING
      },
      datasources: {
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
      tableName: 'mediaelements'
    }, {
      classMethods: {
        associate: function (models) {
          // associations can be defined here
        }
      }
    }

  );

  mediaelements.removeAttribute('id');
  return mediaelements;

};
