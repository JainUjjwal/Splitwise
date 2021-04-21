import * as moment from "moment";

const setLocalStorage = (responseObj) => {

    // Adds the expiration time defined on the JWT to the current moment
    const expiresAt = moment().add(Number.parseInt(responseObj.expiresIn), 'days');
    console.log(responseObj)
    localStorage.setItem('id_token', responseObj.token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
} 

const logoutUtil = ()=> {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
}

const getExpiration = () => {
    const expiration = localStorage.getItem("expires_at");
    if (expiration) {
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    } else {
        return moment();
    }
} 

const isLoggedIn = () => {
    if(localStorage.getItem("id_token")){
        return moment().isBefore(getExpiration(), "second");
    }else{
        return false;
    }
}

const isLoggedOut = () => {
    return !isLoggedIn();
}



export {setLocalStorage, logoutUtil, isLoggedIn, isLoggedOut, getExpiration}