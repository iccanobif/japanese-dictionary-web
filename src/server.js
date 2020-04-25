const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();

app.use(express.static("build"));

app.get('*', (req, res) => {
  res.sendFile(path.resolve("build", 'index.html'));
});

console.log("Listening to port " + port + "...")
app.listen(port);