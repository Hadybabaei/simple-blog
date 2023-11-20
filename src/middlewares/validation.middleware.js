
function validationMiddleware(schema) {
    return async (
      req,
      res,
      next
    )=> {
      const validationOptions = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true,
      };
  
      try {
        // Wait for the validation to complete using the await keyword
        const value = await schema.validateAsync(req.body, validationOptions);
        req.body = value;
        next();
      } catch (e) {
        const errors= [];
        e.details.forEach((error) => {
          errors.push(error.message);
        });
        res.status(400).json({ error: 'Validation failed', details: errors });
  
      }
    };
  }

module.exports =  validationMiddleware;