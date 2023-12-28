const basicAuth = require('express-basic-auth');


function myAuthorizer(username, password) {
    const userMatches = basicAuth.safeCompare(username, process.env.USERNAME);
    const passwordMatches = basicAuth.safeCompare(password, process.env.PASSWORD);

    return userMatches & passwordMatches;
}


function getUnauthorizedResponse(req) {
    return req.auth
        ? ('Credentials ' + req.auth.user + ':' + req.auth.password + ' rejected')
        : 'No credentials provided';
}

module.exports = { myAuthorizer, getUnauthorizedResponse };
