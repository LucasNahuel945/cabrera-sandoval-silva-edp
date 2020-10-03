'use strict';
module.exports = (sequelize, DataTypes) => {
  const Carrera = sequelize.define('Carrera', {
    name: DataTypes.STRING
  }, {
    tableName: 'carreras'
  });
  Carrera.associate = function(models) {
    Carrera.hasMany(models.Materia, {
      as: 'materias'
    })
  };
  return Carrera;
};
