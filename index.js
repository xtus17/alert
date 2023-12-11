const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const sendNotifications = require("./send-notifications.js");
const app = express();
const PORT = process.env.PORT || 3000;

/*Subdirectorio
app.use("/alerteasysoscitys", express.static(path.join(__dirname, "public")));
*/
app.use("/", express.static(path.join(__dirname, "public")));

/*Subdirectorio
app.use(
  "/alerteasysoscitys/assets",
  express.static(path.join(__dirname, "assets"))
);
*/
app.use("/assets", express.static(path.join(__dirname, "assets")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: true }));

/*Subdirectorio
app.get("/alerteasysoscitys", (req, res) => {
  res.render("index"); 
});
*/

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/modal", (req, res) => {
  res.render("modal");
});

/*Sub directorio
app.post("/alerteasysoscitys/send-notifications", async (req, res) => {
*/

app.post("/send-notifications", async (req, res) => {
  const customBody = req.body.customBody || "EasySOS App";

  try {
    await sendNotifications(customBody);
    // res.send("Notificaciones fueron enviadas con éxito");

    res.render("modal", {
      successMessage: "Las notificaciones fueron enviadas con éxito",
    });
  } catch (error) {
    res.render("modal", {
      errorMessage: "Las notificaciones no fueron enviadas con éxito",
    });
    res.status(500).send("Error al enviar notificaciones");
  }
});

app.listen(PORT, () => {
  console.log(`Server start in http://localhost:${PORT}`);
});
