import axios from "axios" 


const sendMail = async (email, otp) => {

  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "spendX",
          email: process.env.spendX_Email,
        },
        to: [{ email: email }],
        subject: "Your OTP Code",
        htmlContent: `<h1>Hello Your Otp is ${otp}</h1>`
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
    return true
  } catch (err) {
    err.message = `Failed to send mail`;
    err.statusCode = 500;
    throw err
  }

}
export default sendMail