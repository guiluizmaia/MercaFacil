import { celebrate, Joi, Segments } from 'celebrate';

export const CreateContactValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    contacts: Joi.array().items({
      name: Joi.string().required(),
      cellphone: Joi.string().required()
    }).required(),
  }),
});
