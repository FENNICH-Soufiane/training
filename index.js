const express = require("express");
const cors = require("cors");
const connectDb = require("./config/db")
const productRoute = require("./routes/productRoute")
const categoryRoute = require("./routes/categoryRoute")


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", productRoute);
app.use("/api/v1", categoryRoute);
connectDb();

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log("server runing on port", PORT));
