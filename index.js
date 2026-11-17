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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
