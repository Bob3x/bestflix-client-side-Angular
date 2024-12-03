const express = require("express");
const path = require("path");
const app = express();

// Serve static files from the dist directory
app.use(express.static(__dirname + "/dist/my-flix-angular-client"));

// Send all requests to index.html
app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname + "/dist/my-flix-angular-client/index.html"));
});

// Default Heroku port
app.listen(process.env.PORT || 8080);
