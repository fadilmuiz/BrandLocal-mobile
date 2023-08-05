require('dotenv').config()
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 4002
const router = require("./routers/routers");
// const errorHandling = require('./middlewares/errorhandling')

app.use(cors());
app.use(express.urlencoded({ extended: false })); 
app.use(express.json());
app.use(router);
// app.use(errorHandling)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});