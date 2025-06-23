//Add address; -/api/address/add;

import Address from "../models/address.js";

export const addAddress = async (req, res) => {
  try {
    const { address, userId } = req.body;
    await Address.create({ ...address, userId });
    res.json({ success: true, message: "cart updated" });
  } catch (err) {
    console.log(err.message);
    res.json({
      success: false,
      message: err.message,
    });
  }
};

//dispaly list of address;
//get address :/api/address/get;
export const getAddress = async (req, res) => {
  try {
    const { userId } = req.body;
    const Addresses = await Address.find({ userId });
    res.json({ success: true, Addresses });
  } catch (err) {
    console.log(err.message);
    res.json({
      success: false,
      message: err.message,
    });
  }
};
