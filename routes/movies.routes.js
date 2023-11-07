// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// GET "/movies/create" => muestra un formulario para crear movie
router.get("/create", async (req, res, next) => {
  try {
    const response = await Celebrity.find().select({ name: 1 });
    res.render("movies/new-movie.hbs", {
      allCelebrities: response,
    });
  } catch (err) {
    next(err);
  }
});

// POST "/movies/create" => envia la data del formulario para crear la movie y añadirla a la DB
router.post("/create", async (req, res, next) => {
  try {
    const { title, genre, plot, cast } = req.body;
    await Movie.create({ title, genre, plot, cast });
    res.redirect("/movies");
  } catch (err) {
    next(err);
  }
});

// GET "/movies" => muestra todas las movies
router.get("/", async (req, res, next) => {
  try {
    const response = await Movie.find().select({ title: 1 });
    res.render("movies/movies", {
      allMovies: response,
    });
  } catch (err) {
    next(err);
  }
});

// GET "/movies/:id" => nos lleva a una vista donde muestra los detalles de la movie sobre la que cliquemos en la lista de movies
router.get("/:id", async (req, res, next) => {
  try {
    const response = await Movie.findById(req.params.id).populate("cast");
    res.render("movies/movie-details", {
      oneMovie: response,
    });
  } catch (err) {
    next(err);
  }
});

// POST "/movies/:id/delete" => borra una pelicula especifica de la DB
router.post("/:id/delete", async (req, res, next) => {
  try {
    await Movie.findByIdAndRemove(req.params.id);
    res.redirect("/movies");
  } catch (err) {
    next(err);
  }
});

// GET "/movies/:id/edit" => nos lleva a una vista donde muestra los detalles de la movie sobre la que cliquemos en la lista de movies para editarla
router.get("/:id/edit", async (req, res, next) => {
  try {
    const oneMovie = await Movie.findById(req.params.id).populate("cast");
    const allCelebrities = await Celebrity.find().select({ name: 1 });
    res.render("movies/edit-movie", {
      oneMovie,
      allCelebrities,
    });
  } catch (err) {
    next(err);
  }
});

// POST "/movies/:id/edit" => edita una pelicula especifica de la DB
router.post("/:id/edit", async (req, res, next) => {
  try {
    const response = await Movie.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      genre: req.body.genre,
      plot: req.body.plot,
      cast: req.body.cast,
    });
    res.redirect(`/movies/${req.params.id}`);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
