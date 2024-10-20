import createHttpErrors from 'http-errors';

export const validateBody = (schema) => {
  return (req, res, next) => {
    const result = schema.validate(req.body, { abortEarly: false });
    if (result.error) {
      console.log(result.error.details);

      return next(
        createHttpErrors(
          400,
          result.error.details.map((err) => err.message).join('; '),
        ),
      );
    }
    next();
  };
};
