const fs = require("fs");
const path = require("path");
const fileUpload = require("express-fileupload");
const dbPath = `/../DB/data/info.json`;
const infos = JSON.parse(fs.readFileSync(path.join(__dirname, dbPath)));
const images = infos.images;

exports.getAll = (req, res) => {
  res.status(200).json({
    status: "success",
    results: images.length,
    reqTime: req.requestTime,
    data: { ...images },
  });
};

exports.patchAll = (req, res) => {
  const images = req.body;
  infos.images = images;
  fs.writeFile(path.join(__dirname, dbPath), JSON.stringify(infos), (err) => {
    console.log(err);
    res.status(201).json({
      status: "success",
      data: { ...images },
    });
  });
};
