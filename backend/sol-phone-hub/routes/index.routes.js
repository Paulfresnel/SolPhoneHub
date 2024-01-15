const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.get('/nft', async (req, res, next) => {
  console.log('Fetching NFTs...');
  const response = await axios.get('https://api-mainnet.magiceden.dev/v2/collections?limit=500');
  res.json({nft: response.data});
})

router.get("/nft/:nftSymbol", async (req, res) => {
  const { nftSymbol } = req.params;
  const response = await axios.get(`https://api-mainnet.magiceden.dev/v2/collections/${nftSymbol}/stats`);
  res.json({nftData: response.data});
})

router.get("/tokens/:tokenSymbol", async (req, res) => { 
  console.log("fetching token...");
  const { tokenSymbol } = req.params;
  const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${tokenSymbol}?x_cg_demo_api_key=${process.env.COINGECKO_API_KEY}`);
  res.json({tokenData: response.data});
} )

module.exports = router;
