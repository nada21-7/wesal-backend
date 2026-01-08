module.exports = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Something went wrong!';
  
    console.error(`Error [${statusCode}] on ${req.method} ${req.url}:`, err.stack);
  
    if (process.env.NODE_ENV === 'production' && statusCode === 500) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  
    const response = {
      error: message,
      ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
    };
  
    res.status(statusCode).json(response);
  
  };
