const parsePayload = (req, res, next) => {
  if (req.body.payload) {
    try {
      req.body = JSON.parse(req.body.payload);
      next();
    } catch (err) {
      return res.status(400).json({ 
        error: "Invalid JSON payload",
        details: err.message 
      });
    }
  } else {
    next();
  }
};

module.exports = parsePayload;