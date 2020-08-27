
export const isAuthenticated = () =>{
    if(typeof window == "undefined"){
        return false
    }
    if (localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"))
    } else{
        return false
    }
}

export const signout = next => {
    if (typeof window !== 'undefined') localStorage.removeItem('jwt');
    next();
    return fetch(`/signout`, {
        method: 'GET'
    })
        .then(response => {
            console.log('signout', response);
            return response.json();
        })
        .catch(err => console.log(err));
};

