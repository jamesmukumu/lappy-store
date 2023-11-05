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
      return res
        .status(200)
        .json({ message: "apple found", data: applelaptop });
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
      return res.status(200).json({ data: price });
    }
  } catch (error) {
    return res.status(500).json({ error: `${error}` });
  }
}

//payment for apple mac book gold
async function buyApplemacbookairgold(req, res) {
  try {
    // Fetch the price of the laptop from the backend
    const priceResponse = await axios.get(
      "http://localhost:7000/apple/macbookairgold/price"
    );
    const priceLaptop = priceResponse.data.data;

    // Make payment to instasend
    const response = await axios.post(
      "https://sandbox.intasend.com/api/v1/checkout/",
      {
        public_key: "process.env.instasendpublic",
        amount: priceLaptop,
      }
    );

    return res.status(200).json(response.data.url);
  } catch (error) {
    return res.status(500).json({ error: `${error}` });
  }
}

module.exports = {
  fetchMacbookair,
  fetchApplemacbookgoldprice,
  buyApplemacbookairgold,
};
