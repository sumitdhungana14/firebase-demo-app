var {google} = require("googleapis");
const fetch = require("node-fetch");

// Load the service account key JSON file.
var serviceAccount = require("./service-account-key");

// Define the required scopes.
var scopes = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/firebase.database"
];

// Authenticate a JWT client with the service account.
var jwtClient = new google.auth.JWT(
  serviceAccount.client_email,
  null,
  serviceAccount.private_key,
  scopes
);

// Use the JWT client to generate an access token.
jwtClient.authorize(function(error, tokens) {
  if (error) {
    console.log("Error making request to generate access token:", error);
  } else if (tokens.access_token === null) {
    console.log("Provided service account does not have permission to generate access tokens");
  } else {
    fetch(`https://my-awesome-project-a149c.firebaseio.com/users.json?access_token=${tokens.access_token}`)
        .then(response => response.json())
        .then(data => console.log(data));
  }
});
