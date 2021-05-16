const { default: axios } = require("axios");

class userAuth {
  constructor() {
    this.sess = false;
  }

  // isLoggedIn () {
  //    axios.post("http://localhost:3010/dashboard").then((res) => {
  //       if (res.session) {
  //         this.sess = true;
  //       }
  //     });
  //     return this.sess;
  // }
}
export default new userAuth();
