const express = require("express");
const { projects } = require("./data.json");

// Create new app
const app = express();

// Set 'view engine' to 'pug'
app.set("view engine", "pug");

// Serve static files
app.use("/static", express.static("public"));

// Routes
app.get("/", (req, res) => {
  // renders the index view
  // locals object whose properties define the local variables for the view.
  res.render("index", { projects });
});

// About view
app.get("/about", (req, res) => {
  // renders the about view
  // locals object whose properties define the local variables for the view.
  res.render("about", { projects });
});

// Projects View
app.get("/project/:id", (req, res, next) => {
  // renders the view of the project with specific .id
  // that specific project defines the local variables for the view.
  res.render("project", projects[req.params.id]);
});

// 404 Error
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  err.message = "Whoops, page not found.";
  console.log(`${err.message} Error status: ${err.status}`);
  next(err);
});

// Global error handler
app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);

  if (err.status === 404) {
    res.status(404).render("page-not-found", { err });
  } else {
    err.status = 500;
    err.message = "Whoops, internal server error.";
    res.status(500).render("error", { err });
    console.log(`${err.message} Error status: ${err.status}`);
  }
});

// Looks for environment port OR localhost:3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`The application is running on port ${PORT}`);
});
