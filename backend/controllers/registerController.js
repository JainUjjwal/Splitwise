const kafka = require('../kafka/client')

const register = (req, res) => {
  let dataToSend = {
    body:req.body
  }
  if(req.files){
    dataToSend = {
      files:req.files,
      body:req.body
    }
  }
  kafka.make_request("register", dataToSend, (err, result) => {
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      if (result.err) {
        res.status(203).send(result);
      }
      res.status(202).json(result);
    }
  });

};

module.exports = { register };
