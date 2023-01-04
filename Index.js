const dotenv = require("dotenv").config();
const express = require("express");
const path = require("path");
const port = process.env.PORT

const app = express();

//Enable body parser
app.use(express.json())
app.use(express.urlencoded({ extended : false }))

// Set static folder
app.use(express.static(path.join(__dirname, "Frontend")))

app.use("/openai", require("./Backend/Routes/openaiRoutes"))

app.listen(port, () => console.log(`listening on port ${port}`))