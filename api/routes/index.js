const express = require("express");
const router = express.Router();
const infoRouter = require("./infoRouter");
const passportRouter = require("./passportRoutes");

// *** Router
const apiV1Route = "";

router.use(`${apiV1Route}/pass`, passportRouter);
router.use(`${apiV1Route}/info`, infoRouter);
// router.route("/upload/:token").post((req, res, next, token) => {
//   console.log("token", token);
//   console.log("-");
//   console.log("-", req.image);
//   // upload(req, res, (err) => {
//   //   if (err) {
//   //     res.status(404).json({
//   //       status: "error",
//   //       data: err,
//   //     });
//   //   } else {
//   //     if (req.file == undefined) {
//   //       res.status(404).json({
//   //         status: "error",
//   //         data: "Necesitas subir un archivo",
//   //       });
//   //     } else {
//   //       res.status(200).json({
//   //         status: "success",
//   //         data: req.file,
//   //       });
//   //     }
//   //   }
//   // });
//   res.status(999).json({
//     status: "mystery",
//     data: req.file,
//   });
// });

router.use("/", (_, res) => {
  res.status(200).json({
    status: "init",
    data: "Inizaliting",
  });
});
// *** Catch All
router.use("*", (_, res) => {
  res.status(404).json({
    status: "error",
    data: "Endpoint doesn't exist",
  });
});

module.exports = router;
