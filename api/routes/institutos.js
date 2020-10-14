const express = require("express");
const router = express.Router();
const models = require("../models");

router.get("/", (req, res, next) => {
  models.Instituto
    .findAll({
      attributes: ["id", "name"]
    })
    .then(institutos => res.send(institutos))
    .catch(error => {return next(error)});
});

router.post("/", (req, res) => {
  models.Instituto
    .create({ name: req.body.name })
    .then(instituto => res.status(201).send({ id: instituto.id }))
    .catch(error => {
      if (error == "SequelizeUniqueConstraintError: Validation error") {
        res.status(400).send('Bad request: existe otra instituto con el mismo nombre')
      }
      else {
        console.log(`Error al intentar insertar en la base de datos: ${error}`)
        res.sendStatus(500)
      }
    });
});

const findInstituto = (id, { onSuccess, onNotFound, onError }) => {
  models.Instituto
    .findOne({
      attributes: ["id", "name"],
      include: [{as: 'carreras', model:models.Carrera, attributes: ["id", "name"]}],
      where: { id }
    })
    .then(instituto => (instituto ? onSuccess(instituto) : onNotFound()))
    .catch(() => onError());
};

router.get("/:id", (req, res) => {
  findInstituto(req.params.id, {
    onSuccess: instituto => res.send(instituto),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.put("/:id", (req, res) => {
  const onSuccess = instituto =>
  instituto
      .update({ nombre: req.body.name }, { fields: ["name"] })
      .then(() => res.sendStatus(200))
      .catch(error => {
        if (error == "SequelizeUniqueConstraintError: Validation error") {
          res.status(400).send('Bad request: existe otra instituto con el mismo nombre')
        }
        else {
          console.log(`Error al intentar actualizar la base de datos: ${error}`)
          res.sendStatus(500)
        }
      });
    findInstituto(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.delete("/:id", (req, res) => {
  findInstituto(req.params.id, {
    onSuccess: (instituto) => 
      instituto.destroy()
        .then(() => res.sendStatus(200))
        .catch(() => res.sendStatus(500)),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

module.exports = router;
