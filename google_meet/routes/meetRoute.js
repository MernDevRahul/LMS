const express = require('express');
const { authenticateUser, verifySessionToken, createMeetSpace } = require('../controllers/meetController');

const meetRoute = express.Router();

meetRoute.post('/authenticate', authenticateUser); // First authenticate user
meetRoute.post('/create-space', verifySessionToken, createMeetSpace); // Requires authentication

module.exports = meetRoute;

// Previous Working Code
//=============================================
// const express = require('express');
// const { createMeetSpace } = require('../controllers/meetController');

// const meetRoute = express.Router();

// meetRoute.post('/create-space', createMeetSpace);

// module.exports = meetRoute;

