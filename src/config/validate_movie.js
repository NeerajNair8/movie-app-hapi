const Joi = require('joi');

const movieSchema = Joi.object({
    movie_name: Joi.string().required(),
    details: Joi.string(),
    seats: Joi.number().required(),
    available: Joi.boolean().required(),
});
const movie_idSchema = Joi.object({
    movie_id : Joi.number()
});



module.exports = {
    movieSchema,
    movie_idSchema,
}