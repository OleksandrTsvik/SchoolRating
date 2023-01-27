import * as Joi from '@hapi/joi';

export const validationSchemaConfig = Joi.object({
	POSTGRES_HOST: Joi.string().required(),
	POSTGRES_PORT: Joi.string().required(),
	POSTGRES_USERNAME: Joi.string().required(),
	POSTGRES_PASSWORD: Joi.string().required(),
	POSTGRES_DATABASE: Joi.string().required(),

	JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
	JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
	JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
	JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required()
});