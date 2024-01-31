const Express = require("express");
const Fuse = require("fuse.js");
const DATA = require("./data.json");
const app = Express();

app.get("/api/countries", function getCountries(req, res, next) {
  let matches = DATA;
  if (req.query["region"]) {
    const fuse = new Fuse(matches, {
      keys: ["region"],
      threshold: 0,
    });
    matches = fuse.search(req.query.region).map((result) => result.item);
  }

  if (req.query["name"]) {
    const fuse = new Fuse(matches, {
      keys: ["name"],
      minMatchCharLength: 3,
      distance: 1000,
      threshold: 0.2,
    });
    matches = fuse.search(req.query.name).map((result) => result.item);
  }

  res.status(200).json(matches);
});

app.get("/api/countries/:code", function getCountryByCode(req, res, next) {
  const countryCode = req.params.code;

  if (!countryCode) return res.status(400).send();

  if (!/^\w{3}$/.test(countryCode)) {
    return res.status(400).send("Expected 3 letter country code");
  }

  const country = DATA.find(
    (country) => country.alpha3Code === countryCode.toUpperCase()
  );

  if (!country) {
    return res.status(404).send(`No country found matching ${countryCode}`);
  }

  return res.status(200).json(country);
});

app.listen(3001, () => console.log("listening on port 3001"));
