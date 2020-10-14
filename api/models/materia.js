'use strict';
module.exports = (sequelize, DataTypes) => {
  const Materia = sequelize.define('Materia', {
    name: DataTypes.STRING,
    id_carrera: DataTypes.INTEGER
  }, {
    tableName: 'materias'
  });
  Materia.associate = function(models) {
    Materia.belongsTo(models.Carrera, {
      foreignKey: 'id_carrera',
      as: 'carrera'
    })
  };
  return Materia;
};
