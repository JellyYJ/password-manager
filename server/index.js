const express = require("express");
const cors = require("cors");
const passwordRoutes = require("./routes/passwordRoutes");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/api", passwordRoutes);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
