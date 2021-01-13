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
  res.render("index");
});

// About view
app.get("/about", (req, res) => {
  res.render("about");
});

// Projects View
app.get("/project/:id", (req, res, next) => {
  const { id } = req.params;
  const found = projects.find((project) => project.id === +id);

  if (found) {
    res.render("project", { found }); // This pauses execution if project/number > 4 WTF
  }
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
  res.send(
    `<h1>Oh no! That's a ${err.status}. Over and out.</h1><h3>${err.message}</h3>`
  );
  console.log(err.message, err.status);
});

// Looks for environment port OR localhost:3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`The application is running on port ${PORT}`);
});
