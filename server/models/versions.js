/**
 * This model reflects the structure of the associated database table or target
 * storage location. If you make modifications to your source table, they should
 * be reflected here as well.
 *
 */

'use strict';

module.exports = function(sequelize, DataTypes) {

  var versions = sequelize.define('versions', {

      configid: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      versionfull: {
        type: DataTypes.STRING
      },
      versionmajor: {
        type: DataTypes.INTEGER
      },
      versionminor: {
        type: DataTypes.INTEGER
      },
      versionrelease: {
        type: DataTypes.INTEGER
      },
      versionpatch: {
        type: DataTypes.INTEGER
      },
      versionname: {
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.STRING
      },
      releasenotes: {
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
      tableName: 'versions'
    }, {
      classMethods: {
        associate: function (models) {
          // associations can be defined here
        }
      }
    }

  );

  versions.removeAttribute('id');
  return versions;

};
