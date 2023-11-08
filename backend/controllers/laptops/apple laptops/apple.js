const laptop = require("../../../schemas/laptops/laptop");
const Sequelize = require("sequelize");
const axios = require("axios");

// apple macbook details

async function fetchMacbookair(req, res) {
  try {
    const applelaptop = await laptop.findOne({
      where: {
        nameoflaptop: { [Sequelize.Op.iLike]: "%apple macbook air gold%" },
      },
    });
    if (!applelaptop) {
      return res.status(200).json({ message: "no laptop found" });
    } else {
      return res.status(200).json({ message: "apple found", data:applelaptop });
    }
  } catch (error) {
    return res.status(500).json({ error: `${error}` });
  }
}

//fetch price of macbook air gold

async function fetchApplemacbookgoldprice(req, res) {
  try {
    const applemacbookgold = await laptop.findOne({
      where: {
        nameoflaptop: { [Sequelize.Op.iLike]: "%apple macbook air gold%" },
      },
    });
    const price = applemacbookgold.Price;
    if (!applemacbookgold) {
      return res.status(200).json({ message: "no laptop found" });
    } else {
      return res.status(200).json({message:"Prices fetched",data:price});
    }
  } catch (error) {
    return res.status(500).json({ error: `${error}` });
  }
}

//payment for apple mac book gold
async function buyApplemacbookairgold(req, res) {
  try {
    

    // Make payment to instasend
    const response = await axios.post(
      "https://sandbox.intasend.com/api/v1/checkout/",
      {
        public_key: process.env.instasendpublic,
        amount: req.body.Totals,
      }
    );

    return res.status(200).json({message:"Url fetched",data:response.data.url});
  } catch (error) {
    return res.status(500).json({ error: `${error}` });
  }
}
















//mac book pro m2

async function fetchMacbookpro2(req, res) {
  try {
    const applelaptop = await laptop.findOne({
      where: {
        nameoflaptop: { [Sequelize.Op.iLike]: "%apple macbook pro m2%" },
      },
    });
    if (!applelaptop) {
      return res.status(200).json({ message: "no laptop found" });
    } else {
      return res.status(200).json({ message: "apple found", data:applelaptop });
    }
  } catch (error) {
    return res.status(500).json({ error: `${error}` });
  }
}

//fetch price of macbook air gold

async function fetchApplemacbookpro2price(req, res) {
  try {
    const applemacbookgold = await laptop.findOne({
      where: {
        nameoflaptop: { [Sequelize.Op.iLike]: "%apple macbook pro m2%" },
      },
    });
    const price = applemacbookgold.Price;
    if (!applemacbookgold) {
      return res.status(200).json({ message: "no laptop found" });
    } else {
      return res.status(200).json({message:"Prices fetched",data:price});
    }
  } catch (error) {
    return res.status(500).json({ error: `${error}` });
  }
}

//payment for apple mac book gold
async function buyApplemacbookprom2(req, res) {
  try {
    

    // Make payment to instasend
    const response = await axios.post(
      "https://sandbox.intasend.com/api/v1/checkout/",
      {
        public_key: process.env.instasendpublic,
        amount: req.body.Totals,
      }
    );
    return res.status(200).json({message:"Url fetched",data:response.data.url});
  } catch (error) {
    return res.status(500).json({ error: `${error}` });
  }
}
































module.exports = {
  fetchMacbookair,
  fetchApplemacbookgoldprice,
  buyApplemacbookairgold,
  fetchMacbookpro2,
  fetchApplemacbookpro2price,
  buyApplemacbookprom2
};
