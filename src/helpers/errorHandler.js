/*
  To avoid the use of try{} catch(e) {} in async/await,
  we are use a HOF that receive the original function (that with async)
  and wrap them in another function that calls the external function adding the catch chain
*/

exports.catchErrors = fn =>
  function (req, res, next) {
    return fn(req, res, next).catch(next);
  };
