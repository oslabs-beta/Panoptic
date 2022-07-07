const mailchimp = require("@mailchimp/mailchimp_marketing");

const sendToMailChimp = (req, res) => {
  const { EMAIL } = req.body;
  mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_KEY,
    server: "us5",
  });
  
  const listId = "396c103380";

  
  const run = async () => {
    const response = await mailchimp.lists.addListMember(listId, {
      email_address: EMAIL,
      status: "subscribed",
    });
    console.log(response);
    return res.json(response);
  }
  
  run();

}

export default sendToMailChimp;



