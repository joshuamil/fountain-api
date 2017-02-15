/**
 * This model reflects the structure of the associated database table or target
 * storage location. If you make modifications to your source table, they should
 * be reflected here as well.
 *
 */

'use strict';

module.exports = function(sequelize, DataTypes) {

  var subscribers = sequelize.define('subscribers', {

      configid: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.STRING
      },
      ratecalls: {
        type: DataTypes.INTEGER
      },
      rateduration: {
        type: DataTypes.INTEGER
      },
      quotacalls: {
        type: DataTypes.INTEGER
      },
      quotaduration: {
        type: DataTypes.INTEGER
      },
      ipsallowed: {
        type: DataTypes.STRING
      },
      ipsdenied: {
        type: DataTypes.STRING
      },
      priority: {
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
      tableName: 'subscribers'
    }, {
      classMethods: {
        associate: function (models) {
          // associations can be defined here
        }
      }
    }

  );

  subscribers.removeAttribute('id');
  return subscribers;

};
