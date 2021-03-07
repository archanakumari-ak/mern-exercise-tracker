const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () =>
  console.log("mongodb connected successfully")
);

/* mongoose.connect(
  "mongodb+srv://archanak:archanak@cluster0.uxfxf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false, // added
  }
); */

app.use("/exercises", require("./routes/exercises"));
app.use("/users", require("./routes/users"));

app.use("/", (req, res) => {
  res.send("app is running");
});

app.listen(port, () => console.log(`Server is running at port: ${port}`));
