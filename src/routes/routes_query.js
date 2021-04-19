const pool = require("../config/db_pool");

const routes = [
    // get all movies
    {
        path: "/movies",
        method: "GET",
        handler: async (request, h) => {
            try {
                const result = await pool.query("SELECT * FROM movies");
                return h(result); // returns an array of objects 
            } catch (error) {
                console.log(error.message);
            }
        }
    },

    // get single movie details
    {
        path: "/movies/{name}",
        method: "GET",
        handler: async (request, h) => {
            try {
                // convert the values to lower case for checking without cases sensitivity
                const result = await pool.query(
                    "SELECT * FROM movies where LOWER(movie_name) = LOWER($1)",
                    request.params.name
                );
                return h(result); // returns an array of objects 
            } catch (error) {
                console.log(error.message);
            }
        }
    },

    // add a movie
    {
        path: "/movies",
        method: "POST",
        handler: async (request, h) => {
            try {
                //console.log(request);
                const {
                    name,
                    details,
                    seats,
                    available
                } = request.payload;

                console.log("new movie : ", newMovie);
                const result = pool.query(
                    "INSERT INTO movies (movie_name,details,seats,available) VALUES($1,$2,$3,$4)",
                    [
                        name,
                        details,
                        seats,
                        available
                    ]
                );
                console.log(movie.toJSON());
                return h("Movie added to database");
            } catch (err) {
                console.error(err.message);
            }
        }
    },

    // delete a movie
    {
        path: '/movies/{id}',
        method: 'DELETE',
        handler: async (request, h) => {
            const {
                id
            } = request.params;
            // console.log(id);
            const result = await pool.query(
                "DELETE FROM movies WHERE movie_id = $1",
                [id]
            );
            return h(result);
        }
    },

    // book a movie

];

module.exports = routes;