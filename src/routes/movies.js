// const {
//     Op,
// } = require("sequelize");
const sequelize = require("../config/db_sequelize");
const Movies = require("../config/movie_sequelize"); // 
const {
    movieSchema,
    movie_idSchema
} = require("../config/validate_movie");

const movie_routes = [
    // get all movies
    {
        path: "/movies",
        method: "GET",
        handler: async (request, h) => {
            try {
                const result = await Movies.findAll();
                return h(result); // returns an array of movie objects 
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

                const lookupValue = request.params.name.toLowerCase();
                // const result = await Movies.findAll({
                //     where: sequelize.where(
                //         // do lower(column) where value is searched
                //         sequelize.fn('Lower', sequelize.col('movie_name')),
                //         lookupValue // value to compare
                //     )
                // });

                // above method checks for an exact match
                // below code searches the lookup value as a possible substring
                
                const result = await Movies.findAll({
                    where: {
                        movie_name: sequelize.where(sequelize.fn('LOWER', sequelize.col('movie_name')),'LIKE',`%${lookupValue}%`)
                    }
                })
                 return h(result); // returns an array of objects (all entries where movie name matches)
            } catch (error) {
                if (error.isJoi === true) {
                    console.log(" joi error ");
                    return h(error.message)
                }
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

                const newMovie = {
                    movie_name: name,
                    details,
                    seats,
                    available
                };

                await movieSchema.validateAsync(newMovie);
                // console.log(validation);

                // console.log("new movie : ", newMovie);
                const movie = Movies.build(newMovie);
                await movie.save();
                // console.log(movie.toJSON());
                return h("Movie added to database"); // if movie is added, otherwise error is thrown
            } catch (error) {
                if (error.isJoi) {
                    console.log(" joi error ");
                    return h.response(error.message+'. Please try again with correct inputs').code(422);
                }
                console.error(err.message);
            }
        }
    },

    // delete a movie
    {
        path: '/movies/{id}',
        method: 'DELETE',
        handler: async (request, h) => {
            try {
                const {
                    id
                } = request.params;
                // console.log(id);
                // validate the params
                await movie_idSchema.validateAsync({movie_id:id})
                // remove the movie from the database
                const result = await Movies.destroy({
                    where: {
                        movie_id: id,
                    }
                });
                if (result) return h("Movie deleted successfully");
                else return h("Movie not found in the database");
            } catch (error) {
                if (error.isJoi) {
                    console.log(" joi error "+error.message);
                    return h.response(error.message+'. Please try again with correct inputs').code(422);
                }
                console.error(err.message);
            }

        }
    },

    // book a movie

];

module.exports = movie_routes;

