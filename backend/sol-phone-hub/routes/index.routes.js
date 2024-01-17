const express = require("express");
const router = express.Router();
const axios = require("axios");
const solanaWeb3 = require("@solana/web3.js");


router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// NFT Routes

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

// Token Routes

router.get("/tokens/:tokenSymbol", async (req, res) => { 
  console.log("fetching token...");
  const { tokenSymbol } = req.params;
  const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${tokenSymbol}?x_cg_demo_api_key=${process.env.COINGECKO_API_KEY}`);
  res.json({tokenData: response.data});
} )


// SagaDAO Routes

router.get('/sagadao', async (req,res) =>{
  console.log("fetching sagadao info...");
  const rpc = `https://solana-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`; // RPC URL for connecting with a Solana node
  const sagaDAOAddy = new solanaWeb3.PublicKey("6jYqTEtDgkr1v4DtU4QDUmg1cAf4o1GSsQDGt9X8EfPG");

  const connection = new solanaWeb3.Connection(rpc, "confirmed"); // confirming the connection

  let accntBalanceResponse = await connection.getBalance(sagaDAOAddy); // getting the accnt balance
  res.json({balance: accntBalanceResponse})
})

router.get('/sagadao/tx', async (req, res) => {
  /* console.log("fetching sagadao tx data...");
  const rpc = `https://solana-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`; // RPC URL for connecting with a Solana node
  const sagaDAOAddy = new solanaWeb3.PublicKey("6jYqTEtDgkr1v4DtU4QDUmg1cAf4o1GSsQDGt9X8EfPG");
  const connection = new solanaWeb3.Connection(rpc, "confirmed"); // confirming the connection
  let accntTxs = await connection.getSignaturesForAddress(sagaDAOAddy); // getting the accnt balance
  console.log('accnt balance:', accntTxs[0]);
  let txInfo = await connection.getTransaction(accntTxs[0].signature); */
  /* let txInfo = await connection.getTransaction() */
  /* console.log("tx info:", txInfo);
  res.json({txSigns: accntTxs}); */
})


module.exports = router;
