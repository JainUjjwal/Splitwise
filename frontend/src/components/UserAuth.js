const { default: axios } = require("axios");

class userAuth {
  constructor() {
    this.sess = false;
  }

  isLoggedIn () {
     axios.post("http://54.153.78.74:3010/dashboard").then((res) => {
        if (res.session) {
          this.sess = true;
        }
      });
      return this.sess;
  }
}
export default new userAuth();
