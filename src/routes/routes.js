//  get the routes from different files
const movie_routes = require('./movies');
const login_routes = require('./login');
const booking_routes = require('./booking');

// concatenate to get the final route array
const routes = [].concat(
    movie_routes,
    login_routes,
    booking_routes,
);

module.exports = routes;