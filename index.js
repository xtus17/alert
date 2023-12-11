const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const sendNotifications = require("./send-notifications.js");
const app = express();
const PORT = process.env.PORT || 3000;

app.use("/alerteasysoscity", express.static(path.join(__dirname, "public")));
app.use(
  "/alerteasysoscity/assets",
  express.static(path.join(__dirname, "assets"))
);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/alerteasysoscity", (req, res) => {
  res.render("index"); // Ajusta según tus necesidades
});

app.get("/modal", (req, res) => {
  res.render("modal");
});

app.post("/alerteasysoscity/send-notifications", async (req, res) => {
  const customBody = req.body.customBody || "EasySOS App";

  try {
    await sendNotifications(customBody);
    // res.send("Notificaciones fueron enviadas con éxito");

    res.render("modal", {
      successMessage: "Las notificaciones fueron enviadas con éxito",
    });
  } catch (error) {
    // res.send("Notificaciones no fueron enviadas con éxito", error);

    res.render("modal", {
      errorMessage: "Las notificaciones no fueron enviadas con éxito",
    });
    res.status(500).send("Error al enviar notificaciones");
  }
});

app.listen(PORT, () => {
  console.log(`Server start in http://localhost:${PORT}/alerteasysoscity`);
});
