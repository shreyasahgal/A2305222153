// middleware/validateUrl.js
const validUrl = require('valid-url');

module.exports = (req, res, next) => {
  const { originalUrl } = req.body;
  if (!validUrl.isWebUri(originalUrl)) {
    return res.status(400).json({ error: 'Invalid URL' });
  }
  next();
};
