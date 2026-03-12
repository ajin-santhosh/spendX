// const Users = require("../models/userSchema");
const axios = require("axios");

const otpGenerator = async (req, res, next) => {

   const {email} =  req.body
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "spendX",
          email: process.env.spendX_Email,
        },
        to: [{ email: email }],
        templateId: JnD82OipFmu.AwJaQMuNYIfhFFb9AXlfRowViqRke91yljX0MJzk1qUvcA,
        params: {
         " contact.SMS": "hai",
         " contact.EMAIL": email 
        },
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
        timeout: 10000,
      },
    );

    // console.log("MAIL SENT ✅", response.data);
    return res.status(201).json({
      success: true,
      message: "mail sended",
    });
  } catch (err) {
    err.message = `Failed to send mail`;
    err.statusCode = 500;
    next(err);
  }
};

module.exports = { otpGenerator };
