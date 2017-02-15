'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('websitemetadata', {

      metaid: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      siteid: {
        type: DataTypes.UUID
      },
      lang: {
        type: DataTypes.STRING
      },
      title: {
        type: DataTypes.STRING
      },
      shortdesc: {
        type: DataTypes.STRING
      },
      longdesc: {
        type: DataTypes.STRING
      },
      type: {
        type: DataTypes.STRING
      },
      url: {
        type: DataTypes.STRING
      },
      image: {
        type: DataTypes.STRING
      },
      fb_appid: {
        type: DataTypes.STRING
      },
      fb_adminid: {
        type: DataTypes.STRING
      },
      tw_id: {
        type: DataTypes.STRING
      },
      tw_name: {
        type: DataTypes.STRING
      },
      gplus_id: {
        type: DataTypes.STRING
      },
      favicon: {
        type: DataTypes.STRING
      },
      mobile_icon_57: {
        type: DataTypes.STRING
      },
      mobile_icon_72: {
        type: DataTypes.STRING
      },
      mobile_icon_76: {
        type: DataTypes.STRING
      },
      mobile_icon_114: {
        type: DataTypes.STRING
      },
      mobile_icon_120: {
        type: DataTypes.STRING
      },
      mobile_icon_144: {
        type: DataTypes.STRING
      },
      mobile_icon_152: {
        type: DataTypes.STRING
      },
      mobile_icon_180: {
        type: DataTypes.STRING
      },
      privacypolicy: {
        type: DataTypes.STRING
      },
      termsofuse: {
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

    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('websitemetadata');
  }
};
