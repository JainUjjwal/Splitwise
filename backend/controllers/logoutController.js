const logout = (req,res) => {
    req.session.destroy();
    res.cookie("cookie", {
        maxAge: 0,
        httpOnly: false,
        path: "/",
      });
    res.status(204).send()

}

module.exports = {logout}