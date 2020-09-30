'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class materia extends Model {
    static associate(models) {
      this.belongsTo(models.carrera, {
        as: 'carrera_relacionada',
        foreignKey: 'id_carrera'
      })
    }
  };
  materia.init({
    nombre: DataTypes.STRING,
    id_carrera: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'materia',
  });
  return materia;
};