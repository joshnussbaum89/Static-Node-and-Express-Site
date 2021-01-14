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
  res.render("about", { projects });
});

// Projects View
app.get("/project/:id", (req, res, next) => {
  // renders the view of the project with specific .id
  // that specific project defines the local variables for the view.
  // console.log(req.params, projects[req.params.id]);
  res.render("project", projects[req.params.id]);
});

// 404 Error
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);

  // Errors need to be made nicer. Render different pages for 404 or 500
  if (err.status === 404) {
    res
      .status(404)
      .send(
        `<h1>Oh no! That's a ${err.status}. Over and out.</h1><h3>${err.message}</h3>`
      );
  } else {
    err.message = err.message || `Oops!`;
    res.status(err.status || 500).render("error", { err });
  }

  console.log(err.message, err.status);
});

// Looks for environment port OR localhost:3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`The application is running on port ${PORT}`);
});
