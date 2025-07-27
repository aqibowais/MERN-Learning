const URL = require("../models/url");
const shortid = require("shortid");

async function handleGenerateShortUrl(req, res) {
  const body = req.body;
  if (!body.url) res.status(400).json({ error: "url is required" });

  const shortId = shortid();
  await URL.create({
    shortId: shortId,
    redirectUrl: body.url,
    visitHistory: [],
    createdBy:req.user._id
  });
  return res.render("home",{
    shortId:shortId
  })
//   return res.json({ id: shortId });
}

async function handleGetUserAllUrls(req,res){
    const allUrls = await URL.find({createdBy:req.user._id})
    // Sort URLs by the most recent visit timestamp
    allUrls.sort((a, b) => b.visitHistory.length - a.visitHistory.length);
    res.render("home",{
        allUrls:allUrls
    })
}


async function handleRedirectUrl(req, res) {
  const shortId = req.params.id;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectUrl);
}

async function handleUrlAnalytics(req, res) {
  const shortId = req.params.id;
  console.log(shortId)
  if (!shortId) res.status(400).json({ error: "id is required" });
  const result = await URL.findOne({shortId})

  res.json({ totalClicks: result.visitHistory.length, visitedHistory: result.visitHistory });
}

module.exports = {
  handleGenerateShortUrl,
  handleGetUserAllUrls,
  handleRedirectUrl,
  handleUrlAnalytics,
};
