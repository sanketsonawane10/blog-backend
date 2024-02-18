

const Joi = require('joi');

const blogSchema = Joi.object().keys({
    title: Joi.string().required().messages({ 'string.pattern.base': 'Title should Be String' }),
    content: Joi.string().required().messages({ 'string.pattern.base': 'Title should Be String' }),
});

module.exports = {
    blogSchema
}