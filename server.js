const http = require('http');
const https = require('https');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use((req, res) => {
  res.send('This is the Chad API server!');
});
// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  // app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}...`);
});
// Listen both http & https ports
// const httpServer = http.createServer(app);
// const httpsServer = https.createServer(
//   {
//     key: fs.readFileSync('./certs/private-key.pem'),
//     cert: fs.readFileSync('./certs/cert.pem')
//   },
//   app
// );

// httpServer.listen(80, () => {
//   console.log('HTTP Server running on port 80');
// });

// httpsServer.listen(443, () => {
//   console.log('HTTPS Server running on port 443');
// });
