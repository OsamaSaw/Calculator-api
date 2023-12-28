const express = require('express');
const morgan = require('morgan');
const calculatorRoutes = require('./routes/calculatorRoutes');
const logger = require('./middleware/logger');
const rateLimit = require('express-rate-limit');
const basicAuth = require('express-basic-auth');
const { myAuthorizer, getUnauthorizedResponse } = require('./middleware/authChecker');

require('dotenv').config();

const authMiddleware = basicAuth({
    users: { 'admin': 'password' }, // Replace with real credentials
    challenge: true, // It will cause browsers to show a login dialog
    authorizer: myAuthorizer,
    unauthorizedResponse: getUnauthorizedResponse
});

const apiLimiter = rateLimit({
    windowMs: 2 * 60 * 1000, // 2 minutes
    max: 10, // limit each IP to 100 requests per windowMs => 2
    message: 'Too many requests from this IP, please try again after 2 minutes'
});


const app = express();

app.use(express.json());
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) }}));
app.use('/api', authMiddleware); // Authentication middleware should be before the routes
app.use('/api', apiLimiter); // Rate limiter
app.use('/api', calculatorRoutes); // Route handling

// Handle all GET requests that weren't matched by any other route
app.get('*', (req, res) => {
    res.status(404).send('GET request not supported at this endpoint. Please use POST.');
});


app.use((err, req, res, next) => {
    logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
