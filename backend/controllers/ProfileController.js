const get_userInfo = (req, res) => {
    
    res.send({ userInformation : {
        username: "a@a.com",
        firstName: "Ujjwal",
        phoneNumber: "4085496787",
        currency: "USD",
        language: "English",
        timezone: "PST",
      }});
  };
  
const post_userInfo = (req,res) =>{
    console.log(req.body);
    res.send({message:'updated information recieved'});
}

  module.exports = { get_userInfo, post_userInfo };
  