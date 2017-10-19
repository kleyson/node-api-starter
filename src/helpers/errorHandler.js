/*
  To avoid the use of try{} catch(e) {} in async/await,
  we are use a HOF that receive the original function (that with async)
  and wrap them in another function that calls the external function adding the catch chain
*/

const catchErrors = fn =>
  function (req, res, next) {
    return fn(req, res, next).catch(next);
  };

const mongooseErrorHandler = (err, req, res, next) => {
  if (!err.errors) return next(err);
  const errorKeys = Object.keys(err.errors);
  const errorMessages = [];
  errorKeys.forEach(key => errorMessages.push(err.errors[key].message));
  res.status(422);
  res.json({ error: errorMessages });
};

module.exports = { catchErrors, mongooseErrorHandler };
