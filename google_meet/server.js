const express = require('express');
const cors = require('cors');
const session = require('express-session');
const meetRoute = require('./routes/meetRoute');

const app = express();

// Allowed origins (Frontend URLs)
const allowedOrigins = [
  'https://techstack-frontend-rose.vercel.app',
  'http://localhost:3000' // Local development
];

// CORS Configuration
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies & authentication
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Apply Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Session Configuration (For authentication storage)
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production', 
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax'
  }
}));


// Default Route
app.get('/', (req, res) => {
  res.send('<h1>Welcome to TechStack Google Meet Integration</h1>');
});

// Use Google Meet Routes
app.use('/api/meet', meetRoute);

// Start Server
const port = process.env.PORT || 4050;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


//==============================================================================================
// const express = require('express');
// const cors = require('cors');
// const session = require('express-session');
// const meetRoute = require('./routes/meetRoute');

// const app = express();
// const port = process.env.PORT || 4050;

// // Allowed origins
// const allowedOrigins = [
//   'https://techstack-frontend-rose.vercel.app',
//   'https://techstack-googlemeet.vercel.app',
//   'http://localhost:3000',  // Add your local dev URL
// ];

// // CORS configuration
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true,  // Allow cookies to be sent
// };

// // Apply CORS middleware globally
// app.use(cors(corsOptions));

// // Manually set CORS headers for additional control
// app.use((req, res, next) => {
//   const origin = req.headers.origin; // Get the origin from the request or fallback to '*'
  
//   if (allowedOrigins.includes(origin)) {
//     res.header('Access-Control-Allow-Origin', origin); // Set the correct allowed origin
//   }
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allow specific methods
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specific headers
//   res.header('Access-Control-Allow-Credentials', 'true'); // Allow credentials (cookies)

//   next();
// });

// // Session middleware
// app.use(session({
//   secret: 'your_secret_key',
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//     secure: process.env.NODE_ENV === 'production', // Set to true in production (HTTPS only)
//     httpOnly: true, // Prevent access to cookies from JavaScript
//     sameSite: 'lax', // CSRF protection (use 'strict' in highly sensitive apps)
//   },
// }));

// // Body parser middleware
// app.use(express.json());

// // Welcome route
// app.get('/', (req, res) => {
//   res.send(`<h1 style='text-align:center'>Welcome to the TechStack Google Meet Integration</h1>`);
// });

// // Use Routes
// app.use('/api/meet', meetRoute);

// // Start server
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });
