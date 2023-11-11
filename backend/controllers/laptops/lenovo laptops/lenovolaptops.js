const laptop = require("../../../schemas/laptops/laptop");
const Sequelize = require("sequelize");
const axios = require("axios");

// lenovo thinkpad idea details

async function fetchLenovoideapad(req, res) {
  try {
    const lenovoIdeapadlaptop = await laptop.findOne({
      where: { nameoflaptop: { [Sequelize.Op.iLike]: "%lenovo%" } },
    });
    if (!lenovoIdeapadlaptop) {
      return res.status(200).json({ message: "no laptop found" });
    } else {
      return res
        .status(200)
        .json({ message: "lenovo found", data: lenovoIdeapadlaptop });
    }
  } catch (error) {
    return res.status(500).json({ error: `${error}` });
  }
}

//fetch price of lenovo idea pad

async function fetchLenovoideapadprice(req, res) {
  try {
    const lenovoIdeapadlaptop = await laptop.findOne({
      where: { nameoflaptop: { [Sequelize.Op.iLike]: "%lenovo%" } },
    });
    const price = lenovoIdeapadlaptop.Price;
    if (!lenovoIdeapadlaptop) {
      return res.status(200).json({ message: "no laptop found" });
    } else {
      return res.status(200).json({ message: "Prices fetched", data: price });
    }
  } catch (error) {
    return res.status(500).json({ error: `${error}` });
  }
}

//payment for lenovo idea pad
async function buyLenovoideapad(req, res) {
  try {
    
    // Make payment to instasend
    const response = await axios.post(
      "https://sandbox.intasend.com/api/v1/checkout/",
      {
        public_key: process.env.instasendpublic,
        amount: req.body.Totals,
      }
    );

    return res.status(200).json({ message: "Url fetched", data: response.data.url });
  } catch (error) {
    return res.status(500).json({ error: `${error}` });
  }
}

module.exports = {
  fetchLenovoideapad,
  fetchLenovoideapadprice,
  buyLenovoideapad,
};
