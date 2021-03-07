const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const path = require("path");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

try {
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
} catch (error) {
  console.error(error);
  process.exit(1);
}

mongoose.connection.once("open", () =>
  console.log("mongodb connected successfully")
);

app.use("/exercises", require("./routes/exercises"));
app.use("/users", require("./routes/users"));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.use("/", (req, res) => {
  res.send("app is running");
});

app.listen(port, () => console.log(`Server is running at port: ${port}`));
