const router = require("express").Router();

// GET home page
router.get("/", (req, res, next) => {
  res.render("index");
});

// Link con "celebrities.routes.js"
const celebritiesRouter = require("./celebrities.routes");
router.use("/celebrities", celebritiesRouter);

// Link con "movies.routes.js"
const moviesRouter = require("./movies.routes.js");
router.use("/movies", moviesRouter);

module.exports = router;
