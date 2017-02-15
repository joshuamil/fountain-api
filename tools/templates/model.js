/**
 * This model reflects the structure of the associated database table or target
 * storage location. If you make modifications to your source table, they should
 * be reflected here as well.
 *
 */

'use strict';

module.exports = function(sequelize, DataTypes) {

  var [MODEL] = sequelize.define('[MODEL]', {

      [COLUMNS]
    }, {
      freezeTableName: true,
      tableName: '[MODEL]'
    }, {
      classMethods: {
        associate: function (models) {
          // associations can be defined here
        }
      }
    }

  );

  [MODEL].removeAttribute('id');
  return [MODEL];

};
