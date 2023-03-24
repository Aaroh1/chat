require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const chatRouter = require("./routes/chat");
const cors = require("cors");
const supabase = require("./config/supabase.config")

/* App Setup */
const app = express();
const PORT = 8001;
app.set("port", process.env.PORT || 8001);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(bodyParser.json({ limit: "100mb" }));

/* Middlewares */
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.send("Hello World");
});
// app.use("/api/chat", chatRouter);
app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));

module.exports = app;
