import { LOGIN, LOGOUT, REGISTER } from "../constants/actionTypes";
import authService from "../services/auth.service";
import jwt from 'jsonwebtoken';
import setAuthorizationToken from "../utils/setAuthorizationToken";

export const RegisterUser = (model) => async (dispatch) => {
    try {
        const result = await authService.register(model); /*Call our func and give data to it*/
        dispatch({type: REGISTER}); /*Call dispatch and send action to redux*/
        localStorage.authToken = token; /*Save token to localStorage*/
        const token = result.data.token;
        dispatch(authUser(token));
        return Promise.resolve(result); /*Return ok*/
    } 
    catch (err) {
        return Promise.reject(err.response.data); /*return errors*/
    }
}

export const LoginUser = (model) => async (dispatch) => {
    try {
        const result = await authService.login(model); /*Call our func and give data to it*/
        //dispatch({type: LOGIN}); /*Call dispatch and send action to redux*/
        const token = result.data.token;
        localStorage.authToken = token;
        dispatch(authUser(token));
        return Promise.resolve(result); /*Return ok*/
    } 
    catch (err) {
        return Promise.reject(err.response.data); /*return errors*/
    }
}

export const authUser = (token) => async (dispatch) => {
    var user = jwt.decode(token);
    setAuthorizationToken(token); /*Save token and check it*/
    dispatch({type: LOGIN, payload: user});
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('authToken');
    dispatch({
        type: LOGOUT
    })
}
