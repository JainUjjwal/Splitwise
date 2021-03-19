const { default: axios } = require("axios");

class userAuth {
  constructor() {
    this.sess = false;
  }

  isLoggedIn () {
     axios.post("http://18.144.25.88:3001/dashboard").then((res) => {
        if (res.session) {
          this.sess = true;
        }
      });
      return this.sess;
  }
}
export default new userAuth();
