const { info } = require("console");
const fs = require("fs");
const path = require("path");
const dbPath = `/../DB/data/info.json`;
const infos = JSON.parse(fs.readFileSync(path.join(__dirname, dbPath)));
const subs = infos.subscribers;

const validateToken = (token) => {
  return tokens.includes(token);
};

const tokens = [
  "7ImtNTUmDY",
  "LwBXKjSy7t",
  "eG0xr9Lgd6",
  "U9gENKxgba",
  "8NFduS52JN",
  "kSow0B3bzH",
  "EWC0EYknAZ",
  "cvrUwGWfzJ",
  "USoZ4QnrMm",
  "dYa6zGZOPe",
];

exports.validateID = (req, res, next, token) => {
  const isValid = validateToken(token);
  if (!isValid) {
    return res.status(404).json({
      status: "failed",
      message: "Not valid user",
    });
  }
  next();
};

exports.getAll = (req, res) => {
  res.status(200).json({
    status: "success",
    results: hero.length,
    reqTime: req.requestTime,
    data: { ...hero },
  });
};

exports.addOne = (req, res) => {
  const newSub = req.body;
  subs = subs.push(newSub);
  info.subs = subs;
  fs.writeFile(path.join(__dirname, dbPath), JSON.stringify(info), (err) => {
    console.log(err);
    res.status(201).json({
      status: "success",
      data: { ...subs },
    });
  });
};

// exports.patchAll = (req, res) => {
//   const newHero = req.body;
//   infos.hero = newHero;
//   fs.writeFile(path.join(__dirname, dbPath), JSON.stringify(infos), (err) => {
//     console.log(err);
//     res.status(201).json({
//       status: "success",
//       data: { ...hero },
//     });
//   });
// };
