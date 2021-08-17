const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const router = require("./api/routes");
const fileUpload = require("express-fileupload");

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());
app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.use((req, _, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use(express.static("./public"));
app.post("/upload/image", (req, res) => {
  if (req.files) {
    const file = req.files.image;
    const fileName = file.name;
    file.mv("./public/imgs/" + fileName, (err) => {
      if (err) {
        res.status(404).json({
          status: "error",
          data: err,
        });
      } else {
        res.status(200).json({
          status: "success",
          data: "Imagen Subida",
        });
      }
    });
  } else {
    res.status(404).json({
      status: "error",
      data: "Necesitas subir un archivo",
    });
  }
});
app.use("/", router);

// *** Start Server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App en puerto:_${port}...`);
});
