const Hapi = require('hapi');
const hapiAuthCookie = require('hapi-auth-cookie');

//const Movies = require('./config/db2_sequelize');
const routes = require('./routes/routes');
// console.log('\n\nserver.js', routes,'\n\n');

const server = new Hapi.Server();
server.connection({
    host: "localhost",
    port: 1800,
    labels: ['movieApi'],
})

const init = async () => {
    await server.register(hapiAuthCookie);

    server.auth.strategy('restricted', 'cookie', {
        password: 'randomPasswordSomehowReaching32Chars',
        cookie: 'session',
        isSecure: false,
    });

    server.route(routes);

    await server.start();
    console.log(`Server started at : ${server.info.uri}`);
}

process.on("unhandledRejection", (err) => {
    console.log(err.message);
    process.exit(1);
});

init();