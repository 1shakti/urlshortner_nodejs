const ShortUniqueId = require("short-unique-id");
const shortUrlModel = require("../models/url");

async function handleGenerateShortId(req, res) {
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({ status: "Failed", msg: "url required." });
  }
  const uid = new ShortUniqueId({ length: 10 });
  const shortId = uid.rnd();
  await shortUrlModel.create({
    shortId,
    redirectURL: body.url,
    visitHistory: [],
  });
  return res.render('home',{
    shortId
  })
  //return res.status(201).json({ status: "Success", id: result._id, shortId });
}

async function handleGetShortIdToRedirectURL(req, res) {
  const shortId = req.params.shortId;
  try {
    const entry = await shortUrlModel.findOneAndUpdate(
      { shortId },
      {
        $push: { visitHistory: { timestamp: Date.now() } },
      }
    );
    return res.redirect(entry.redirectURL);
  } catch (e) {
    return res
      .status(404)
      .json({ status: "Failed", msg: "Shortid Not Found", shortId });
  }
}

async function handleGetAnalyticsOfShortId(req, res) {
  const shortId = req.params.shortId;
  try {
    const result = await shortUrlModel.findOne({ shortId });
    return res
      .status(200)
      .json({
        status: "Success",
        totalClick: result.visitHistory.length,
        analytics: result.visitHistory,
      });
  } catch (e) {
    return res
      .status(404)
      .json({ status: "Failed", msg: "User Not Found", shortId });
  }
}

module.exports = {
  handleGenerateShortId,
  handleGetShortIdToRedirectURL,
  handleGetAnalyticsOfShortId,
};
