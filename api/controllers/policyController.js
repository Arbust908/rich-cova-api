const fs = require('fs')
const path = require('path')
const dbPath = `/../DB/data/info.json`
const infos = JSON.parse(fs.readFileSync(path.join(__dirname, dbPath)))
const policies = infos.policies

exports.getAll = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: policies.length,
    reqTime: req.requestTime,
    data: { ...policies },
  })
}

exports.patchAll = (req, res) => {
  const newPolicies = req.body
  infos.policies = newPolicies
  fs.writeFile(path.join(__dirname, dbPath), JSON.stringify(infos), (err) => {
    console.log(err)
    res.status(201).json({
      status: 'success',
      data: { ...policies },
    })
  })
}
