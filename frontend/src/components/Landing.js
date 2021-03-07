import React from "react";
import { Link } from "react-router-dom";
import "./landing.css";
const Landing = () => {
    return(
        <div className="text-center mt-5 pt-5">
            <main role="main" className="inner cover">
        <h1 className="cover-heading">Splitwise</h1>
        <p className="lead">A Web App to effectively divide your bills!</p>
        <p className="lead">
          <Link to="/login" className="btn btn-lg btn-secondary">Sign In</Link>
        </p>
      </main>
    </div>
    )
}

export default Landing;