const { authenticate } = require('@google-cloud/local-auth');
const { SpacesServiceClient } = require('@google-apps/meet').v2;
const { google } = require('googleapis');
const path = require('path');

const CREDENTIALS_PATH = path.join(__dirname, '../config/credentials.json');
const SCOPES = [
  'https://www.googleapis.com/auth/meetings.space.created',
  'https://www.googleapis.com/auth/userinfo.email'
];

// Authenticate User
async function authenticateUser(req, res) {
  try {
    const client = await authenticate({ scopes: SCOPES, keyfilePath: CREDENTIALS_PATH });
    const oauth2 = google.oauth2({ auth: client, version: 'v2' });
    const { data } = await oauth2.userinfo.get();

    // Store in session
    req.session.token = client.credentials.access_token;
    req.session.email = data.email;
    if (client.credentials.refresh_token) {
      req.session.refresh_token = client.credentials.refresh_token;
    }

    res.json({ message: 'Authentication successful', email: data.email });
  } catch (err) {
    console.error('Authentication error:', err);
    res.status(500).json({ error: 'Authentication failed' });
  }
}

// Middleware to verify session
async function verifySessionToken(req, res, next) {
  if (!req.session.token) {
    return res.status(401).json({ error: 'Unauthorized: No session token' });
  }

  const authClient = new google.auth.OAuth2();
  authClient.setCredentials({
    access_token: req.session.token,
    refresh_token: req.session.refresh_token,
  });

  try {
    if (req.session.refresh_token) {
      const { token } = await authClient.getAccessToken();
      req.session.token = token;
    }
  } catch (err) {
    console.error('Token refresh error:', err);
    return res.status(401).json({ error: 'Unauthorized: Token expired' });
  }

  next();
}

// Create Google Meet Space
async function createMeetSpace(req, res) {
  try {
    const authClient = new google.auth.OAuth2();
    authClient.setCredentials({
      access_token: req.session.token,
      refresh_token: req.session.refresh_token,
    });

    if (req.session.refresh_token) {
      const { token } = await authClient.getAccessToken();
      req.session.token = token;
    }

    const meetClient = new SpacesServiceClient({ authClient });
    const response = await meetClient.createSpace({});
    
    res.json({ meetingUrl: response[0].meetingUri, email: req.session.email });
  } catch (err) {
    console.error('Error creating Meet space:', err);
    res.status(500).json({ error: 'Failed to create meeting' });
  }
}

module.exports = { authenticateUser, verifySessionToken, createMeetSpace };



// Previous Working Code
//==================================================
// const fs = require('fs').promises;
// const path = require('path');
// const { authenticate } = require('@google-cloud/local-auth');
// const { SpacesServiceClient } = require('@google-apps/meet').v2;
// const { auth } = require('google-auth-library');
// const { google } = require('googleapis');

// const SCOPES = [
//   'https://www.googleapis.com/auth/meetings.space.created',
//   'https://www.googleapis.com/auth/userinfo.email'
// ];

// const TOKENS_DIR = path.join(__dirname, '../config/tokens');
// const CREDENTIALS_PATH = path.join(__dirname, '../config/credentials.json');

// // Load saved credentials by email
// async function loadSavedCredentials(email) {
//   try {
//     const tokenPath = path.join(TOKENS_DIR, `${email}.json`);
//     const content = await fs.readFile(tokenPath);
//     const credentials = JSON.parse(content);
//     return auth.fromJSON(credentials);
//   } catch (err) {
//     console.log(`No saved credentials found for ${email}.`);
//     return null;
//   }
// }

// // Save credentials using email as the filename
// async function saveCredentials(client, email) {
//   const content = await fs.readFile(CREDENTIALS_PATH);
//   const keys = JSON.parse(content);
//   const key = keys.installed || keys.web;
//   const payload = JSON.stringify({
//     type: 'authorized_user',
//     client_id: key.client_id,
//     client_secret: key.client_secret,
//     refresh_token: client.credentials.refresh_token,
//   });

//   await fs.mkdir(TOKENS_DIR, { recursive: true }); // Ensure folder exists
//   await fs.writeFile(path.join(TOKENS_DIR, `${email}.json`), payload);
// }

// // Authenticate and authorize the user
// async function authorize() {
//   const client = await authenticate({
//     scopes: SCOPES,
//     keyfilePath: CREDENTIALS_PATH,
//     redirectUri: 'http://localhost:5000/flowName=GeneralOAuthFlow',
//   });

//   const email = await getUserEmail(client);

//   let savedClient = await loadSavedCredentials(email);
//   if (!savedClient) {
//     await saveCredentials(client, email);
//     savedClient = client;
//   }

//   return { client: savedClient, email };
// }

// // Get authenticated user's email
// async function getUserEmail(authClient) {
//   const oauth2 = google.oauth2({
//     auth: authClient,
//     version: 'v2',
//   });

//   const { data } = await oauth2.userinfo.get();
//   return data.email;
// }

// // Create a new Google Meet space
// async function createSpace(authClient) {
//   const meetClient = new SpacesServiceClient({
//     authClient: authClient,
//   });

//   const request = {}; // Construct the request for creating the space
//   const response = await meetClient.createSpace(request);
//   return response[0].meetingUri;
// }

// // Controller function for creating a meeting space
// async function createMeetSpace(req, res) {
//   try {
//     const { client, email } = await authorize();
//     console.log(`User verified: 😊 ${email}`);

//     const meetUrl = await createSpace(client);
//     res.json({ meetingUrl: meetUrl, email });
//   } catch (err) {
//     console.error('Error creating space:', err);
//     res.status(500).send('Error creating space');
//   }
// }

// module.exports = {
//   createMeetSpace,
// };
