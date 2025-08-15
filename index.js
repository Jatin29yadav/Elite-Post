const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidV4 } = require("uuid");
const methodOverride = require("method-override");

let port = 3005;

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

let posts = [
  {
    id: uuidV4(),
    username: "apnacollege",
    vibe: "Coding",
  },
  {
    id: uuidV4(),
    username: "Jatin Yadav",
    vibe: "Coding & Gaming",
  },
  {
    id: uuidV4(),
    username: "Jason",
    vibe: "Gaming",
  },
];

app.listen(port, () => {
  console.log(`Listening to the port ${port}`);
});

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/posts", (req, res) => {
  let { username, vibe } = req.body;
  let id = uuidV4();
  posts.push({ id, username, vibe });
  res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("detail.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newVibe = req.body.vibe;
  let post = posts.find((p) => id === p.id);
  post.vibe = newVibe;
  console.log(post);
  res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs", { post });
});

app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => id !== p.id);
  res.redirect("/posts");
});
