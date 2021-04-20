// /book routes

const Movies = require('../config/movie_sequelize');
const Bookings = require('../config/booking_sequelize');

const booking_routes = [
    {
        path: "/book",
        method: "POST",
        config: {
            auth: {
                strategy: 'restricted',
            }
        },
        handler: async (request, h) => {
            try {
                // get the movie and number of seats
                const { movie_id, seats} = request.payload;
                // find the movie from database
                let result = await Movies.findAll({
                    where: {
                        movie_id: movie_id
                    }
                });
                result = result[0]
                // console.log();
                // if there are not enough seats or if movie is not available to book
                if (!result ||
                    !result.available ||
                    (result.seats <= +seats)
                    ){
                        return h("Movie not available for booking right now. Please try later");
                }

                // update the number of seats temporily
                result.seats -= +seats

                const book = { 
                    user_email: request.state.session.email, 
                };
                const newBooking = Bookings.build( book ); // build the new row
                await newBooking.save(); // save to get the booking token
                // console.log(Bookings.findAll())
                console.log(newBooking);
                
                // finally remove the seats from the database
                await result.save();
                return h(`Thanks for booking. Your booking id is ${newBooking.book_id}`); // returns an array of movie objects 
            } catch (error) {
                console.log(error.message);
                return h(`Booking could not be completed.`); // returns an array of movie objects 
            }       
        }
    },
]

module.exports = booking_routes;