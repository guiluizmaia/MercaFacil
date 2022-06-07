import { celebrate, Joi, Segments } from 'celebrate';

export const LoginValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required(),
    pass: Joi.string().required(),
  }),
});
