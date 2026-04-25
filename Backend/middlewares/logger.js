const logger = (req, res, next) => {
  const time = new Date().toLocaleString();

  console.log(
    `[${time}] ${req.method} ${req.url} - IP: ${req.ip}`
  );

  next(); // IMPORTANT
};

module.exports = logger;