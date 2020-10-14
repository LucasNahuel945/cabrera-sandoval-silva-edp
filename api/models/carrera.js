'use strict';
module.exports = (sequelize, DataTypes) => {
  const Carrera = sequelize.define('Carrera', {
    name: DataTypes.STRING,
    id_instituto: DataTypes.INTEGER
  }, {
    tableName: 'carreras'
  });
  Carrera.associate = function(models) {
    Carrera.hasMany(models.Materia, {
      as: 'materias'
    })
    Carrera.belongsTo(models.Instituto, {
      foreignKey: 'id_instituto',
      as: 'instituto'
    })
  };
  return Carrera;
};
