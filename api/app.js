const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const carreras = require('./routes/carreras');
const materias = require('./routes/materias');
const institutos = require('./routes/institutos');
const app = express();

// Configuracion carpeta de vistas y motor de plantillas (pug en este caso)
app.set('views', path.join(__dirname, 'views')); // carpeta => ./views
app.set('view engine', 'pug');

// Middlewares
app.use(morgan('dev')); // Muestra informacion de solicitudes al servidor
app.use(express.json()); // Permite trabajar con JSON
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // direccion de la carpeta publica

// Rutas
app.use('/api/carreras', carreras);
app.use('/api/materias', materias);
app.use('/api/institutos', institutos);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Manejador de errores
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = (req.app.get('env') === 'development') ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
