const fs = require("fs");
const path = require("path");
const dbPath = `/../DB/data/info.json`;
const infos = JSON.parse(fs.readFileSync(path.join(__dirname, dbPath)));
const hero = infos.hero;

exports.getAll = (req, res) => {
  res.status(200).json({
    status: "success",
    results: hero.length,
    reqTime: req.requestTime,
    data: { ...hero },
  });
};

exports.patchAll = (req, res) => {
  const newHero = req.body;
  infos.hero = newHero;
  fs.writeFile(path.join(__dirname, dbPath), JSON.stringify(infos), (err) => {
    console.log(err);
    res.status(201).json({
      status: "success",
      data: { ...hero },
    });
  });
};
