

let initialState = {
    name:"",
    email:"",
    isLoggedin: false
}

export const reducer = (state=initialState,{type,payload})=>{
    switch(type){

        case "LOGIN": {
            return {
                ...state, name: payload.name, email: payload.email, isLoggedin: true
            }
        }

        case "LOGOUT": {
            return {
                ...state, name: "", email: "", isLoggedin: false
            }
        }

        default : return state;

    }
}