require('dotenv').config();
const mailchimp = require("@mailchimp/mailchimp_marketing");

const sendToMailChimp = (req, res) => {
  const { EMAIL } = req.body;
  mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_KEY,
    server: "us5",
  });
  
  const listId = process.env.MAILCHIMP_LIST;

  console.log(process.env.MAILCHIMP_KEY, process.env.MAILCHIMP_LIST);
  const run = async () => {
    const response = await mailchimp.lists.setListMember(listId, EMAIL, {
      email_address: EMAIL,
      status: "subscribed",
    });
    console.log(response);
    return res.json(response);
  }
  
  run();

}

export default sendToMailChimp;



