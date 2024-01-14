const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.get('/nft', async (req, res, next) => {
  console.log('Fetching NFTs...');
  const response = await axios.get('https://api-mainnet.magiceden.dev/v2/collections');
  console.log("nft listing fetched:", response.data[0]);
  res.json({nft: response.data});
})

module.exports = router;
