const laptop = require("../../../schemas/laptops/laptop");
const Sequelize = require("sequelize");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
// hp macbook details

async function fetchHPeliteBookG2(req, res) {
  try {
    const HPelitebookg2 = await laptop.findOne({
      where: {
        nameoflaptop: { [Sequelize.Op.iLike]: "%HP ELITEBOOK 840 G2%" },
      },
    });
    if (!HPelitebookg2) {
      return res.status(200).json({ message: "no laptop found" });
    } else {
      return res.status(200).json({ message: "hp found", data: HPelitebookg2 });
    }
  } catch (error) {
    return res.status(500).json({ error: `${error}` });
  }
}

//fetch price of macbook air gold

async function fetchHPeliteBookG2price(req, res) {
  try {
    const hpelitebook = await laptop.findOne({
      where: {
        nameoflaptop: { [Sequelize.Op.iLike]: "%HP ELITEBOOK 840 G2%" },
      },
    });
    const price = hpelitebook.Price;
    if (!hpelitebook) {
      return res.status(200).json({ message: "no laptop found" });
    } else {
      return res.status(200).json({ message: "Prices fetched", data: price });
    }
  } catch (error) {
    return res.status(500).json({ error: `${error}` });
  }
}

//payment for apple mac book gold
async function buyHpelitebook(req, res) {
  try {
    // Fetch the price of the laptop from the backend
    const priceResponse = await axios.get(
      "http://localhost:700/hp/elitebookg2/price"
    );
    const priceLaptop = priceResponse.data.data;

    // Make payment to instasend
    const response = await axios.post(
      "https://sandbox.intasend.com/api/v1/checkout/",
      {
        public_key: process.env.instasendpublic,
        amount: priceLaptop,
      }
    );

    return res
      .status(200)
      .json({ message: "Url fetched", data: response.data.url });
  } catch (error) {
    return res.status(500).json({ error: `${error}` });
  }
}

module.exports = {
  fetchHPeliteBookG2,
  fetchHPeliteBookG2price,
  buyHpelitebook,
};
