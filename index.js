"use strict";

const express = require("express");
const app = express();

// 4_1.1
app.get("/math/circle/:r", (req, res) => {
  const r = parseFloat(req.params.r);

  if (isNaN(r) || r < 0) {
    return res.status(400).json({ error: "Promień musi być liczbą nieujemną" });
  }

  const result = {
    area: (Math.PI * r * r).toFixed(2),
    circumference: (2 * Math.PI * r).toFixed(2),
  };

  res.json(result);
});

//4_1.2
app.get("/math/rectangle/:width/:height", (req, res) => {
  const width = parseFloat(req.params.width);
  const height = parseFloat(req.params.height);

  if (isNaN(width) || isNaN(height) || width < 0 || height < 0) {
    return res
      .status(400)
      .json({ error: "Szerokość i wysokość muszą być liczbami nieujemnymi" });
  }

  const result = {
    area: width * height,
    perimeter: 2 * (width + height),
  };

  res.json(result);
});
//4_1.3
app.get("/math/power/:base/:exponent", (req, res) => {
  const base = parseFloat(req.params.base);
  const exponent = parseFloat(req.params.exponent);

  if (isNaN(base) || isNaN(exponent)) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const result = { result: Math.pow(base, exponent) };

  if (req.query.root === "true") {
    result.root = Math.sqrt(base);
  }

  res.json(result);
});

//4_2.1be
app.use(express.json());

//Dane
let categories = ["funnyJoke", "lameJoke"];

let funnyJoke = [
  {
    joke: "Dlaczego komputer poszedł do lekarza?",
    response: "Bo złapał wirusa!",
  },
  {
    joke: "Dlaczego komputer nie może być głodny?",
    response: "Bo ma pełen dysk!",
  },
  {
    joke: "Co mówi jeden bit do drugiego?",
    response: "„Trzymaj się, zaraz się przestawiamy!”",
  },
];

let lameJoke = [
  {
    joke: "Dlaczego programiści preferują noc?",
    response: "Bo w nocy jest mniej bugów do łapania!",
  },
  {
    joke: "Jak nazywa się bardzo szybki programista?",
    response: "Błyskawiczny kompilator!",
  },
];

const jokes = { funnyJoke, lameJoke };

//Endpoint 1
app.get("/jokebook/categories", (req, res) => {
  res.json(categories);
});

//Endpoint 2
app.get("/jokebook/joke/:category", (req, res) => {
  const category = req.params.category;

  if (!categories.includes(category)) {
    return res.status(400).json({ error: `no jokes for category ${category}` });
  }

  const list = jokes[category];
  const randomJoke = list[Math.floor(Math.random() * list.length)];

  res.json(randomJoke);
});

//Endpoint 3
// DELETE przykład curl -X DELETE http://localhost:3000/jokebook/joke/lameJoke/0

app.delete("/jokebook/joke/del/:category/:index", (req, res) => {
  const category = req.params.category;
  const index = Number(req.params.index);

  if (!categories.includes(category)) {
    return res
      .status(400)
      .json({ error: `no jokes for category ${category}` });
  }

  const list = jokes[category];

  if (!Number.isInteger(index) || index < 0 || index >= list.length) {
    return res.status(400).json({ error: "Invalid index" });
  }

  const [removed] = list.splice(index, 1);

  res.json({ removed, remaining: list });
});

//Endpoint 4
//4_2.2be
app.post("/jokebook/joke/:category", (req, res) => {
  const category = req.params.category;
  const { joke, response } = req.body;

  if (!categories.includes(category)) {
    return res
      .status(400)
      .json({ error: `no jokes for category ${category}` });
  }

  if (!joke || !response) {
    return res.status(400).json({ error: "Invalid or incomplete input" });
  }

  jokes[category].push({ joke, response });

  res.status(201).json({
    message: `Joke added to category ${category}`,
    joke: { joke, response },
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
