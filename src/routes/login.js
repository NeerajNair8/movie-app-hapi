const Users = require("../config/user_sequelize");
console.log(Users);

const login_routes = [
    {
        path: '/login',
        method: 'POST',
        handler: async (request, h) => {
            const {email, password} = request.payload;
            // console.log('\n\n',email, password)
            let user = await Users.findAll({
                where: {
                    email: email
                }
            });
            user = user[0]; // as query result is an array
            
            if (user.password === password){
                request.cookieAuth.set({ username:user.username });
                return h(`Hello ${user.username}`);
            }
            else{
                return h('Used and/or password incorrect');
            }

        }
    }
]

module.exports = login_routes;