// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

// GET "/celebrities/create" => muestra un formulario para crear celebrities
router.get("/create", async (req, res, next) => {
  try {
    res.render("celebrities/new-celebrity");
  } catch (err) {
    next(err);
  }
});

// POST "/celebrities/create" => envia la data del formulario para crear la celebrity e añadirla a la DB
router.post("/create", async (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  try {
    await Celebrity.create({ name, occupation, catchPhrase });
    res.redirect("/celebrities");
  } catch (err) {
    next(err);
  }
});

// GET "/celebrities" => muestra todas las celebrities
router.get("/", async (req, res, next) => {
  try {
    const response = await Celebrity.find().select({ name: 1 });
    console.log(response);
    res.render("celebrities/celebrities", {
      allCelebrities: response,
    });
  } catch (err) {
    next(err);
  }
});

// GET "/celebrities/:id" => nos lleva a una vista donde muestra los detalles de la celebrity sobre la que cliquemos en la lista de celebrities
router.get("/:id", async (req, res, next) => {
  try {
    const response = await Celebrity.findById(req.params.id);
    res.render("celebrities/celebrity-details", {
      oneCelebrity: response,
    });
  } catch (err) {
    next(err);
  }
});

// POST "/celebrities/:id/delete" => borra una celebrity especifica de la DB
router.post("/:id/delete", async (req, res, next) => {
  try {
    await Celebrity.findByIdAndRemove(req.params.id);
    res.redirect("/celebrities");
  } catch (err) {
    next(err);
  }
});

// GET "/celebrities/:id/edit" => nos lleva a una vista donde muestra los detalles de la celebrity sobre la que cliquemos en la lista de celebrities para editarla
router.get("/:id/edit", async (req, res, next) => {
  try {
    const response = await Celebrity.findById(req.params.id);
    res.render("celebrities/edit-celebrity", {
      oneCelebrity: response
    });
  } catch (err) {
    next(err);
  }
});

// POST "/celebrities/:id/edit" => edita una celebrity especifica de la DB
router.post("/:id/edit", async (req, res, next) => {
  try {
    const response = await Celebrity.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      occupation: req.body.occupation,
      catchPhrase: req.body.catchPhrase,
    });
    res.redirect(`/celebrities/${req.params.id}`);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
