require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/userRouter");
const noteRouter = require("./routes/noteRouter");
const path = require("path"); //Deployment step.

const app = express();
app.use(cors());
app.use(express.json());

//Routes:
app.use("/users", userRouter);
app.use("/api/notes", noteRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("i-notes/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "i-notes", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
// Connect to MongoDB
const URI = process.env.MONGODB_URL;
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
