const fs = require('fs')
const path = require('path')
const dbPath = `/../DB/data/info.json`
const infos = JSON.parse(fs.readFileSync(path.join(__dirname, dbPath)))
const socials = infos.socials

exports.getAll = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: socials.length,
    reqTime: req.requestTime,
    data: { ...socials },
  })
}

exports.patchAll = (req, res) => {
  const newSocials = req.body
  infos.socials = newSocials
  fs.writeFile(path.join(__dirname, dbPath), JSON.stringify(infos), (err) => {
    console.log(err)
    res.status(201).json({
      status: 'success',
      data: { ...newSocials },
    })
  })
}
