// const express = require('express')
// const serveStatic = require('serve-static')
// const path = require('path')

// const app = express()

// app.use('/', serveStatic(path.join(__dirname, '/dist')))

// const port = process.env.PORT || 8080
// app.listen(port)


const express = require("express");
const serveStatic = require('serve-static')
const path = require('path')

const app = express();
const port = process.env.PORT || 8080

app.use('/', serveStatic(path.join(__dirname, '/dist')))

// Add Access Control Allow Origin headers
app.use((res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://benius.herokuapp.com");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.listen(port, () => console.log(`Listening on port ${port}`));
