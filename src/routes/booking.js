const Movies = require('../config/movie_sequelize')

const booking_routes = [
    {
        path: "/book/{id}",
        method: "GET",
        config: {
            auth: {
                strategy: 'restricted',
            }
        },
        handler: async (request, h) => {
            try {
                let result = await Movies.findAll({
                    where: {
                        movie_id: request.params.id
                    }
                });
                result = result[0]
                console.log();
                if (!result ||
                    !result.available ||
                    (result.seats <= 0)
                    ){
                        return h("Movie not available for booking right now. Please try later");
                }

                result.seats -= 1
                result.save();
                // console.log(result);
                return h("Thanks for booking"); // returns an array of movie objects 
            } catch (error) {
                console.log(error.message);
            }       
        }
    },
]

module.exports = booking_routes;