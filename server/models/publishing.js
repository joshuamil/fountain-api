/**
 * This model reflects the structure of the associated database table or target
 * storage location. If you make modifications to your source table, they should
 * be reflected here as well.
 *
 */

'use strict';

module.exports = function(sequelize, DataTypes) {

  var publishing = sequelize.define('publishing', {

      configid: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      siteid: {
        type: DataTypes.UUID
      },
      name: {
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.STRING
      },
      type: {
        type: DataTypes.STRING
      },
      schedulecron: {
        type: DataTypes.STRING
      },
      targets: {
        type: DataTypes.STRING
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
      tableName: 'publishing'
    }, {
      classMethods: {
        associate: function (models) {
          // associations can be defined here
        }
      }
    }

  );

  publishing.removeAttribute('id');
  return publishing;

};
