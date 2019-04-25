module.exports = (req, res, next) => {
  const error = new Error('Not to Found');
  error.status = 404;

  next(error);
};
