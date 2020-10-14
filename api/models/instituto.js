'use strict';
module.exports = (sequelize, DataTypes) => {
  const Instituto = sequelize.define('Instituto', {
    name: DataTypes.STRING
  }, {
    tableName: 'institutos'
  });
  Instituto.associate = function(models) {
    Instituto.hasMany(models.Carrera, {
        as: 'carreras'
    })
  };
  return Instituto;
};
