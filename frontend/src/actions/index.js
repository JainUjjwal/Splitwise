const login = (payload) =>{
    
    return{
        type: 'login',
        payload:payload
    }
}

const logout = (payload) =>{
    return{
        type: 'logout',
        payload:payload
    }
}

const register = (payload) =>{
    return{
        type: 'register',
        payload:payload
    }
}

export {login, logout, register}