const { Error: MongooseError } = require("mongoose");
/*
  To avoid the use of try{} catch(e) {} in async/await,
  we are use a HOF that receive the original function (that with async)
  and wrap them in another function that calls the external function adding the catch chain
*/

const catchErrors = fn =>
  function(req, res, next) {
    return fn(req, res, next).catch(next);
  };

const mongooseErrorHandler = (err, req, res, next) => {
  if (err instanceof MongooseError) {
    const errorMessages = [];
    if (err.errors) {
      const errorKeys = Object.keys(err.errors);
      errorKeys.forEach(key => errorMessages.push(err.errors[key].message));
      res.status(422);
    } else {
      errorMessages.push("Internal Error");
      res.status(500);
    }
    res.json({ error: errorMessages });
    return next();
  }
  return next(err);
};

module.exports = { catchErrors, mongooseErrorHandler };
