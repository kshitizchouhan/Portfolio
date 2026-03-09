import { google } from "googleapis";
import readline from "readline";

const CLIENT_ID = "PASTE_CLIENT_ID";
const CLIENT_SECRET = "PASTE_CLIENT_SECRET";
const REDIRECT_URI = "http://localhost";

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

const url = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: ["https://www.googleapis.com/auth/gmail.send"]
});

console.log("Open this URL in browser:");
console.log(url);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Paste the code here: ", async (code) => {

  const { tokens } = await oauth2Client.getToken(code);

  console.log("Refresh Token:");
  console.log(tokens.refresh_token);

  rl.close();

});