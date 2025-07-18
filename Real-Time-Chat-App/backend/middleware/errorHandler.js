// /backend/middleware/errorHandler.js
exports.notFound = (req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
};

exports.errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Server error' });
};
