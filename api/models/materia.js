'use strict';
module.exports = (sequelize, DataTypes) => {
  const Materia = sequelize.define('Materia', {
    name: DataTypes.STRING,
    carrera_id: DataTypes.INTEGER
  }, {
    tableName: 'materias'
  });
  Materia.associate = function(models) {
    Materia.belongsTo(models.Carrera, {
      foreignKey: 'carrera_id',
      as: 'carrera'
    })
  };
  return Materia;
};
