// controllers/urlController.js
const Url = require('../models/urlModel');
const shortid = require('shortid');

const shortenUrl = async (req, res) => {
  const { originalUrl } = req.body;
  const shortId = shortid.generate();

  const newUrl = await Url.create({ originalUrl, shortId });
  res.json({ shortUrl: `${process.env.BASE_URL}/${shortId}` });
};

const redirectUrl = async (req, res) => {
  const { shortId } = req.params;
  const url = await Url.findOne({ shortId });

  if (!url) return res.status(404).send('URL not found');
  res.redirect(url.originalUrl);
};

module.exports = { shortenUrl, redirectUrl };
