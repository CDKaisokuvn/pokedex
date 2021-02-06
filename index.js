const express = require("express");
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const axios = require("axios");

const app = express();

app.use(cors());
const port = process.env.PORT || 5000;

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static(path.join(__dirname, "public")));

app.get("/pokemon/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { data } = await axios("https://pokeapi.glitch.me/v1/pokemon/" + id);
    const test = +id;
    if (!test && data) {
      res.redirect("/" + data[0].number);
    }
    res.render("index", { data: data[0] });
  } catch (error) {
    res.redirect("/");
  }
});

app.get("/", async (req, res) => {
  try {
    const slug = req.query.q || 1;
    const { data } = await axios(
      "https://pokeapi.glitch.me/v1/pokemon/" + slug
    );
    res.render("index", { data: data[0] });
  } catch (error) {
    res.redirect("/");
  }
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
