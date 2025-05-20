const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// ✅ Add this middleware to parse x-www-form-urlencoded bodies
app.use(bodyParser.urlencoded({ extended: false }));

// Import your handler
const handleUssd = require("./ussdHandler");

// Set the USSD endpoint
app.post("/ussd", handleUssd);

// Start the server
app.listen(3000, () => {
  console.log("USSD app running on port 3000");
});
