'use strict';
module.exports = function(sequelize, DataTypes) {

  var authors = sequelize.define('authors', {

      authorid:{
        type: DataTypes.UUID,
        primaryKey: true
      },
      firstname:{ type: DataTypes.STRING },
      lastname:{ type: DataTypes.STRING },
      credentials: { type: DataTypes.STRING },
      email:{ type: DataTypes.STRING },
      twitter: { type: DataTypes.STRING },
      facebook: { type: DataTypes.STRING },
      googleplus: { type: DataTypes.STRING },
      instagram: { type: DataTypes.STRING },
      passcode: { type: DataTypes.STRING },
      createdAt: { type: DataTypes.DATE },
      updatedAt: { type: DataTypes.DATE },
      deleted: { type: DataTypes.BOOLEAN }

    },

    {
      classMethods: {
        associate: function (models) {
          // associations can be defined here
        }
      }
    }

  );

  authors.removeAttribute('id');
  authors.removeAttribute('createdAt');
  authors.removeAttribute('updatedAt');
  return authors;

};
