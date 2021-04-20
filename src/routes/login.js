// /login and /logout routes

const Users = require("../config/user_sequelize");
console.log(Users);

const login_routes = [{
    path: '/login',
    method: 'POST',
    handler: async (request, h) => {
        // console.log(" before cookie auth set: ", request.state);
        const {
            email,
            password
        } = request.payload;
        // console.log('\n\n',email, password)
        // get the user details from database
        let user = await Users.findAll({
            where: {
                email: email,
            }
        });
        user = user[0]; // as query result is an array

        if (user.password === password) {
            request.cookieAuth.set({
                username: user.username,
                email: user.email,
            });
            var cookie = request.state.session;

            if (!cookie) {
                cookie = {
                username: user.username,
                email: email,
                }
            }
            return h(`Hello ${user.username}`).state('session', cookie);
        } else {
            return h('Used and/or password incorrect');
        }

    }
}]

module.exports = login_routes;