import { LOGIN, LOGOUT, REGISTER } from "../constants/actionTypes";

const initialState = { /*Our state in reducer*/
    isAuth: false,
    iser: {}
}

const authReducer = (state = initialState, action) => {
    const {type, payload} = action; /*Action - 'REGISTER', 'LOGIN' etc...*/
    console.log("payload", payload);
    switch(type) {
        case REGISTER:{ /*If type == REGISTER*/
            return {
                isAuth: true
            }
        }
        case LOGIN: {
            return {
                isAuth: true,
                user: payload
            }
        }
        case LOGOUT: {
            return {
                isAuth: false
            }
        }
        default:
            return state;
    }
}
export default authReducer