const errorHandler = (err, req, res, next) => {
    console.error('Error:', err.message);  //  ошибки в консоль
    res.status(err.status || 500).json({
      status: err.status || 500,
      message: err.message || 'Internal Server Error',
    });
  };
  
  export default errorHandler;
  