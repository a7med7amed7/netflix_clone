const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const moviesRoutes = require("./routes/movie");
const listssRoutes = require("./routes/lists");
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected successfully!");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(
  cors({
    origin: "*",
    // methods:["GET","POST"] Limit cliend access
    credentials: true, // Allow tokens
  })
);

app.use(express.json());
app.use("/auth/api", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/movies", moviesRoutes);
app.use("/api/lists", listssRoutes);

app.listen(8800, () => {
  console.log("Running on port 8800");
});
